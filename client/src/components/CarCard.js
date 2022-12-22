import React from 'react'
import { NavLink } from 'react-router-dom'

const CarCard = ({ car }) => {
  return (
    <>
      <div className='shadow-md hover:shadow-xl hover:translate-x-3 w-[230px] mb-4 ml-4'>

        <div>
          <img
            className='object-cover rounded-t-md object-center h-40 w-[300px]'
            src={car.image} alt='carImage'
          />
        </div>

        <div className='p-6'>
          <h1 className='capitalize font-bold'> {car.name}</h1>
          <p className='text-sm font-semibold'>${car.rentPerHour}/ day</p>
          <button className='text-sm font-semibold bg-orange-300 rounded-md mt-2 p-2'>
            <NavLink to={`/booking/${car._id}`} >Book now</NavLink>
          </button>
        </div>
      </div>
    </>
  )
}

export default CarCard