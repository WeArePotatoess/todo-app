import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import SingleTodo from './components/SingleTodo'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(window.localStorage.getItem('taskList')
    ? JSON.parse(window.localStorage.getItem('taskList')) : []);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const [filteredTasks, setFilteredTasks] = useState(taskList);
  const handleFilter = useCallback(() => {
    const filterValue = selectRef.current.value;
    if (filterValue === 'none') {
      setFilteredTasks([...taskList]);
    }
    else {
      setFilteredTasks(taskList.filter(task => task.completed === Boolean(+filterValue)))
    }
  }, [taskList])
  useEffect(() => {
    window.localStorage.setItem('taskList',
      JSON.stringify(taskList));
    handleFilter();
  }, [taskList, handleFilter])

  const handleInput = (e) => {
    setTaskName(e.target.value);
  }
  const handleSubmit = (e) => {
    if (taskName.trim().length > 0) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      }
      setTaskList([...taskList, newTask]);
      window.localStorage.setItem('taskList', JSON.stringify(taskList));
      inputRef.current.value = '';
      setTaskName('');
    }
  }

  function handleChangeStat(id) {
    setTaskList(taskList.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task
    }))
  }

  function removeTask(taskId) {
    if (taskList.length === 1) setTaskList([]);
    else
      setTaskList(taskList.filter(task => task.id !== taskId))
  }



  return (
    <div className="App">
      <p>Let's add what you have to do!</p>
      <p>Fill the input and click button or "Enter" to add a new task into the list.
        To mark as completed, just click directly to the task</p>
      <div className='input-container'>
        <input type="text" value={taskName} ref={inputRef
        } onChange={handleInput} onKeyDown={
          (e) => {
            if (e.key === 'Enter') handleSubmit(e);
          }
        } />
        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className='todo-list-container'>
        <div className='todo-list-header'>
          <span>List</span>
          <select id='filter' ref={selectRef} onChange={handleFilter}>
            <option value={'none'}>All</option>
            <option value={0}>To Do</option>
            <option value={1}>Done</option>
          </select>
        </div>
        <ul className='todo-list'>
          {filteredTasks.map((task) => {
            return <SingleTodo task={task} removeTask={removeTask} handleChangeStat={handleChangeStat} key={task.id} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
