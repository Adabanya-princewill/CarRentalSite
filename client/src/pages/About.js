import React from 'react'
import picture from '../assets/order_a_car.png'

const About = () => {
  return (
    <div className='bg-white w-full'>
    
      <div className='md:flex mt-4 p-4 mx-auto max-w-screen-xl'>
        <div className='mb-4 pr-10'>
          <h1 className='text-2xl capitalize font-semibold'>About Us</h1>
          <h2 className='text-gray-800 font-bold mb-4 capitalize text-3xl'>welcome to car rent service</h2>
         <p className='text-md'> Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Voluptatum blanditiis
          esse accusantium dignissimos labore laborum.
          Veniam, corporis mollitia temporibus,
          in quaerat vero deleniti amet dolorem
          repudiandae, pariatur nam dolore! Impedit
          neque sit ad temporibus quam similique
          dolor ipsam praesentium sunt.</p>
          
                 </div>

        <div>
          <img src={picture} className='w-full h-full object-contain' alt='picture_of_a_car' />
        </div>


      </div>

    </div>
  )
}

export default About