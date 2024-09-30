import React, { useState } from 'react';
import './column.css';
import EditTaskModal from './EditTaskModal';

const Column = ({ id, title, t }) => {
    const [tasks, setTasks] = useState(t);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    function handlerClick() {
        setTasks([...tasks, { title: "Nueva tarea", description: "", priority: "", assignedUser: "", dueDate: "" }]);
    }

    function handleEditTask(task) {
        setSelectedTask(task);
        setIsModalOpen(true);
    }

    function handleSaveTask(updatedTask) {
        setTasks(tasks.map(task => task === selectedTask ? updatedTask : task));
        setIsModalOpen(false);
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    function dragDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');

        const draggingTask = document.querySelector('.dragging');
        if (draggingTask && e.target.classList.contains('column')) {
            e.target.appendChild(draggingTask);

            const addTaskButton = e.target.querySelector('.add-task-button');
            if (addTaskButton) {
                e.target.appendChild(addTaskButton);
            }
        }
    }

    function editTask(taskElement) {
        if (taskElement.querySelector('form')) return;

        const title = taskElement.dataset.title || taskElement.textContent.trim();
        const description = taskElement.dataset.description || '';
        const assigned = taskElement.dataset.assigned || '';
        const priority = taskElement.dataset.priority || '';
        const dueDate = taskElement.dataset.dueDate || '';

        const form = document.createElement('form');
        form.className = 'task-edit-form';

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = title;
        titleInput.placeholder = 'Título';
        titleInput.className = 'input is-small';
        titleInput.style.width = '100%';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.placeholder = 'Descripción';
        descriptionInput.className = 'textarea is-small';
        descriptionInput.style.width = '100%';
        descriptionInput.value = description;

        const assignedSelect = document.createElement('select');
        assignedSelect.className = 'input is-small';
        assignedSelect.innerHTML = `
            <option value="">Asignado a...</option>
            <option value="Usuario 1">Pedro</option>
            <option value="Usuario 2">Pepe</option>
            <option value="Usuario 3">Mariana</option>
        `;
        assignedSelect.value = assigned;

        const prioritySelect = document.createElement('select');
        prioritySelect.className = 'input is-small';
        prioritySelect.innerHTML = `
            <option value="">Prioridad</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
        `;
        prioritySelect.value = priority;

        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.className = 'input is-small';
        dueDateInput.style.width = '100%';
        dueDateInput.value = dueDate;

        const saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.textContent = 'Guardar';
        saveButton.className = 'button is-primary is-small';

        form.appendChild(titleInput);
        form.appendChild(descriptionInput);
        form.appendChild(assignedSelect);
        form.appendChild(prioritySelect);
        form.appendChild(dueDateInput);
        form.appendChild(saveButton);

        taskElement.textContent = '';
        taskElement.appendChild(form);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveTask(form, taskElement);
        });
    }

    function saveTask(form, taskElement) {
        const title = form.querySelector('input[type="text"]').value.trim();
        const description = form.querySelector('textarea').value.trim();
        const assigned = form.querySelector('select').value;
        const priority = form.querySelectorAll('select')[1].value;
        const dueDate = form.querySelector('input[type="date"]').value;
        const state = taskElement.dataset.id ? taskElement.dataset.state : form.parentElement.parentElement.id;

        taskElement.dataset.title = title;
        taskElement.dataset.description = description;
        taskElement.dataset.assigned = assigned;
        taskElement.dataset.priority = priority;
        taskElement.dataset.dueDate = dueDate;
        taskElement.dataset.state = state;

        taskElement.innerHTML = `
            <strong>${title || 'Untitled Task'}</strong><br>
            <em>${description}</em><br>
            Asignado a: ${assigned}<br>
            Prioridad: ${priority}<br>
            Fecha límite: ${dueDate}
        `;

        taskElement.onclick = () => editTask(taskElement);

        const taskData = {
            title,
            description,
            assigned,
            priority,
            dueDate,
            state
        };

        const taskId = taskElement.dataset.id;
        const method = taskId ? 'PUT' : 'POST';
        const url = taskId ? `http://localhost:3000/tasks/${taskId}` : 'http://localhost:3000/tasks';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (!taskId) {
                    taskElement.dataset.id = data.id;
                    taskElement.dataset.state = data.state;
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function loadTask() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(tasks => {
                tasks.forEach(task => {
                    const column = document.querySelector(`#column-${task.priority}`);
                    const taskElement = document.createElement('div');
                    taskElement.className = 'box';
                    taskElement.setAttribute('draggable', true);

                    taskElement.dataset.id = task.id;
                    taskElement.dataset.title = task.title;
                    taskElement.dataset.description = task.description;
                    taskElement.dataset.assigned = task.assigned;
                    taskElement.dataset.priority = task.priority;
                    taskElement.dataset.dueDate = task.dueDate;
                    taskElement.dataset.state = task.state;

                    taskElement.innerHTML = `
                        <strong>${task.title || 'Untitled Task'}</strong><br>
                        <em>${task.description}</em><br>
                        Asignado a: ${task.assigned}<br>
                        Prioridad: ${task.priority}<br>
                        Fecha límite: ${task.dueDate}
                    `;

                    taskElement.addEventListener('dragstart', dragStart);
                    taskElement.addEventListener('dragend', dragEnd);
                    taskElement.addEventListener('click', () => editTask(taskElement));

                    column.appendChild(taskElement);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function addNewTask(button) {
        const column = button.parentElement;
        const newTask = document.createElement('div');
        newTask.className = 'box';
        newTask.setAttribute('draggable', true);
        newTask.textContent = 'Nueva Tarea';
        newTask.addEventListener('dragstart', dragStart);
        newTask.addEventListener('dragend', dragEnd);
        newTask.addEventListener('click', () => editTask(newTask));

        column.insertBefore(newTask, button);

        column.appendChild(button);

        editTask(newTask);
    }

    return (
        <div className="column" id={id}>
            <h2 className="title">{title}</h2>
            {tasks.map((task, index) => (
                <div className="box" draggable="true" key={index} onClick={() => handleEditTask(task)}>
                    {task.title}
                </div>
            ))}
            <button className="add-task-button" onClick={handlerClick}>Agregar Tarea</button>
            <button className="edit-task-button" onClick={handlerClick}>Editar Tarea</button>
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
};

export default Column;