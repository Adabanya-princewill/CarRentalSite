import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from 'react-stripe-checkout';
import { Checkbox, Modal, DatePicker } from "antd";
import { NavLink, useParams } from "react-router-dom";
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
      <div className='max-w-screen-xl mx-auto'>


        <div className="mt-10">
          <NavLink to={"/"}>
            <span className='shadow-md rounded-md px-5 py-2 ml-5 text-black'> back</span>
          </NavLink>
        </div>


        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 lg:py-24 mx-auto">
            <div className="lg:w-5/5 mx-auto flex flex-wrap">

              <img
                alt='Car Details'
                className="border lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={car.image} />

              <div className="lg:w-1/4 w-full lg:pl-10 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-7">{car.name}</h1>
                <p className="leading-relaxed">  Rent Per hour: <b>${car.rentPerHour}</b>  </p>
                <p className="leading-relaxed">Max Persons : <b>{car.capacity}</b> </p>
                <p className="leading-relaxed">Fuel Type : <b>{car.fuelType}</b></p>
                <hr className="my-4" />
                <p className="leading-relaxed"> Select Time Slots</p>
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
              </div>

              <div className="lg:pt-16 ml-4 p-2 mt-6 lg:mt-0">
                {from && to && (
                  <div>
                    <p className="leading-relaxed"> Total Hours : <b>{totalHours}</b></p>

                    <p>
                      <p className="leading-relaxed"> Rent Per Hour : <b>{car.rentPerHour}</b></p>

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
                      billingAddress
                      shippingAddress
                      token={handleToken}
                      currency='USD'
                      amount={totalAmount}
                      stripeKey = {process.env.STRIPE_KEY}
                    >
                      <button className="bg-orange-300 p-2 mt-8 rounded-md">
                        Book Now
                      </button>
                    </StripeCheckout>


                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </div>





      {car.name && (
        <Modal
          open={showModal}
          closable={false}
          footer={false}
          title="Booked time slots"
        >
          <div className="p-2">
            {car.bookedTimeSlots.map((slot, index) => {
              return (
                <button className="mt-2" key={index}>
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