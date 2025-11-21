import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }
  return (
    <button onClick ={handleClick}>
      Click Me
      </button>
);
}

const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];



function MyList() {
  function handleClick() {
    alert('You clicked me!');
  }
  const listItems = products.map((product) =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  return (
    <ul onClick = {handleClick}>{listItems}</ul>
  );
}

function sixsevel(count, setCount) {
  if (count > 67) {
    setCount(0);
  }
  if (count == 67) {
    
    return "HMM, SIX-SEVEN!";
  } else return "count is: " + count;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MyList />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>My Custom Button Component</h1>
        <MyButton />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {sixsevel(count, setCount)}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
