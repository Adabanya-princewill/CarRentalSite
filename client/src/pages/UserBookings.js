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
  }, []);

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>

      {bookings.filter(o => o.user === user._id).map((booking) => (
        <div key={booking.car._id}>
          <p><b>{booking.car.name}</b></p>
          <p>Total hours : <b>{booking.totalHours}</b></p>
          <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
          <p>Total amount : <b>{booking.totalAmount}</b></p>



          <p>Transaction Id : <b>{booking.transactionId}</b></p>
          <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
          <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
          <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>



          <img src={booking.car.image} className="p-2" alt="bookinCarImage" />
        </div>

      ))}

      
    </DefaultLayout >
  );
}

export default UserBookings;
