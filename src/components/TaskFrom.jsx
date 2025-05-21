import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function TaskForm({ addTask, theme, searchTerm, setSearchTerm }) {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert(t('alerts.writeTitle'));
      return;
    }
    const task = {
      title: searchTerm.trim(),
      description: description.trim(),
      deadline: deadline || '',
    };
    addTask(task);
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          placeholder={t('taskForm.titlePlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ paddingRight: '30px' }}
        />
        <FaSearch
          style={{
            position: 'absolute',
            right: '35px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: theme === 'light' ? '#666' : '#ccc',
          }}
        />
      </div>
      <textarea
        placeholder={t('taskForm.descriptionPlaceholder')}
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
      <button type="submit" className="form-button" disabled={!searchTerm.trim()}>
        {t('taskForm.addButton')}
      </button>
    </form>
  );
}

export default TaskForm;