import React, { useState, useEffect } from 'react';
import './App.css';
import TaskFrom from './components/TaskFrom';
import TaskList from './components/TaskLIst';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    console.log("Проверяю localStorage");
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        console.log("Получил задачи:", parsedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
          console.log("Задачи загружены");
        } else {
          console.log("Не массив, ставлю пустой");
          setTasks([]);
        }
      } catch (error) {
        console.log("Ошибка при загрузке:", error);
        setTasks([]);
      }
    } else {
      console.log("Ничего нет в localStorage");
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    console.log("Сохраняю задачи:", tasks);
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log("Сохранено");
    } catch (error) {
      console.log("Ошибка сохранения:", error);
      alert("Не могу сохранить задачи, проверь память браузера!");
    }
  }, [tasks]);

  const addTask = (task) => {
    if (!task || !task.title || task.title.trim() === '') {
      alert("Напишите название задачи!");
      return;
    }
    const newTask = {
      title: task.title.trim(),
      description: task.description ? task.description.trim() : '',
      deadline: task.deadline || '',
      id: Date.now(),
      status: 'new',
    };
    console.log("Добавляю задачу:", newTask);
    setTasks([...tasks, newTask]);
    console.log("Список теперь:", tasks);
  };

  const deleteTask = (id) => {
    console.log("Удаляю задачу с ID:", id);
    setTasks(tasks.filter((task) => task.id !== id));
    console.log("Остался список:", tasks);
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.title || updatedTask.title.trim() === '') {
      alert("Название задачи не может быть пустым!");
      return;
    }
    console.log("Обновляю задачу:", updatedTask);
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    console.log("Обновлённый список:", tasks);
  };

  const toggleStatus = (id, status) => {
    console.log("Меняю статус для ID:", id, "на:", status);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
    console.log("Статус изменён");
  };

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log("Тема теперь:", theme === 'light' ? 'dark' : 'light');
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
    console.log("Все задачи удалены");
    alert("Все задачи очищены!");
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
      })
    : [];
  console.log("Фильтрованные задачи:", filteredTasks);

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <div className="container">
          <header className="header">
            <h1 className="title">Мои задачи</h1>
            <button onClick={changeTheme} className="theme-toggle">
              {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
            </button>
          </header>
          <TaskFrom addTask={addTask} theme={theme} />
          <div className="filter">
            <label className="filter-label">Фильтр:</label>
            <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершённые</option>
            </select>
            <button onClick={clearAllTasks} className="task-button delete">
              Очистить всё
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