import React from 'react';
import Dropdown from './Dropdown';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <img  src="https://seeklogo.com/images/T/trello-logo-CE7B690E34-seeklogo.com.png" width="35" alt="Trello Logo" />
            <h1 className="title">Trello</h1>
            <Dropdown title="Workspaces" items={[{name: "Link 1", href: "https://www.instagram.com/"},{name: "Link 2", href: "https://www.instagram.com/"}]} />
            <Dropdown title="Recente" items={[{name: "Link 1", href: "https://www.instagram.com/"},{name: "Link 2", href: "https://www.instagram.com/"}]}/>
            <Dropdown title="Starred" items={[{name: "Link 1", href: "https://www.instagram.com/"},{name: "Link 2", href: "https://www.instagram.com/"}]}/>
            <Dropdown title="Templates" items={[{name: "Link 1", href: "https://www.instagram.com/"},{name: "Link 2", href: "https://www.instagram.com/"}]}/>  
            <div id="boxs"><button className="buttons">Create</button></div>
        </div>
    );
};

export default Header;