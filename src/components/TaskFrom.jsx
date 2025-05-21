// import React, { useState } from 'react';

// function TaskFrom({ addTask, theme, searchTerm, setSearchTerm }) {
//   const [description, setDescription] = useState('');
//   const [deadline, setDeadline] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted, title:', searchTerm.trim());
//     if (!searchTerm.trim()) {
//       alert('Введите название задачи!');
//       return;
//     }
//     const task = {
//       title: searchTerm.trim(),
//       description: description.trim(),
//       deadline: deadline || '',
//     };
//     console.log('Submitting task:', task);
//     addTask(task);
//     setDescription('');
//     setDeadline('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="task-form">
//       <input
//         type="text"
//         placeholder="Название задачи " 
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="form-input"
//       />
//       <textarea
//         placeholder="Описание задачи"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="form-textarea"
//         rows="5"
//       />
//       <input
//         type="date"
//         value={deadline}
//         onChange={(e) => setDeadline(e.target.value)}
//         className="form-input"
//       />
//       <button type="submit" className="form-button" disabled={!searchTerm.trim()}>
//         Добавить задачу
//       </button>
//     </form>
//   );
// }

// export default TaskFrom;

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function TaskFrom({ addTask, theme, searchTerm, setSearchTerm }) {
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted, title:', searchTerm.trim());
    if (!searchTerm.trim()) {
      alert('Введите название задачи!');
      return;
    }
    const task = {
      title: searchTerm.trim(),
      description: description.trim(),
      deadline: deadline || '',
    };
    console.log('Submitting task:', task);
    addTask(task);
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          type="text"
          placeholder="Название задачи"
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
      <button type="submit" className="form-button" disabled={!searchTerm.trim()}>
        Добавить задачу
      </button>
    </form>
  );
}

export default TaskFrom;