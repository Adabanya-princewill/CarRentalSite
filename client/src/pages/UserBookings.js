import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import Spinner from '../components/Spinner';
import moment from "moment";


function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3 className="text-center mt-2 font-semibold uppercase mb-6">My Bookings</h3>

      
        <div class="max-w-screen-xl mx-auto mb-6">

          {bookings.filter(o => o.user === user._id).map((booking) => (
            <div key={booking.car._id} className='shadow-md lg:h-72 rounded-lg mb-8 max-w-screen-xl m-5 md:flex'>           

              <div class="p-6 grow">
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">{booking.car.name}</h2>
                <p class="mt-4 text-gray-500 dark:text-gray-300">Total hours : <b>{booking.totalHours}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">Total amount : <b>{booking.totalAmount}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">Transaction Id : <b>{booking.transactionId}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300">Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                <p class="mt-1 text-gray-500 dark:text-gray-300"></p>
              </div>
            
              <div class="grow">
                <img src={booking.car.image} alt="bookinCarImage" className='lg:h-72 h-full w-full object-cover object-center rounded-b md:rounded' />
              </div>
            </div>
          ))}

        </div>
      
    </DefaultLayout >
  );
}

export default UserBookings;
