import {  useState,useEffect } from 'react'

import './App.css'

/*
import handleAdd from './component/handleAdd';
import handleDeleteTODO from './component/handleDeleteTODO';
import handlecompleteToDo from './component/handlecompleteToDo';
import howmanyneedTODO from './component/howmanyneedTODO';*/

interface ToDoProps  {
  index: number;
  task : string;
  completed:boolean;
  
};




function App() {

  const [newTodo, setNewTodo] = useState('');
  
  const [ToDoList, setTodoList] = useState(() => {
    const toDoString = localStorage.getItem("ToDoList");
    const storedToDo = toDoString ? JSON.parse(toDoString) : [];
    return storedToDo || [];
  });


  //synchroniz the componenets- allow to display data that write in another localhost
  useEffect(() =>{
    localStorage.setItem('ToDoList',JSON.stringify(ToDoList))}
  ,[ToDoList]);
  
 
  function handleAdd()
  {
    if(newTodo.trim() === '') {
      alert('Enter a valid task');
      return;
    }
    
    setTodoList((ToDoList: ToDoProps[])=>{
      return[...ToDoList,{ index: ToDoList.length, task: newTodo, completed: false }];
    })
    setNewTodo(''); 
  }

   function handlecompleteToDo(index:number)
  {
    setTodoList((ToDoList: ToDoProps[]) =>
      ToDoList.map((task) =>
       task.index===index ? { ...task, completed: !task.completed } : task
     )
    );

  }
   function handleDeleteTODO(index:number)
  {
    setTodoList((ToDoList: ToDoProps[])=>ToDoList.filter((task)=> task.index !== index));
  }

    function howmanyneedTODO()
  {
    if(ToDoList.length === 0) {
      return 0;
    }
    let count = 0;
    ToDoList.forEach((task: ToDoProps) => {
      if(!task.completed){
        count++;
      }
    });
    return count;
  }

  return (
    <>
      <h1>To Do App</h1>
      
      <div>You have {howmanyneedTODO()} tasks that are open</div>
      <br></br>
       <button onClick={() => handleAdd()}>Add New Task:</button>
      <div >
        <input
          type="text"
          value={newTodo}
          onChange={(mes) => setNewTodo(mes.target.value)}
          placeholder="Write your next task"/>

        <br></br>
        
        <br></br>
        <div className="scroller input-container">
       
        <ul>
          { ToDoList.map((task: ToDoProps) => (
          <li key={task.index}>
            <span className={task.completed ? 'strikethrough' : ''}>{task.task}</span>
            <br></br>
            <button onClick={() => handleDeleteTODO(task.index)}>Delete Task</button>
            <button onClick={() => handlecompleteToDo(task.index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            
          </li>
          
        ))}
        
        </ul>
        </div>
      </div>
      
    </>
  )
}

export default App