import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  const [view, setView] = useState('Visitor');

  return (
    <div className="App">
      <Header />
      <div className="App-body" style={{ display: 'flex' }}>
        <Sidebar setView={setView} />
        <Content view={view} />
      </div>
    </div>
  );
}

export default App;
