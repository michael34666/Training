import { useState } from 'react'

type ToDoProps = {
  index: number;
  task : string;
  completed:boolean;
};

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


 




  export default  handleAdd
