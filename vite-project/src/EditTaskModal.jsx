import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    useEffect(() => {
        setUpdatedTask(task);
    }, [task]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSave = () => {
        onSave(updatedTask);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Task</h2>
                <label>
                    Title:
                    <input type="text" name="title" value={updatedTask.title} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={updatedTask.description} onChange={handleChange} />
                </label>
                <label>
                    Assigned User:
                    <input type="text" name="assignedUser" value={updatedTask.assignedUser} onChange={handleChange} />
                </label>
                <label>
                    Priority:
                    <input type="text" name="priority" value={updatedTask.priority} onChange={handleChange} />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EditTaskModal;