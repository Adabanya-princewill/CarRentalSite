import React from 'react'
import { Menu, Dropdown, Button } from "antd";
import { NavLink } from 'react-router-dom';

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>
        <span style={{ color: 'orangered' }}>Logout</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <NavLink to={'/'}>
        <h1 className='w-full shadow-md bg-orange-300 p-2 font-semibold'>Obaya cars</h1>
      </NavLink>
      <Dropdown overlay={menu} placement="bottomCenter">
        <Button>{user.username}</Button>
      </Dropdown>
      <div>
        {props.children}
      </div>
    </>
  )
}

export default DefaultLayout