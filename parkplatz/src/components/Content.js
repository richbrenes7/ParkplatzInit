import React from 'react';
import Visitor from './Visitor';
import Resident from './Resident';
import ListVisitors from './ListVisitors';

function Content({ view }) {
  const renderView = () => {
    switch (view) {
      case 'Visitor':
        return <Visitor />;
      case 'Resident':
        return <Resident />;
      case 'ListVisitors':
        return <ListVisitors />;
      default:
        return <Visitor />;
    }
  };

  return (
    <div className="content">
      {renderView()}
    </div>
  );
}

export default Content;
