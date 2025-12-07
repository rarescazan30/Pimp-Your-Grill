# README

###  Userul poate da maximum 5 like-uri.

###  Sunt trimise si primite email-uri de confirmare.
Am configurat `.env` pentru `EMAIL_PASS` si `JWT_SECRET`. .
##### env nu e incarcat pe github!  
Exista o adresa dedicata: **pimpyourgrillnoreply@gmail.com**, care trimite mesajele de confirmare.

###  La "Forgot Password", userul primeste un link prin email.
Dupa accesare, isi poate introduce o parola noua si apoi se poate loga normal.

###  Rol de admin:
Pentru a deveni admin, se acceseaza link-ul:  
`http://localhost:5001/api/users/make-admin YOUR_EMAIL_HERE`  
Userul devine admin si poate edita sau sterge orice postare. Se afiseaza in navbar statusul de ADMIN.

###  Userii non-admin:
Nu pot sterge decat postarile proprii (atat din profil, cat si din sectiunea Best Grills).

### Search in best grills se face dupa nume ignore case. Leaderboard sorteaza dupa nr. de like-uri

###  Userii pot incarca si schimba fotografia gratarului oricand doresc.

### Site-ul este responsive, se vede bine pe telefon si pe ferestre mai mici (sper...)

Am implementat inclusiv carusele pentru grill-uri pe telefon! (a durat foarte mult)

Link-urile din footer duc la paginile LSAC.

### Apare sageata de go to top cand suntem jos in pagina
