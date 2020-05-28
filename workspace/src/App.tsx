import React from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import LeftPanel from "./components/LeftPanel";
import Workspace from "./components/Workspace";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header
        name='John'
      />
        <div className='mainContent'>
            <LeftPanel />
            <Workspace />

        </div>
    </div>
  );
}

export default App;
