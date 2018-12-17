import "./header.scss";

import React from 'react';

const Header = (props) => {
  return (
    <header className="header">
      <div className="header__brand">
        <i className="icon icon__bunnymatic"/>
      </div>
      <div className="header__item">Images</div>
    </header>
  );
};

export default Header;
