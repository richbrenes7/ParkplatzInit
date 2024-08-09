// src/components/Content.js
import React from 'react';
import Visitor from './Visitor';
import Resident from './Resident';
import ListVisitors from './ListVisitors';

function Content({ user }) {
  const renderView = () => {
    switch (user.role) {
      case 'user':
        return <Visitor />;
      case 'resident':
        return <Resident />;
      case 'guard':
        return <ListVisitors />;
      case 'admin':
        return (
          <>
            <Visitor />
            <Resident />
            <ListVisitors />
          </>
        );
      default:
        return <Visitor />;
    }
  };

  return <div className="content">{renderView()}</div>;
}

export default Content;
