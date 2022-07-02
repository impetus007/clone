import React from 'react'
import './Go.css'
import {Link,Outlet} from "react-router-dom"

const Go_to_evalution = () => {
  return (
    <div>
        <center>
        <div className='go-head'>
            <button>Attendance</button>
            <Link to="Assessment-dash"><button>Assessment</button></Link>
            <button>Quizzes</button>
            <Link to="Over-All"><button>Overall</button></Link>            
        </div>
        </center>
        <Outlet/>
    </div>
  )
}

export default Go_to_evalution