  import { useState } from 'react'
  
  type ToDoProps = {
    index: number;
    task : string;
    completed:boolean;
  };
  
  const [ToDoList, setTodoList] = useState<ToDoProps[]>([]);

    
  
  function howmanyneedTODO()
  {
    if(ToDoList.length === 0) {
      return 0;
    }
    let count = 0;
    ToDoList.forEach((task) => {
      if(!task.completed){
        count++;
      }
    });
    return count;
  }
  export default howmanyneedTODO;