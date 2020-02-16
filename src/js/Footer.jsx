import React, { Component } from 'react'

export default class Footer extends Component {
   
    render() {
        let {todoNum,showView,deletehasCompleted} = this.props;
        return (
           <footer className="footer">
               <span className="todo-count">
                  <strong>{todoNum}</strong>
                  <span>{todoNum>1?" items":" item"} left</span>
               </span>
               <ul className="filters">
                 <li><a href="#/all" onClick={()=>showView('all')}>All</a></li>
                 <li><a href="#/active" onClick={()=>showView('active')}>Active</a></li>
                 <li><a href="#/completed" onClick={()=>showView('completed')}>Completed</a></li>
               </ul>
               <button className="clear-completed"
                 onClick={()=>deletehasCompleted()}
               >Clear Completed</button>
           </footer>
        )
    }
}
