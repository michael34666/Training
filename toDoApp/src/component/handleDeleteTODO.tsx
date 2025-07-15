 import { useState } from 'react'
 
 type ToDoProps = {
   index: number;
   task : string;
   completed:boolean;
 };
 
 const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);

    
 function handleDeleteTODO(index:number)
  {
    setTodoList((prevList: ToDoProps[])=>prevList.filter((task)=> task.index !== index));
  }
  export default handleDeleteTODO;