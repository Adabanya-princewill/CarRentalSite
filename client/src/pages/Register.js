import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';

const Register = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)


  const initialFormData = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userRegister(formData))
    console.log(formData)

  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  return (
    <div>
      {loading && (<Spinner />)}
      <form className='m-2' onSubmit={handleSubmit}>
        <label>password:  <input name="password" onChange={handleChange} value={formData.password} type='password' required className='border border-black' /></label>
        <br />
        <label>confirm password:  <input name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} type='password' required className='border border-black' /></label>
        <br />

        <label>username:  <input name="username" onChange={handleChange} type='username' value={formData.username} className='border border-black mt-5' /></label>
        <br />
        <button type='submit' className='p-2 bg-orange-500'>register</button>
      </form>
      <NavLink to="/login" end>
        <span className="text-blue-500">Already have an account? click here to login</span>
      </NavLink>
    </div>
  )
}

export default Register