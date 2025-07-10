import React, { useState } from 'react';

type ToDoProps = {
  index: number;
  task : string;
  completed:boolean;
  
};
export default function App(){
  const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);

  function handleAdd(props: ToDoProps)
  {

    setTodoList((prevList)=>{
      
      return[...prevList,props];
      
    })
  }

  function handleDeleteTODO(index:number)
  {
    setTodoList((prevList)=>prevList.filter((task)=> task.index !== index));
  }
  
return (
  <>
  <div>
    <button onclick={handleAdd}>Add Task</button>
  </div>
    
  </>
);

}


