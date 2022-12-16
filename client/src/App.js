import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import AddCar from './pages/AddCar';
import UserBookings from './pages/UserBookings';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';



function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*  protectd routes */}
          <Route exact path='/' element={<ProtectedRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route exact path='/booking/:carid' element={<ProtectedRoute />}>
            <Route exact path='/booking/:carid' element={<BookingCar />} />
          </Route>
          <Route exact path='/userbookings' element={<ProtectedRoute />}>
            <Route exact path='/userbookings' element={<UserBookings />} />
          </Route>
          <Route exact path='/addcar' element={<ProtectedRoute />}>
            <Route exact path='/addcar' element={<AddCar />} />
          </Route>
          <Route exact path='/editcar/:carid' element={<ProtectedRoute />}>
            <Route exact path='/editcar/:carid' element={<EditCar />} />
          </Route>
          <Route exact path='/admin' element={<ProtectedRoute />}>
            <Route exact path='/admin' element={<AdminHome />} />
          </Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    return <Outlet />
  }
  else {
    return <Navigate to='/login' />
  }
}

