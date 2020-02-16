import React, { Component } from 'react'

export default class Item extends Component {
    constructor(){
      super();
      this.state={
        inEdit:false,//是否进入编辑状态
                   //进入编辑状态应用editing退出编辑状态移除editing
        flag:true//判断是否进行失去焦点事件
        }
      this.changeEdit=this.changeEdit.bind(this);
    }
    //进入编辑状态
    changeEdit(){
      let {todo}=this.props;
      this.setState(
            {inEdit:true},
            ()=>{//设置完state以后的回调函数
              this.refs.myInput.value=todo.value;
              //原生js，模拟触发事件
              this.refs.myInput.focus();
            }
        );
    }
    render() {
        console.log("Item this.props",this.props);
        let {inEdit,flag} = this.state;
        let {changeEdit}=this;
        let {todo,deleteTodo,changeHasCompleted,editTodo}=this.props;
        let completed=todo.hasCompleted?"completed":"";
        let className=inEdit?completed+" "+"editing":completed;
        return (
          <li className={className}>
              <div className="view">
                <input type="checkbox" className="toggle"
                 onChange={()=>changeHasCompleted(todo)}
                 checked={todo.hasCompleted}
                />
                <label 
                  onDoubleClick={changeEdit}
                >{todo.value}</label>
                <button className="destroy"
                  onClick={()=>deleteTodo(todo)}
                ></button>
              </div>
              <input type="text" ref="myInput" className="edit"
                onBlur={(e)=>{
                  if(flag){   
                  todo.value=e.target.value.trim();
                  if(editTodo(todo)){
                    this.setState({inEdit:false})
                  }
                  }
                }}

                onKeyUp={(e)=>{
                 if(e.keyCode===13){
                  todo.value=e.target.value.trim();
                  if(editTodo(todo)){
                    this.setState({inEdit:false})
                    }
                  }
                   if(e.keyCode===27){
                      if(editTodo(todo)){
                        this.setState({
                          inEdit:false,
                          flag:false
                        })
                      }
                      setTimeout(()=>{
                          this.setState({
                            flag:true
                          })
                        },100)
                }
               }
              }
              />
          </li>
        )
    }
}
