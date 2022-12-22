import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";
function EditCar() {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  const { carid } = useParams();

  useEffect(() => {
    
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id === carid));
      console.log(car);
    }
      
  }, [cars, carid]);

  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));    
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className='mx-auto max-w-screen-xl mt-10'>
          <NavLink to={"/admin"}>
            <span className='shadow-md rounded-md px-5 py-2 ml-5 text-black'> back</span>
          </NavLink>
        </div>
      <div class="w-full mb-20 max-w-sm mt-20 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
        <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">Obaya</h2>

<h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back </h3>

<p class="mt-1 text-center text-gray-500 dark:text-gray-400">Edit Car</p>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >          

            
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-orange-300" />
              </Form.Item>

              <div class="flex items-center justify-between mt-4">

              <button type='submit' class="px-6 mx-auto py-2 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 transform bg-orange-300 rounded-lg hover:bg-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50">
                Edit Car
              </button>
            </div>
            </Form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EditCar;
