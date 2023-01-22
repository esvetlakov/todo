import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';

import AppHeader from '../app-header/app-header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default function App() {
  let uid = 100;

  const date = JSON.parse(JSON.stringify(new Date()));

  const [todoData, setTodoData] = useState([
    {
      taskName: 'Completed task',
      status: true,
      editing: false,
      hidden: false,
      taskMin: 10,
      taskSec: 20,
      timestamp: '2022-12-25T11:12:47.610Z',
      created: formatDistanceToNow(parseISO('2022-12-25T11:12:47.610Z')),
      id: 1,
    },
    {
      taskName: 'Active task',
      status: false,
      editing: false,
      hidden: false,
      taskMin: 10,
      taskSec: 23,
      timestamp: date,
      created: formatDistanceToNow(parseISO(date)),
      id: 2,
    },
    {
      taskName: 'Active task 2',
      status: false,
      editing: false,
      hidden: false,
      taskMin: 0,
      taskSec: 20,
      timestamp: '2022-11-25T13:12:47.610Z',
      created: formatDistanceToNow(parseISO('2022-11-25T13:12:47.610Z')),
      id: 3,
    },
  ]);

  // func to update created state

  useEffect(() => {
    const timerId = setInterval(() => {
      setTodoData(() =>
        todoData.map((e) => {
          const elem = e;
          elem.created = formatDistanceToNow(parseISO(elem.timestamp));
          return elem;
        })
      );
    }, 10000);
    return () => clearInterval(timerId);
  }, [todoData]);

  // func to mark task as completed
  const markComplete = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData(() =>
      todoData.map((e, index) => {
        const elem = e;
        if (index === idx) {
          if (elem.status === false) {
            elem.status = true;
          } else {
            elem.status = false;
          }
        }
        return elem;
      })
    );
  };

  // func to delete task
  const deleteTask = (id) => {
    setTodoData((s) => {
      const newArr = [];
      s.forEach((el) => {
        if (el.id !== id) newArr.push(el);
      });
      return newArr;
    });
  };

  // func to create a new task
  const addItem = (label, min = 0, sec = 0) => {
    if (label.trim() !== '') {
      const newTaskDate = JSON.parse(JSON.stringify(new Date()));
      uid += 1;
      setTodoData(() => [
        ...todoData,
        {
          taskName: label,
          status: false,
          editing: false,
          hidden: false,
          taskMin: Number(min),
          taskSec: Number(sec),
          timestamp: date,
          created: formatDistanceToNow(parseISO(newTaskDate)),
          id: uid,
        },
      ]);
    } else {
      // eslint-disable-next-line
      alert('Task cannot be empty');
    }
  };

  // funcs to edit a task
  const editClick = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData(() =>
      todoData.map((e, index) => {
        const elem = e;
        if (index === idx) elem.editing = true;
        return elem;
      })
    );
  };

  const editItem = (value, id) => {
    if (value.split(' ').join('') === '') {
      // eslint-disable-next-line
      alert('Task cannot be empty');
    } else {
      const idx = todoData.findIndex((el) => el.id === id);
      setTodoData(() =>
        todoData.map((e, index) => {
          const elem = e;
          if (index === idx) {
            elem.taskName = value;
            elem.editing = false;
          }
          return elem;
        })
      );
    }
  };
  //

  // func to delete all completed tasks
  const clearCompleted = () => {
    todoData.forEach((el) => {
      if (el.status === true) {
        deleteTask(el.id);
      }
    });
  };

  // task filter func
  const taskFilter = (type) => {
    const newState = todoData.map((el) => {
      const elem = { ...el };
      elem.hidden = false;
      return elem;
    });
    // show all
    if (type === 'all') {
      setTodoData(() =>
        newState.map((el) => {
          const elem = { ...el };
          elem.hidden = false;
          return elem;
        })
      );
      // show not completed
    } else if (type === 'active') {
      setTodoData(() =>
        newState.map((el) => {
          const elem = { ...el };
          if (elem.status === true) elem.hidden = true;
          return elem;
        })
      );
      // show only completed
    } else if (type === 'completed') {
      setTodoData(() =>
        newState.map((el) => {
          const elem = { ...el };
          if (elem.status === false) elem.hidden = true;
          return elem;
        })
      );
    }
  };

  const leftCount = todoData.filter((el) => el.status === false || el.editing === true).length;
  const editingValue = todoData.find((el) => el.editing === true);

  return (
    <>
      <AppHeader onItemAdd={addItem} />
      <section className="main">
        <TaskList
          todos={todoData}
          onMarkCompleted={markComplete}
          onDelete={deleteTask}
          onEditClick={editClick}
          editingValue={editingValue}
          onItemChange={editItem}
        />
        <Footer itemsLeft={leftCount} onClearCompleted={clearCompleted} taskFilter={taskFilter} />
      </section>
    </>
  );
}
