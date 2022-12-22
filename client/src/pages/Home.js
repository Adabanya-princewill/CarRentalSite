import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import Spinner from '../components/Spinner'
import { DatePicker } from 'antd'
import moment from 'moment'
import CarCard from '../components/CarCard'
import About from './About'
import OurServices from '../components/OurServices'
import Footer from '../components/Footer'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const { RangePicker } = DatePicker





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
      <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper h-screen"
            >
              <SwiperSlide>
                <img
                  className="object-fill w-full h-screen"
                  src='https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  alt="image slide 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="object-fill w-full h-screen"
                  src="https://images.pexels.com/photos/12634278/pexels-photo-12634278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="image slide 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="object-fill w-full h-screen"
                  src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="image slide 3"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="object-fill w-full h-screen"
                  src="https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="image slide 3"
                />
              </SwiperSlide>
            </Swiper>
        {/* <div className="mx-auto sm:max-w-xl md:max-w-screen-xl">
          <div className="relative md:flex items-center justify-between md:mx-0">
            <span className="px-4 md:text-xl text-sm font-semibold text-gray-800">
              <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />
            </span>         

          </div>
        </div> */}
      </section>



      {loading === true && (<Spinner />)}

        <div className='bg-gray-100 w-full'>
      <main className='sm:max-w-xl py-4 md:max-w-screen-xl grid w-[230px] mx-auto md:w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>

        {totalCars.map((car, index) => (
          <div key={index}>
            <CarCard car={car} />
          </div>
        ))}
      </main>
      </div>
      <About />
      <OurServices />
      <Footer />
    </DefaultLayout>


  )
}

export default Home