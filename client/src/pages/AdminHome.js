import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTotalcars(cars);
    // eslint-disable-next-line
  }, [cars]);

  return (
    <DefaultLayout>
      {loading === true && <Spinner />}
      <div className='w-full' >
        <div className="py-4 mx-auto max-w-screen-xl mb-8 lg:mb-8">
          <div className="relative flex items-center justify-between">
            
              <span className="px-4 md:text-xl text-sm font-bold text-gray-800">Admin Panel</span>
           
            <button className="flex mr-5 items-center lg:flex">
              <button className="lg:mr-4 inline-flex items-center justify-center md:text-xl tex-sm bg-orange-300 rounded-sm px-2 py-1 text-gray-800">
              <a href="/addcar"><b>Add Car</b></a>
              </button>
            </button>
          </div>
        </div>

      </div>


      <main className='sm:max-w-xl md:max-w-screen-xl grid w-[230px] mx-auto md:w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>

        {totalCars.map((car, index) => (
          <div key={index}>
            <div className='shadow-md w-[230px] mb-4 ml-4'>

              <div>
                <img
                  className='object-cover rounded-t-md object-center h-40 w-[300px]'
                  src={car.image} alt='carImage'
                />
              </div>

              <div className='p-6'>
                <h1 className='capitalize font-bold'> {car.name}</h1>
                <p className='text-sm font-semibold'>Rent Per Hour: {car.rentPerHour} </p>
                <p className='text-sm font-semibold'>Max Persons: {car.capacity} </p>
                <p className='text-sm font-semibold mb-4'>Fuel Type: {car.fuelType} </p>
                <span className='p-2'>
                  <NavLink to={`/editcar/${car._id}`}>
                    <EditOutlined
                      className="mr-3"
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </NavLink>
                  <Popconfirm
                    title="Are you sure to delete this car?"
                    onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Popconfirm>
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>










      {/* 
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row> */}


      
    </DefaultLayout>
  );
}

export default AdminHome;
