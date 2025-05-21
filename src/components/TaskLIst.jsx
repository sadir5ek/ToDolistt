import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, updateTask, toggleStatus, theme }) {
  console.log('TaskList received tasks:', tasks);
  const validTasks = (Array.isArray(tasks) ? tasks : []).filter(
    (task) => task && typeof task === 'object' && task.id
  );

  return (
    <div className="task-list">
      {validTasks.length === 0 ? (
        <p className="no-tasks">Нет задач</p>
      ) : (
        validTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleStatus={toggleStatus}
            theme={theme}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;



