import React, { useState, useEffect } from 'react';
import './App.css';
import TaskFrom from './components/TaskFrom';
import TaskList from './components/TaskLIst';
import ErrorBoundary from './components/ErrorBoundary';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import ruFlag from './assets/flagsru.png';
import enFlag from './assets/flagsen.png';
import kyFlag from './assets/flagskgz.png';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); 
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    if (!taskData.title || taskData.title.trim() === '') {
      alert(t("alerts.writeTitle"));
      return;
    }

    const newTask = {
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      deadline: taskData.deadline || '',
      id: Date.now(),
      status: 'new',
    };
    setTasks([...tasks, newTask]);
    setSearchTerm('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.title || updatedTask.title.trim() === '') {
      alert(t("alerts.titleCannotBeEmpty"));
      return;
    }
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const toggleStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
    alert(t("alerts.allTasksCleared"));
  };

  const getFlagImage = (lang) => {
    switch (lang) {
      case 'ru': return ruFlag;
      case 'en': return enFlag;
      case 'ky': return kyFlag;
      default: return enFlag;
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const title = task.title?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchSearch = title.includes(search);
    const matchFilter = filter === 'all' ? true : task.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <div className="container">
          <header className="header">
            <h1 className="title">{t("app.title")}</h1>
            <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
  <button
    onClick={changeTheme}
    style={{
      width: 40,
      height: 30,
      borderRadius: 6,
      border: '1px solid #666',
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#2e2e2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
    }}
  >
    {theme === 'light' ? (
      <MdDarkMode size={18} style={{ color: '#666' }} />
    ) : (
      <MdLightMode size={18} style={{ color: '#ccc' }} />
    )}
  </button>

  <div className="custom-select" style={{ position: 'relative' }}>
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      style={{
        width: 40,
        height: 30,
        borderRadius: 6,
        border: '1px solid #666',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#2e2e2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <img
        src={getFlagImage(i18n.language)}
        alt={i18n.language}
        style={{ width: 40, height: 30, borderRadius: 5 }}
      />
    </div>

    {showDropdown && (
      <div
        className="options"
        style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          backgroundColor: theme === 'light' ? '#fff' : '#2e2e2e',
          border: '1px solid #ccc',
          borderRadius: 5,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 10,
        }}
      >
        <div
          onClick={() => changeLanguage('ru')}
          style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <img src={ruFlag} alt="Русский" style={{ width: 25, height: 18, borderRadius: 3 }} />
        </div>
        <div
          onClick={() => changeLanguage('en')}
          style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <img src={enFlag} alt="English" style={{ width: 25, height: 18, borderRadius: 3 }} />
        </div>
        <div
          onClick={() => changeLanguage('ky')}
          style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <img src={kyFlag} alt="Кыргызча" style={{ width: 25, height: 18, borderRadius: 3 }} />
        </div>
      </div>
    )}
  </div>
</div>

          </header>

          <TaskFrom
            addTask={addTask}
            theme={theme}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="filter">
            <label className="filter-label">{t("app.filter")}:</label>
            <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
              <option value="all">{t("filter.all")}</option>
              <option value="new">{t("filter.new")}</option>
              <option value="inProgress">{t("filter.inProgress")}</option>
              <option value="completed">{t("filter.completed")}</option>
            </select>
            <button onClick={clearAllTasks} className="task-button delete">
              {t("buttons.clearAll")}
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleStatus={toggleStatus}
            theme={theme}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
