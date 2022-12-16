import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'


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
    // console.log(formData)
  } 

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3>Add New Car</h3>
      <form onSubmit={handleSubmit}>
        <label>Car name:  <input name="name" onChange={handleChange} value={formData.name} type='text' required className='border border-black' /></label>
        <br />
        <label>rent Per Hour:  <input name="rentPerHour" onChange={handleChange} value={formData.rentPerHour} type='number' required className='border border-black' /></label>
        <br />
        <label>Capacity:  <input name="capacity" onChange={handleChange} type='number' value={formData.capacity} required className='border border-black mt-5' /></label>
        <br />
        <label>fuel Type:  <input name="fuelType" onChange={handleChange} type='text' value={formData.fuelType} required className='border border-black mt-5' /></label>
        <br />
        <label>image:  <input name="image" alt='carImage' onChange={handleChange} type='image_url' value={formData.image} required className='border border-black mt-5' /></label>
        <br />
        <button type='submit' className='p-2 bg-orange-500'>Add car</button>
      </form>
    </DefaultLayout >
  )
}

export default AddCar
