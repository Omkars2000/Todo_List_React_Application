import "./App.css";
import Heder from "./Mycomponents/Heder";
import {Todos} from "./Mycomponents/Todos";
import {Footer} from "./Mycomponents/Footer";
import {AddTodo} from "./Mycomponents/AddTodo";
import { About } from "./Mycomponents/About";
import { useState,useEffect } from "react";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo= [];
  }else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete=(todo)=>{ 
      console.log("i am onDelete",todo)
      //deleting this way react not work
      // let index=todos.indexOf(todo)
      //todos.splice(index,1)

      setTodos(todos.filter((e)=>{
        return e!==todo;
      }));
      localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo=(title,desc)=>{
    let srno;
    console.log("I am adding todo",title,desc)
    if(todos.length===0){
      srno=0;
    }else{
       srno= todos[todos.length-1].srno + 1;
    }
   
    const myTodo={
      srno: srno,
      title: title,
      desc: desc,
    }
    setTodos([...todos,myTodo])
    console.log(myTodo);
  }


  
  const [todos,setTodos]=useState(initTodo)
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos]) 
  
  return (
    <>
    <Router>
    <Heder title="My Todos List" serchBar={true}/>
  <Switch>
    <Route exact path="/" render={()=>{
      return(
        <>
         <AddTodo addTodo={addTodo}/>
         <Todos todos={todos} onDelete={onDelete}/>
        </>
      )
    }}>
      
    </Route>
    <Route exact  path="/About">
     <About/> 
    </Route>
  </Switch>
    <Footer/>
    </Router>
// try to find out issue on Switch case in React-Dom
//     <Heder title="My Todos List" serchBar={true}/>
//     <AddTodo addTodo={addTodo}/>
//      <Todos todos={todos} onDelete={onDelete}/>
//         <Footer/>
   </>
  );
}

export default App;
