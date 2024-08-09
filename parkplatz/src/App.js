import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('Visitor');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header />
          <div className="App-body" style={{ display: 'flex' }}>
            <Sidebar setView={setView} />
            <Content view={view} user={user} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
