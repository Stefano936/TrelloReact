import React, { useState } from 'react';
import './header.css';

const Dropdown = ({ title = "", items = [] }) => {
    const [toggle, setToggle] = useState(false);

    function handleDropdownToggle() {
        if (items.length === 0) return;
        setToggle(!toggle);
    }

    return (
        <div className={toggle ? "dropdown is-active" : "dropdown"}>
            <div className="dropdown-trigger" onClick={handleDropdownToggle}>
                <button className="buttons" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span className='button-title'>{title}</span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {items.map((item, index) => (
                        <a href={item.href} className="dropdown-item" key={index}>{item.name}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;