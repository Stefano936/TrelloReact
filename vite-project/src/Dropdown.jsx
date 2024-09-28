import React from 'react';

import './header.css'
import { useState } from 'react';

const Dropdown = ({ title = "", items = [] }) => {
    const [toggle, setToggle] = useState(false)

    function handleDropdownToggle() {
        if (items.length == 0 ) return;
        setToggle(!toggle)        
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
                    {/* <a href="#" className="dropdown-item is-active"> Dropdown item </a>
                    <a className="dropdown-item"> Other dropdown item </a>
                    <a href="#" className="dropdown-item"> Active dropdown item </a>
                    <a href="#" className="dropdown-item"> Other dropdown item </a>
                    <hr className="dropdown-divider" />
                    <a href="#" className="dropdown-item"> With a divider </a> */}

                    {items.map((item, index) => ( 
                        <>
                            <a href={item.href} className="dropdown-item" key={index}>{item.name}</a>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;