import React from 'react'
import { NavLink } from 'react-router-dom'
import './Admin_Assess.css'

const tablecontext=[
  {
      name: "Student-1",
      Assessment:"Matter",
      Date:"27/9/21",
      Time_Taken:"1day",
      Score:"8/10",
      Report: "Report",
  },
  {
      name: "Student-2",
      Assessment:"Matter",
      Date:"27/9/21",
      Time_Taken:"1day",
      Score:"10/10",
      Report: "Report",
  },
  {
      name: "Student-3",
      Assessment:"Matter",
      Date:"27/9/21",
      Time_Taken:"1day",
      Score:"9/10",
      Report: "Report",
  },
  {
      name: "Student-4",
      Assessment:"Matter",
      Date:"27/9/21",
      Time_Taken:"1day",
      Score:"7/10",
      Report: "Report",
  }
]
const Admin_Assess = () => {
  return (
    <div>
      <table className='Admin-Assess_dash-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Assessment</th>
            <th>Date</th>
            <th>Time-taken</th>
            <th>Score</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {
            tablecontext.map((i)=>{
              return<>
                <tr>
                    <td><NavLink to="/reports/Evalution/Go-Admin-Evalution/Admin-Student"><a herf="#">{i.name}</a></NavLink></td>
                    <td>{i.Assessment}</td>
                    <td>{i.Date}</td>
                    <td>{i.Time_Taken}</td>
                    <td>{i.Score}</td>
                    <td><a herf="#">{i.Report}</a></td>
                </tr>
              </>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Admin_Assess