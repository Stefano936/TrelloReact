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
        <Column 
          id="backlog" 
          title="Backlog" 
          t={[
            { id: 1, title: "Project A", description: "Description A", status: "backlog", dueDate: "2023-12-01", priority: "high", assignedUser: "Usuario 1" },
            { id: 2, title: "Project B", description: "Description B", status: "backlog", dueDate: "2023-12-02", priority: "medium", assignedUser: "Usuario 2" }
          ]} 
        />
        <Column 
          id="todo" 
          title="To Do" 
          t={[
            { id: 3, title: "Project G", description: "Description G", status: "todo", dueDate: "2023-12-03", priority: "low", assignedUser: "Usuario 3" },
          ]} 
        />
        <Column 
          id="in-progress" 
          title="In Progress" 
          t={[
            { id: 5, title: "Project T", description: "Description T", status: "in-progress", dueDate: "2023-12-05", priority: "medium", assignedUser: "Usuario 5" },
            { id: 6, title: "Project U", description: "Description U", status: "in-progress", dueDate: "2023-12-06", priority: "low", assignedUser: "Usuario 6" }
          ]} 
        />
        <Column 
          id="blocked" 
          title="Blocked" 
          t={[
            { id: 8, title: "Project V", description: "Description V", status: "blocked", dueDate: "2023-12-08", priority: "medium", assignedUser: "Usuario 8" }
          ]} 
        />
        <Column 
          id="done" 
          title="Done" 
          t={[
            { id: 9, title: "Project H", description: "Description H", status: "done", dueDate: "2023-12-09", priority: "low", assignedUser: "Usuario 9" },
          ]} 
        />
      </div>
    </>
  );
}

export default App;