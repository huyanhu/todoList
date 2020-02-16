import React, { Component } from 'react'
import './css/index'
import Item from './js/Item'
import Footer from './js/Footer'
export default class App extends Component { 
  constructor(){
      super();
      //初始化，this.state值
      this.state={
          todoDatas:[],//this.setState()
          todoNum:0,
          view:'all',
          flag:false //全选和全不选的标识
      }
      this.addTodo=this.addTodo.bind(this);
      this.deleteTodo=this.deleteTodo.bind(this);
      this.changeHasCompleted=this.changeHasCompleted.bind(this);
      this.editTodo=this.editTodo.bind(this);
      this.showView=this.showView.bind(this);
      this.deletehasCompleted=this.deletehasCompleted.bind(this);
      this.isAll=this.isAll.bind(this);
    }
//isAll全选和全不选
isAll(){
  let {flag,todoDatas,todoNum}=this.state;
  flag=!flag;
  todoDatas=todoDatas.map(value=>{
      if(flag){
        value.hasCompleted=true;
      }else{
        value.hasCompleted=false;
      } 
      return value;
  })
    if(flag){
      todoNum=0;
    }else{
      todoNum=todoDatas.length;
    }

    this.setState({todoDatas,todoNum,flag})
}
//删除所有已完成的todo:
deletehasCompleted(){
  let {todoDatas}=this.state;
  todoDatas=todoDatas.filter(value=>{
       if(value.hasCompleted){
         return false;
       }else{
          return true;
       }
  })
  this.setState({todoDatas});
}
//数据过滤
showView(view){
  this.setState({view});
}
//修改todo
editTodo(todo){
  let {todoDatas}=this.state;
  todoDatas=todoDatas.map(value=>{
     if(todo.id===value.id){
       value.value=todo.value;
     }
     return value;
  })
  this.setState({todoDatas});
  return true;
}
//改变todo的状态
changeHasCompleted(todo){
    let {todoDatas,todoNum}=this.state;
    todoDatas=todoDatas.map(value=>{
        if(todo.id===value.id){
            value.hasCompleted=!todo.hasCompleted;
            if(!value.hasCompleted){
              todoNum++;
            }else{
              todoNum--;
            }
        }
        return value;
    })
    this.setState({todoDatas,todoNum});
}
//删除todo
  deleteTodo(todo){
     let {todoDatas,todoNum}=this.state;
     todoDatas=todoDatas.filter(value=>{
         if(todo.id===value.id){
             if(!value.hasCompleted){
               todoNum--;
             }
             return false;//传递过的todo.id和原有的todoDatas value.id相等，删除这个todo
         }else{
             return true;
         }
     })
     this.setState({todoDatas,todoNum});
  }
  //添加todo
  addTodo(e){
        //如果你按的键不是回车，不添加todo
    if(e.keyCode!==13) return false; 
      //如果文本框为空，不添加todo
    if(e.target.value.trim()==="") return false;
  
    let {todoDatas,todoNum}=this.state;
    //准备todo
    let todo={};
    todo.id=new Date().getTime();
    todo.value=e.target.value.trim();
    todo.hasCompleted=false;
    // todo-->{id:23232332,value:"哈哈",hasCompleted:false}
    todoDatas.push(todo); 
    todoNum++;
    this.setState({todoDatas,todoNum});
    e.target.value="";
}
  render() {
    let {addTodo,deleteTodo,changeHasCompleted,editTodo,showView,deletehasCompleted,isAll}=this;
    // let todoDatas=this.state.todoDatas;
    let {todoDatas,todoNum,view}=this.state;
    let filterTodoDatats=todoDatas.filter(todo=>{
       switch(view){
         case 'all':
           return true;
         case 'active':
           return !todo.hasCompleted;
         case 'completed':
           return todo.hasCompleted;
       }
    })
    let items=filterTodoDatats.map((todo,index)=>{
        return (
            <Item
              todo={todo}
              key={index}
              deleteTodo={deleteTodo}
              changeHasCompleted={changeHasCompleted}
              editTodo={editTodo}
            />
        )
    })
    // items={
    //     <Item todo={{id:1,value:"a",hasCompleted:false}} key={0}/>,
    //     <Item todo={{id:2,value:"b",hasCompleted:false}} key={1}/>,
    //     <Item todo={{id:3,value:"c",hasCompleted:false}} key={2}/>
    // }
    return (
       <section className="todoapp">
           <header className="header">
              <h1>Todos</h1>
              <input type="text" className="new-todo"
                onKeyUp={addTodo}
              />
           </header>
           <section className="main">
              <input type="checkbox" className="toggle-all"
                onClick={isAll}
              />
              <ul className="todo-list">
                {items}
              </ul>
           </section>
           <Footer todoNum={todoNum}
             showView={showView}
             deletehasCompleted={deletehasCompleted}
           />
       </section>
    )
  }
}
