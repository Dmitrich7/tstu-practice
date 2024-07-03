import React, { useEffect } from 'react';
import './App.css';
import { AppRouter } from './router/AppRouter';

function App() {

  useEffect(()=>{

  },[])
  
  return (
    <div style={{display: "flex",justifyContent:"center",alignItems:"center",height:"100vh"}} className="App">
      <AppRouter/>
    </div>
  );
}

export default App;
