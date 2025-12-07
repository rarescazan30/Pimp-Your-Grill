const express = require("express");
const Grill = require("../models/Grill");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const { sort, search } = req.query;
      
      let dbQuery = {};
      
      if (search) {
          dbQuery.name = { $regex: search, $options: 'i' };
      }
  
      let sortOption = {};
      if (sort === "likes") {
          sortOption = { likes: -1 };
      } else {
          sortOption = { createdAt: -1 };
      }
  
      const grills = await Grill.find(dbQuery)
                               .sort(sortOption)
                               .populate("createdBy", "username");
      
      res.json(grills);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const userGrills = await Grill.find({ createdBy: userId }).sort({ createdAt: -1 });
        res.json(userGrills);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, image, createdBy } = req.body;
    
    if (!name || !description || !createdBy) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newGrill = new Grill({
        name,
        description,
        image, 
        createdBy,
        likes: 0
    });

    const savedGrill = await newGrill.save();
    res.status(201).json(savedGrill);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id/like", async (req, res) => {
  try {
      const { id } = req.params;
      const { userId } = req.body; 

      const grill = await Grill.findById(id);
      if (!grill) {
          return res.status(404).json({ message: "Grill not found" });
      }

      const isLiked = grill.likedBy.includes(userId);

      if (isLiked) {
          grill.likedBy.pull(userId);
          grill.likes -= 1;
      } else {
          // grill limit
          const currentLikes = await Grill.countDocuments({ likedBy: userId });

          if (currentLikes >= 5) {
              return res.status(400).json({ message:
                "Buna, prietene! Vad ca iti plac gratarele. Pentru a debloca functia 💳premium💳 de like-uri nelimitate, ne poti trimite detaliile tale de la card!💳" });
          }

          grill.likedBy.push(userId);
          grill.likes += 1;
      }

      await grill.save();
      res.json(grill);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGrill = await Grill.findByIdAndDelete(id);
        if (!deletedGrill) {
            return res.status(404).json({ message: "Grill not found" });
        }
        res.json({ message: "Grill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const updatedGrill = await Grill.findByIdAndUpdate(
            req.params.id,
            { name, description, image }, 
            { new: true } 
        );

        if (!updatedGrill) {
            return res.status(404).json({ message: "Grill not found" });
        }

        res.json(updatedGrill);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const grill = await Grill.findById(req.params.id);
        if (!grill) {
            return res.status(404).json({ message: "Grill not found" });
        }
        res.json(grill);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;