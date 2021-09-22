import React, { useState, useEffect } from 'react';
import { example } from '../api/example.js';

export const ExamplePage = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  

  // UseEffect runs once on initilization of the page
  useEffect(() => {
    console.log('Hello'); // If you press f12 and goto console on your web browser - you will see this. But only once.
    // Saving a file in vscode while yarn is running will re-render - causing another print.
  }, []);

  // This will run once on initial render - then whenever count2 changes  
  useEffect(() => {
    setDisplayName(name); // When run, sets displayName to name
    
    // Prevents console warning -- exhaustive-deps just mean you may be missing a variable
    // in the square brackets and is making sure you didn't miss something
    // In this case it sees setCount2() and asked 'Should I be checking for this too?'
    // this disabled the check, so it doesn't warn me in the cmd.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count2]);

  const callAPI = async (bc, tc) => {
    example(bc, tc).then(result =>{
      console.log(result)
    })
  };

  // Usually do not put spaces between the JSX
  // Spaced it so you guys can read it easier -- hopefully.
  // Also Javascript usually doesn't require comments a lot of times
  // unless you need to explain something unconventional.
  return (
    <div style={{ margin: '5rem' }}>
      <p> You pressed the buttons {count} times! </p>
      <button onClick={() => setCount(count + 1)}> Press Me </button>
    
      <div style={{ height: '5rem' }} />

      {/* This is how you comment in JSX (JSX is the html-like code) */}
      {/* You can also create if elses by using Ternarys! Nested Ternarys are no allowed. */}
      {/* Try putting Robert, I dare you */}
      {displayName === 'Robert' ? (
        <p> Thats my name, you can't do that, sorry. </p>
      ) : (
        <> {/* Fragment Explained Below */}
          <p> {displayName || 'No Name'}, you changed names {count2} times </p>
          <form onSubmit={e => e.preventDefault() /* Page will refresh otherwise. */}>
            <input name="name" onChange={e => setName(e.target.value)} />
            <button onClick={() => setCount2(count2 + 1)}> Change Name! </button>
          </form>
        </>
      )}

      <div style={{ height: '5rem' }} />

      <>  {/* <-- This is a fragment -- two components on an equal level require a 'parent' component */}
          {/* Not really required here since <div> but just as an example if needed later */}
        <p> Fragment </p>
        <p> Fragment </p>
      </>

      <div style={{ height: '5rem' }} />

      <button onClick={() => callAPI(count, count2)}> Call API </button>
    </div>
  );
};