import './App.css';
import React, { Component, useEffect, useState } from 'react';
import Layout from './Layout/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Register from './Register/Register';
import jwtDecode from 'jwt-decode';
import Dashboard from './Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Studentsadmin from './Students/Studentsadmin';
import ExamsHistory from './ExamsHistory/ExamsHistory';
import StudentSubjects from './StudentSubjects/StudentSubjects';
import Studentexamshistory from './Studentexamshistory/Studentexamshistory';
import ChooseExamSubject from './ChooceExamSubject/ChooseExamSubject';
import AddQuestionForm from './AddQuestionForm/AddQuestionForm';
import RequestExam from './RequestExam/RequestExam';
import Exampage from './Exampage/Exampage';
import Finshedpage from './Finshed/Finshedpage';



export default function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken') !==null){
      saveUserData()
    }
  },[])


  const [userData,setUserData] = useState(null);
  const [userToken,setUserToken] = useState();
  function saveUserData(){
    const encodingToken = localStorage.getItem("userToken");
    setUserToken(encodingToken);
    const decodingToken = jwtDecode(encodingToken);
    setUserData(decodingToken)
  }

const router = createBrowserRouter([
  {path:"/" , element:<Layout userData={userData } setUserData={setUserData}/>, children : [
    {path:"dashboard", element:<ProtectedRoute userData={userData}><Dashboard usertoken={userToken} /></ProtectedRoute>},
    {path:"students", element:<ProtectedRoute userData={userData}><Studentsadmin usertoken={userToken}/></ProtectedRoute>},
    {path:"ExamsHistory", element:<ProtectedRoute userData={userData}><ExamsHistory usertoken={userToken}/></ProtectedRoute>},
    {path:"createExamQA", element:<ProtectedRoute userData={userData}><ChooseExamSubject usertoken={userToken}/></ProtectedRoute> }, 
    {path:"AddQuestionForm/:subjectId", element:<ProtectedRoute userData={userData}><AddQuestionForm  usertoken={userToken}/></ProtectedRoute>},
    {path:"SudentSubjects", element:<ProtectedRoute userData={userData}><StudentSubjects usertoken={userToken}/></ProtectedRoute>},
    {path:"requestExam", element:<ProtectedRoute userData={userData}><RequestExam usertoken={userToken}/></ProtectedRoute>},
    {path:"Exampage/:subjectId", element:<ProtectedRoute userData={userData}><Exampage  usertoken={userToken}/></ProtectedRoute>},
     {path:"Finshpage", element:<ProtectedRoute userData={userData}><Finshedpage  usertoken={userToken}/></ProtectedRoute>},
    {path:"studentexamshistory", element:<ProtectedRoute userData={userData}><Studentexamshistory usertoken={userToken}/></ProtectedRoute>},
    {path:"login", element:<Login saveUserData={saveUserData}/>},
    {path:"register", element:<Register/>},
    {path:"*", element:<NotFound/>},
    

  ]}
])
    return <>    
    
    <RouterProvider router={router}/>
    </> 
      
    
}


