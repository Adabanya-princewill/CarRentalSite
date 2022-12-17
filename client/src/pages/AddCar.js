import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'
// import { userLogin } from '../redux/actions/userActions'


function AddCar() {

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)
  const initialFormData = {
    name: '',
    rentPerHour: '',
    capacity: '',
    fuelType: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.bookedTimeSlots = []
    dispatch(addCar(formData))
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <div className='mx-auto max-w-screen-xl'>
          <NavLink to={"/admin"}>
            <span className='shadow-md rounded-md px-5 py-2 ml-5 text-black'> back</span>
          </NavLink>
        </div>
      <div class="w-full mb-20 max-w-sm mt-20 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      
        <div class="px-6 py-4">
          <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">Obaya</h2>

          <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back </h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">Add New Car</p>

          <form onSubmit={handleSubmit}>
            <div class="w-full mt-4">
              <input name="name" onChange={handleChange} value={formData.name} type='text' required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Car name" aria-label="Car name" />
            </div>

            <div class="w-full mt-4">
              <input name="rentPerHour" onChange={handleChange} value={formData.rentPerHour} type='number' required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="rent Per Hour" aria-label="Password" />
            </div>
            <div class="w-full mt-4">
              <input name="capacity" onChange={handleChange} type='number' value={formData.capacity} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Capacity" aria-label="Password" />
            </div>
            <div class="w-full mt-4">
              <input name="fuelType" onChange={handleChange} type='text' value={formData.fuelType} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Fuel Type" aria-label="Password" />
            </div>
            <div class="w-full mt-4">
              <input name="image" alt='carImage' onChange={handleChange} type='image_url' value={formData.image} required class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" placeholder="Car Url" aria-label="Password" />
            </div>
           

            <div class="flex items-center justify-between mt-4">

              <button type='submit' class="px-6 mx-auto py-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-orange-300 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50">
                Add Car
              </button>
            </div>
          </form>
        </div>

      </div>
    </DefaultLayout >
  )
}

export default AddCar
