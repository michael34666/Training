import React, { useState } from 'react';


export default function App(){
  const [ToDoList, setTodoList] = useState<string[]>([]);

  function handleAdd(prop:string)
  {

    setTodoList(prevList=>{
      const newTask = prop;
      if(newTask){

        return[...prevList,newTask]
      }
    })
  }
return (
  <div>
    <button onClick={handleAdd}>Add Task</button>
  </div>
    
  
);

}


