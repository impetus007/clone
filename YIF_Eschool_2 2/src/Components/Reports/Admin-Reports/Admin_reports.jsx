import React from 'react'
import './Admin.css'
import { Link } from 'react-router-dom'
const Admin_reports = () => {
  return (
    <div className="Areports">
        <Link to="/reports/my-report"><button>School Reports</button></Link>
        <Link to="/reports/Teacher-Evalution"><button>Teacher Evolutions</button></Link>
        <Link to="/reports/Class-Evalution"><button>Class Evaluations</button></Link>
    </div>
  )
}

export default Admin_reports