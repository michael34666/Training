import {  useState,useEffect } from 'react'

import './App.css'


interface ToDoProps  {
  index: number;
  task : string;
  completed:boolean;
  
};

const App= () => {
  const str="LOCAL_STORAGE";
  const [newTodo, setNewTodo] = useState('');
  
  const [toDoList, setTodoList] = useState(() => {
    const toDoString = localStorage.getItem(str);
    const storedToDo = toDoString ? JSON.parse(toDoString) : [];
    return storedToDo || [];
  });


  //synchroniz the componenets- allow to display data that write in another localhost
  useEffect(() =>{
    localStorage.setItem(str,JSON.stringify(toDoList))}
  ,[toDoList]);
  
 
  const handleAdd = () =>
  {
    if(newTodo.trim() === '') {
      alert('Enter a valid task');
      return;
    }
    
    setTodoList((toDoList: ToDoProps[])=>{
      return[...toDoList,{ index: toDoList.length, task: newTodo, completed: false }];
    })
    setNewTodo(''); 
  }

   const handlecompleteToDo= (index:number) =>
  {
    setTodoList((toDoList: ToDoProps[]) =>
      toDoList.map((task) =>
       task.index===index ? { ...task, completed: !task.completed } : task
     )
    );

  }
  
   const handleDeleteTODO = (index:number) =>
  {
    setTodoList((toDoList: ToDoProps[])=>toDoList.filter((task)=> task.index !== index));
  }

   const  howmanyneedTODO = () =>
  {
    if(toDoList.length === 0) {
      return 0;
    }
    let count = 0;
    toDoList.forEach((task: ToDoProps) => {
      if(!task.completed){
        count++;
      }
    });
    return count;
  }

  return (
    <>
      <h1>To Do App</h1>
      <div className='white'>You have {howmanyneedTODO()} tasks that are open</div>
      <br></br>
       <button onClick={() => handleAdd()}>Add New Task:</button>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(mes) => setNewTodo(mes.target.value)}
          placeholder="Write your next task"/>

        <br></br>
        
        <br></br>
        
        <div className="scroller ">
       
        <ul>
          { toDoList.map((task: ToDoProps) => (
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