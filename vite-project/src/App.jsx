import React from 'react';
import Header from './Header';
import Column from './Column';
import './header.css';
import './column.css';
import EditTaskModal from './EditTaskModal';

function App() {
  return (
    <>
      <div className="columns">
        <Header/>
      </div>
      <div className="columns">
        <Column id = "backlog" title = "Backlog" t = {["Project A"]} />
        <Column id = "todo" title = "To Do" t = {["Project G"]} />
        <Column id = "in-progress" title = "In Progress" t = {["Project T"]} />
        <Column id = "blocked" title = "Blocked" t = {["Project S"]} />
        <Column id = "done" title = "Done" t = {["Project H"]} />
      </div>
    </>
  );
}

export default App;