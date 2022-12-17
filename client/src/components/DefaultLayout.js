import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { NavLink } from 'react-router-dom';

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const items = [
    {
      label: (
        <a href="/">Home</a>
      ),
      key: '0',
    },
    {
      label: (
        <a href="/userbookings">Bookings</a>
      ),
      key: '1',
    },
    {
      label: (
        <a href="/admin">Admin</a>
      ),
      key: '2',
    },
    {
      label: (
        <a onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login'
        }}>
          <span style={{ color: 'orangered' }}>Logout</span>
        </a>
      ),
      key: '3',
    },

  ];

  return (
    <>
      <div className='w-full shadow-md' >
        <div className="py-4 mx-auto max-w-screen-xl mb-8 lg:mb-8">
          <div className="relative flex items-center justify-between">
            <NavLink to="/" end>
              <span className="px-4 md:text-xl text-sm font-bold text-gray-800">Obaya <span className='text-orange-300'>Cars</span> </span>
            </NavLink>
            <button className="flex mr-5 items-center lg:flex">
              <span className="lg:mr-4 inline-flex items-center justify-center md:text-xl tex-sm text-gray-800">
                <Dropdown menu={{
                  items,
                }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className='bg-orange-300 rounded-md px-2 py-1'>
                      {user.username}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </span>
            </button>
          </div>
        </div>

      </div>


      <div>
        {props.children}
      </div>
    </>
  )
}

export default DefaultLayout