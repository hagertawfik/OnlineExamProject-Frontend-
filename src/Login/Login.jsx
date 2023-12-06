import axios from 'axios'
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

 const [errors ,setErrors] = useState({});  

 const navigate = useNavigate();

const [errorList, seterrorList] = useState([])
 const [userData , setuserData]= useState({
  Email:"",
  Password:"",

 });

const getUser = (e)=>{
const myUser= {...userData}
myUser[e.target.name] = e.target.value
setuserData (myUser)

}

const validateLoginForm= ()=>{
  let scheema = Joi.object({
    Email:Joi.string().email({ tlds: { allow: false } }).required(),
    Password:Joi.string().pattern(/[A-Z]{1,2}[a-z]{1,5}[0-9]{1,4}[*.!@#$%^&?]{1}/).required() 
  });
  return scheema.validate(userData,{abortEarly:false})
}


const SendRequestDataToApi = async () =>{
    try {
    const {data} = await axios.post('http://localhost:5108/api/Authentication/login', userData);
 if (data.result == true ) {
  setErrors(data.message)
localStorage.setItem("userToken",data.token);
   props.saveUserData();
  navigate('/');
}

  } catch (error) {
    if (error.response && error.response.status === 400)
      setErrors(error.response.data) 
    else 
      console.error('Unhandled error:', error);
  }
}

const submitLoginationForm =(e)=>{
    e.preventDefault();
 const validationResulet = validateLoginForm();
 if(validationResulet.error)
  seterrorList(validationResulet.error.details)
else
   SendRequestDataToApi();
}

  return <>
{errors.result == false?<div className='alert alert-danger my-2'>{errors.message}</div>:""}
  <form onSubmit={submitLoginationForm} >

<label htmlFor='Email'>Email:</label>
<input onChange={getUser} name='Email' type='email' id='Email' className='form-control my-2 ' placeholder=' johena@sample.com'/>
{errorList.filter((err)=> err.context.label =='Email')[0]?<div className='alert alert-danger my-1'><p>{errorList.filter((err)=> err.context.label=='Email')[0]?.message}</p></div>:" "}
<label htmlFor='Password'>Password:</label>
<input onChange={getUser} name='Password' type='password' id='Password' className='form-control my-2 '/>
{errorList.filter((err)=> err.context.label =='Password')[0]?<div className='alert alert-danger my-1'><p>password is not valid it must contain capital, small and specail character </p></div>:" "}
<button type='submit' className='btn btn-info'>Login

</button>
  </form>
  
  </>
}
