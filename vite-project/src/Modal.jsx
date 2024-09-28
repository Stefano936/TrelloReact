import React from 'react';

import { useState } from 'react';

function Modal({isOpen, onClose, onSave, task}){
    const[title, setTitle] = useState(task.title);
    const[description,setDescription] = useState(task.description);
    const[priority,setPrority] = useState(task.setPrority);
    const[assignedUser,setUser] = useState(task.setUser);
    const[dueDate,setDate] = useState(task.setDate);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ title, description, priority, assignedUser, dueDate });
        onClose();
    };
}
