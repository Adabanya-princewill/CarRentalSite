import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import Spinner from '../components/Spinner';


const Login = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)

  const initialFormData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userLogin(formData))

    console.log(formData)

  }
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  return (
    <>
      {loading && (<Spinner />)}

      <form className='m-2' onSubmit={handleSubmit}>
        <label>password:  <input onChange={handleChange} type='password' name='password' value={formData.name} required className='border border-black' /></label>
        <br />

        <label>username:  <input onChange={handleChange} name='username' value={formData.username} type='username' className='border border-black mt-5' /></label>
        <br />
        <button type='submit' className='p-2 bg-orange-500'>login</button>
      </form>
      <NavLink to="/register" end>
        <span className="text-blue-500">Not registerd? click here to register</span>
      </NavLink>

    </>
  )
}

export default Login