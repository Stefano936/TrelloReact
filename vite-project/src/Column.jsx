import React from 'react';
import './column.css';

import { useState } from 'react';

const Column = ({ id, title, t }) => {
    const [tasks, setTasks] = useState(t);

    function handlerClick (){
        setTasks([...tasks, "Nueva tarea"])
    }

    function handleEditTask() {
        // mostrar el modal para editar task
        // modal tenes q hacerlo en otro component
        //Debe contener los parametros de title, description, priority, assignedUser, dueDate y saveButton
    }
    
    return (
        <div className="column" id={id}>
            <h2 className="title">{title}</h2>
            {tasks.map((task, index) => (
                <div className="box" draggable="true" key={index} onClick={handleEditTask}>{task}</div>
            ))}
            <button className="add-task-button"onClick={handlerClick}>Agregar Tarea</button>
        </div>
    );
};

export default Column;