import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ userData , logout }) {
  return <>
    <div>
      <nav className="p-2 d-flex flex-column flex-md-row justify-content-between">
        <div className='left-side d-flex flex-column flex-md-row align-items-center '>
          <h1 className='m-0 pe-2'>Online Exam</h1>
          

        </div>
        <div className='right-side  d-flex flex-column flex-md-row align-items-center '>
     
          <ul className="list-unstyled d-flex flex-column flex-md-row m-0 align-items-center">

          {userData && userData.role === "student" ? (
  <>
   
    <li className="px-2">
      <Link to="requestExam">RequestExam</Link>
    </li>
    <li className="px-2">
      <Link to="SudentSubjects">SudentSubjects</Link>
    </li>
    <li className="px-2">
      <Link to="studentexamshistory">ExamsHistory</Link>
    </li>
    <li className="px-2 cursor-pointer" onClick={logout}>
      <span>LogOut</span>
    </li>
  </>
) : userData && userData.role === "admin" ? (
  <>
  
    <li className="px-2">
      <Link to="dashboard">Dashboard</Link>
    </li>
    <li className="px-2">
      <Link to="students">Students</Link>
    </li>
    <li className="px-2">
      <Link to="ExamsHistory">Exams</Link>
    </li>
    <li className="px-2">
      <Link to="createExamQA">CreateExamQA</Link>
    </li>
    <li className="px-2 cursor-pointer" onClick={logout}>
      <span>LogOut</span>
    </li>
  </>
) : (
  <>
    <li className="px-2">
      <Link to="login">Login</Link>
    </li>
    <li className="px-2">
      <Link to="register">Register</Link>
    </li>
  </>
)}




          </ul>

        </div>
      </nav>
    </div>

  </>
}
