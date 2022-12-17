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
    <>
      {loading && (<Spinner />)}
       <div class="w-full max-w-sm mt-20 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
          <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">Obaya</h2>

          <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Create account</p>

          <form onSubmit={handleSubmit}>
            <div class="w-full mt-4">
              <input onChange={handleChange} name='username' value={formData.username} type='username' class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Username" aria-label="user name" />
            </div>

            <div class="w-full mt-4">
              <input onChange={handleChange} type='password' name='password' value={formData.name} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Password" aria-label="Password" />
            </div>
            <div class="w-full mt-4">
              <input name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} type='password' required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" placeholder="Confirm Password" aria-label="Password" />
            </div>

            <div class="flex items-center justify-between mt-4">

              <button type='submit' class="px-6 mx-auto py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Register
              </button>
            </div>
          </form>
        </div>

        <div class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>
          <NavLink to="/login" end>
            <a href="#" class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400">login</a>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Register