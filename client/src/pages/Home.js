import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { DatePicker } from 'antd'
import moment from 'moment'
import CarCard from '../components/CarCard'
const { RangePicker } = DatePicker

//import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const { cars } = useSelector(state => state.carsReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const [totalCars, setTotalcars] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars())
    // eslint-disable-next-line
    //console.log(cars)
  }, [dispatch])

  useEffect(() => {
    setTotalcars(cars)
    // eslint-disable-next-line
  }, [cars])

  function setFilter(values) {

    var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
    var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

    var temp = []

    for (var car of cars) {

      if (car.bookedTimeSlots.length === 0) {
        temp.push(car)
      }
      else {

        for (var booking of car.bookedTimeSlots) {

          if (selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {

          }
          else {
            temp.push(car)
          }

        }

      }

    }


    setTotalcars(temp)


  }

  return (
    <DefaultLayout>
      <section>
        <div className="py-5 mx-auto sm:max-w-xl md:max-w-screen-xl">
          <div className="relative md:flex items-center justify-between mx-3 md:mx-0">
            <span className="px-4 md:text-xl text-sm font-semibold text-gray-800">
              <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />
            </span>
          </div>
        </div>
      </section>



      {loading === true && (<Spinner />)}


      <main className='sm:max-w-xl md:max-w-screen-xl grid w-[230px] mx-auto md:w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>

        {totalCars.map((car, index) => (
          <div key={index}>
            <CarCard car={car} />
          </div>
        ))}
      </main>
    </DefaultLayout>


  )
}

export default Home