import { useState } from 'react';
import './App.css';
import Hello from './components/hello';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hello name='BLKLIME' age={30}>
        <strong>ccccc</strong>
      </Hello>
      
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
