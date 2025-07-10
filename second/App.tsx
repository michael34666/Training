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
    <button onClick={handleAdd}>Add Task</button>
  </div>
    
  </>
);

}


