import React from 'react';
import TaskItem from './TaskItem';
import { useTranslation } from 'react-i18next';

function TaskList({ tasks, deleteTask, updateTask, toggleStatus, theme }) {
  const { t } = useTranslation();
  const validTasks = (Array.isArray(tasks) ? tasks : []).filter(
    (task) => task && typeof task === 'object' && task.id
  );

  return (
    <div className="task-list">
      {validTasks.length === 0 ? (
        <p className="no-tasks">{t('taskList.noTasks')}</p>
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