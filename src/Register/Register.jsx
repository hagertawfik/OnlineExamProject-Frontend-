import axios from 'axios'
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [errorList, seterrorList] = useState([])
  const [userData, setuserData] = useState({
    UserName: "",
    Stname: "",
    Email: "",
    Password: "",
    Gender: ""

  });

  const getUser=(e)=> {
    const myUser = { ...userData }
    myUser[e.target.name] = e.target.value
    setuserData(myUser)
  }

  const validateRegisterForm =()=> {
    let scheema = Joi.object({
      UserName: Joi.string().min(3).max(15).required(),
      Stname: Joi.string().min(3).max(20).required(),
      Email: Joi.string().email({ tlds: { allow: false } }).required(),
      Password: Joi.string().pattern(/[A-Z]{1,2}[a-z]{1,5}[0-9]{1,4}[*.!@#$%^&?]{1}/).required(),
      Gender: Joi.string().min(4).max(5).required(),
    });
    return scheema.validate(userData, { abortEarly: false })
  }
  
  const SendRequestDataToApi = async () =>{
    try {
      const {data} = await axios.post('http://localhost:5108/api/Authentication/registeration', userData);
      if (data.result == true) {
        setErrors(data.message)
        navigate('/login');
      }

    } catch (error) {
      if (error.response && error.response.status === 400)
        setErrors(error.response.data) 
        else 
        console.error('Unhandled error:', error);
    }

  }

  const submitRegisterationForm =(e)=> {
    e.preventDefault();
 
    const validationResulet = validateRegisterForm();
    if (validationResulet.error) 
      seterrorList(validationResulet.error.details)
    else 
      SendRequestDataToApi();
  }

  return <>
   {errors.token == false?<div className='alert alert-danger my-2'>{errors.message}</div>:""}
    <form onSubmit={submitRegisterationForm} >

      <label htmlFor='UserName'>UserName:</label>
      <input onChange={getUser} name='UserName' type='text' id='UserName' className='form-control my-2 ' placeholder=' johena'/>
      {errorList.filter((err) => err.context.label == 'UserName')[0] ? <div className='alert alert-danger '><p>{errorList.filter((err) => err.context.label == 'UserName')[0]?.message}</p></div> : ""}
      <label htmlFor='Stname'>Full Student Name:</label>
      <input onChange={getUser} name='Stname' type='text' id='Stname' className='form-control my-2 ' placeholder=' johena mego'/>
      {errorList.filter((err) => err.context.label == 'Stname')[0] ? <div className='alert alert-danger '><p>{errorList.filter((err) => err.context.label == 'Stname')[0]?.message}</p></div> : ""}
      <label htmlFor='Email'>Email:</label>
      <input onChange={getUser} name='Email' type='email' id='Email' className='form-control my-2 ' placeholder='  johena@sample.com'/>
      {errorList.filter((err) => err.context.label == 'Email')[0] ? <div className='alert alert-danger '><p>{errorList.filter((err) => err.context.label == 'Email')[0]?.message}</p></div> : ""}
      <label htmlFor='Password'>Password:</label>
      <input onChange={getUser} name='Password' type='password' id='Password' className='form-control my-2 '/>
      {errorList.filter((err) => err.context.label == 'Password')[0] ? <div className='alert alert-danger '><p>Password is not valid it must contain capital, small and specail character </p></div> : ""}
      <label htmlFor='Gender'>Gender:</label>
      <div className="form-check my-2 ">
  <input onChange={getUser} className="form-check-input" type="radio" value='male' name="Gender" id="Gender1"/>
  <label className="form-check-label" htmlFor="Gender1">
    male
  </label>
</div>
<div className="form-check my-3">
  <input onChange={getUser} className="form-check-input" type="radio" value='female' name="Gender" id="Gender" defaultChecked/>
  <label className="form-check-label" htmlFor="Gender">
    female
  </label>
</div>
{errorList.filter((err) => err.context.label == 'Gender')[0] ? <div className='alert alert-danger '><p>{errorList.filter((err) => err.context.label == 'Gender')[0]?.message}</p></div> : ""}
      <button type='submit' className='btn btn-info'>Register</button>
    </form>

  </>
}
