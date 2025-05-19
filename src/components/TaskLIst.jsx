// import React from 'react';
// import TaskItem from './TaskItem';

// function TaskList({ tasks, deleteTask, updateTask, toggleStatus, theme }) {
//   console.log('TaskList received tasks:', tasks);
//   const validTasks = (Array.isArray(tasks) ? tasks : []).filter(
//     (task) => task && typeof task === 'object' && task.id
//   );

//   return (
//     <div className="task-list">
//       {validTasks.length === 0 ? (
//         <p className="no-tasks">Нет задач</p>
//       ) : (
//         validTasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             deleteTask={deleteTask}
//             updateTask={updateTask}
//             toggleStatus={toggleStatus}
//             theme={theme}
//           />
//         ))
//       )}
//     </div>
//   );
// }

// export default TaskList;





import React from "react";

function TaskList({
  tasks,
  deleteTask,
  updateTask,
  toggleStatus,
  theme,
  startEditing,
}) {
  if (!tasks.length) {
    return <div className="no-tasks">Нет задач</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-item-header">
            <h3 className="task-title">{task.title}</h3>
            <span
              className="task-arrow"
              onClick={(e) => {
                e.currentTarget.classList.toggle("open");
                const details = e.currentTarget
                  .parentElement.nextElementSibling;
                details.classList.toggle("open");
              }}
            >
              ▼
            </span>
          </div>
          <div className="task-details">
            <p className="task-description">{task.description || "Без описания"}</p>
            <p className="task-deadline">
              Дедлайн: {task.deadline || "Не указан"}
            </p>
            <div className="task-status">
              <select
                className="status-select"
                value={task.status}
                onChange={(e) => toggleStatus(task.id, e.target.value)}
              >
                <option value="new">Новая</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершённая</option>
              </select>
            </div>
            <div className="task-buttons">
              <button
                className="task-button edit"
                onClick={() => startEditing(task)}
              >
                Редактировать
              </button>
              <button
                className="task-button delete"
                onClick={() => deleteTask(task.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
