import React, { useState } from 'react';
import './column.css';
import EditTaskModal from './EditTaskModal';

const Column = ({ id, title, t }) => {
    const [tasks, setTasks] = useState(t);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    function handleAddTask() {
        setTasks([...tasks, { title: "Nueva tarea", description: "", priority: "", assignedUser: "", dueDate: "" }]);
    }

    function handleEditTask(task) {
        console.log("Task clicked:", task);
        setSelectedTask(task);
        setIsModalOpen(true);
    }

    function handleSaveTask(updatedTask) {
        setTasks(tasks.map(task => task === selectedTask ? updatedTask : task));
        setIsModalOpen(false);
    }

    return (
        <div className="column" id={id}>
            <h2 className="title">{title}</h2>
            {tasks.map((task, index) => (
                <div className="box" draggable="true" key={index} onClick={() => handleEditTask(task)}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Assigned to: {task.assignedUser}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Due Date: {task.dueDate}</p>
                </div>
            ))}
            <button className="add-task-button" onClick={handleAddTask}>Agregar Tarea</button>
            <button className="add-task-button" onClick={handleEditTask}>Editar Tarea</button>
            {selectedTask && (
                <EditTaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTask}
                    task={selectedTask}
                />
            )}
        </div>
    );
}

export default Column;