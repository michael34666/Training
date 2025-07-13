import { useState } from 'react'
import './App.css'
import  handleSubmit  from './component/form'

type ToDoProps = {
  index: number;
  task : string;
  completed:boolean;
  
};


function App() {
  
  const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);
  const [newTodo, setNewTodo] = useState('');
  

  function handleAdd()
  {
    if(newTodo.trim() === '') {
      alert('Enter a valid task');
      return;
    }
    
    setTodoList((prevList: ToDoProps[])=>{
      return[...prevList,{ index: prevList.length, task: newTodo, completed: false }];
    })
    setNewTodo(''); 
  }

  function handleDeleteTODO(index:number)
  {
    setTodoList((prevList: ToDoProps[])=>prevList.filter((task)=> task.index !== index));
  }

  function print(list: ToDoProps[])
  {
    return list.map((task) => (
      <div key={task.index}>
        <span>{task.index+1}. {task.task}</span>
      </div>
    ));
  }
  return (
    <>
      <h1>To Do App</h1>
      
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(mes) => setNewTodo(mes.target.value)}
          placeholder="Write your next task"/>

        <br></br>
        <button onClick={() => handleAdd()}>Add New Task:</button>
        <br></br>
        <button onClick={() => handleDeleteTODO(ToDoList.length - 1)}>Delete Task</button>
        <br></br>
        {print(ToDoList)}
        <div>You have {ToDoList.length} tasks that are open</div>
        <div>
          
        </div>
      </div>
    
       
      </>
  )
}

export default App


/*

<br></br>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="todo">
            <input
              type="text"
              name="todo"
              id="todo"
              placeholder="Write your next task"
            />
            
          </label>
          <button>
            <span className="visually-hidden">Submit</span>
            <svg>
              <path d="" />
            </svg>
          </button>
          </form>


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>To Do App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    
    </>
  )
}

export default App

*/