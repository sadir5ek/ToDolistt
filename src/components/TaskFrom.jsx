import React, { useState } from 'react';

function TaskFrom({ addTask, theme }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted, title:', title.trim());
    if (!title.trim()) {
      alert('Введите название задачи!');
      return;
    }
    const task = {
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || '',
    };
    console.log('Submitting task:', task);
    addTask(task);
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Описание задачи"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
        rows="5"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="form-input"
      />
      <button type="submit" className="form-button" disabled={!title.trim()}>
        Добавить задачу
      </button>
    </form>
  );
}

export default TaskFrom;


