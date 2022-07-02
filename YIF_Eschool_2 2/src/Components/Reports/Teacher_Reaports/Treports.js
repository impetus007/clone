import React from 'react'
import './Treports.css'
import {Link,Outlet} from 'react-router-dom'

const Treports = () => {
  return (
    <>
    <div className='Treports'>
        <Link to="/reports/my-report"><button>My Reports</button></Link>
        <Link to="/reports/Evalution"><button>Class Evaluations</button></Link>
    </div>
    

    </>
  )
}

export default Treports