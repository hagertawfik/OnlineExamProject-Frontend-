import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout(props) {
const navigate = useNavigate();
  function logout(){
    localStorage.removeItem("userToken");
    props.setUserData(null);
    navigate('/login')


  }
  return <>
<Navbar logout ={logout} userData ={props.userData}/>
<div className="container mb-4">
<Outlet></Outlet>
</div>

 
  
  </>
}
