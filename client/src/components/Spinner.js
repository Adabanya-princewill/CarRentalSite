import React from 'react'
import {Spin} from 'antd'

const Spinner = () => {
  return (
    <div className='z-10 absolute top-[50%] left-[50%]'>
        <Spin size='large' />
    </div>
  )
}

export default Spinner