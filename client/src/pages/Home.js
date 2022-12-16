import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { NavLink } from 'react-router-dom'
import { DatePicker } from 'antd'
import moment from 'moment'
const {RangePicker} = DatePicker

//import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const { cars } = useSelector(state => state.carsReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const [totalCars , setTotalcars] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars())
    //console.log(cars)
  }, [dispatch])

  useEffect(() => {

    setTotalcars(cars)
    
}, [cars])

function setFilter(values){

  var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
  var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

  var temp=[]

  for(var car of cars){

        if(car.bookedTimeSlots.length === 0){
            temp.push(car)
        }
        else{

             for(var booking of car.bookedTimeSlots) {

                 if(selectedFrom.isBetween(booking.from , booking.to) ||
                 selectedTo.isBetween(booking.from , booking.to) || 
                 moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                 moment(booking.to).isBetween(selectedFrom , selectedTo)
                 )
                 {

                 }
                 else{
                     temp.push(car)
                 }

             }

        }

  }


  setTotalcars(temp)


}

  return (
    <DefaultLayout>
    <div>
    <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
    </div>


      {loading === true && (<Spinner />)}
     
       
      
        {totalCars.map((car, index) => (
          <div key={index}>
            {car.name}
           <img src={car.image} alt='carImage' />
            {car.rentPerHour}
            <NavLink
            to={`/booking/${car._id}`} >Book now</NavLink>
          </div>
        ))}
      
    </DefaultLayout>


  )
}

export default Home