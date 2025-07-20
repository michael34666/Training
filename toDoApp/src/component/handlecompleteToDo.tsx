  import { useState } from 'react'
  
  type ToDoProps = {
    index: number;
    task : string;
    completed:boolean;
  };
  
  const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);
  const [newTodo, setNewTodo] = useState('');
    
  function handlecompleteToDo(index:number)
  {
    setTodoList((prevList: ToDoProps[]) =>
      prevList.map((task) =>
       task.index===index ? { ...task, completed: !task.completed } : task
     )
    );
  }

  export default handlecompleteToDo