import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';
import { Checkbox, Modal, DatePicker } from "antd";
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;


const BookingCar = () => {
  const { carid } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id === carid));
    }
  }, [dispatch, cars, carid]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + (30 * totalHours));
    }
  }, [driver]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function handleToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <img src={car.image} className="" alt="carImage" />

      <h2>
        Car Info
      </h2>
      <div>
        <p>car name: {car.name}</p>
        <p> Rent Per hour: ${car.rentPerHour}</p>
        <p>Fuel Type : {car.fuelType}</p>
        <p>Max Persons : {car.capacity}</p>
      </div>

      <h2>
        Select Time Slots
      </h2>
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="MMM DD yyyy HH:mm"
        onChange={selectTimeSlots}
      />
      <br />
      <button
        className="btn1 mt-2"
        onClick={() => {
          setShowModal(true);
        }}
      >
        See Booked Slots
      </button>
      {from && to && (
        <div>
          <p>
            Total Hours : <b>{totalHours}</b>
          </p>
          <p>
            Rent Per Hour : <b>{car.rentPerHour}</b>
          </p>
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setdriver(true);
              } else {
                setdriver(false);
              }
            }}
          >
            Driver Required
          </Checkbox>

          <h3>Total Amount : {totalAmount}</h3>

          <StripeCheckout
            shippingAddress
            token={handleToken}
            currency='USD'
            amount={totalAmount}
            stripeKey="pk_test_51MEDGZEDeFPrwBMKJXBgwpUeC3uGtRJe6ppvE0PZokoL3PVhU91W4gn79sab7V7LWuwSAr7RGMdG3mbAhzHufYKO002XQZt6It"
          >
            <button className="border border-black">
              Book Now
            </button>
          </StripeCheckout>  
         

        </div>
      )}


      {car.name && (
        <Modal
          open={showModal}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          <div className="p-2">
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className="mt-2">
                  {slot.from} - {slot.to}
                </button>
              );
            })}

            <div className="text-right mt-5">
              <button
                className=""
                onClick={() => {
                  setShowModal(false);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}

    </DefaultLayout>
  )
}

export default BookingCar