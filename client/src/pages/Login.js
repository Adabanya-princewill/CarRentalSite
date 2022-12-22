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
    

    
      <div className="w-full max-w-sm mt-20 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">Obaya</h2>

          <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input onChange={handleChange} name='username' value={formData.username} type='username' className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-400 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Username" aria-label="user name" />
            </div>

            <div className="w-full mt-4">
              <input onChange={handleChange} type='password' name='password' value={formData.name} required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-400 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Password" aria-label="Password" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

              <button type='submit' className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-500 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
          <NavLink to="/register" end>
            <span href="#" className="mx-2 text-sm font-bold text-orange-500 dark:text-orange-400">Register</span>
          </NavLink>
        </div>
      </div>
     
    </>
  )
}

export default Login