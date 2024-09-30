import React, { useState } from 'react';
import './editTaskModal.css';

function EditTaskModal({ isOpen, onClose, onSave, task }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [assignedUser, setAssignedUser] = useState(task.assignedUser);
    const [dueDate, setDueDate] = useState(task.dueDate);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ title, description, priority, assignedUser, dueDate });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Task</h2>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Priority:
                    <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
                </label>
                <label>
                    Assigned User:
                    <input type="text" value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} />
                </label>
                <label>
                    Due Date:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default EditTaskModal;