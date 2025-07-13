import  { useState } from 'react';

type ToDoProps = {
  index: number;
  task : string;
  completed:boolean;
  
};


export default function App(){
  const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);

  function handleAdd(props: ToDoProps)
  {

    setTodoList((prevList: ToDoProps[])=>{
      
      return[...prevList,props];
      
    })
  }

  function handleDeleteTODO(index:number)
  {
    setTodoList((prevList: ToDoProps[])=>prevList.filter((task)=> task.index !== index));
  }
  
return (
  <>
  <div>
  <button onClick={()=>handleAdd({index: ToDoList.length, task: 'New Task', completed: false})}>Add New Task</button>
  <button onClick={()=>handleDeleteTODO(ToDoList.length - 1)}>Delete Task</button>
  </div>
    
  </>
);

}


