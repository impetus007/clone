import React from 'react'
import './Go-Admin.css'
import { Link,Outlet } from 'react-router-dom'
const Go_to_AEvolution = () => {
  return (
    <div>
        <center>
        <div className='Admin-go-head'>
            <button>Attendance</button>
            <Link to="Admin-Assessment-dash"><button>Assessment</button></Link>
            <button>Quizzes</button>
            <Link to="Admin-Over-All"><button>Overall</button></Link>            
        </div>
        </center>
        <Outlet/>
    </div>
  )
}

export default Go_to_AEvolution