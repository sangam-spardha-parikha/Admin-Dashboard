import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/auth/Signin';
import Logout from './pages/auth/Logout';
import Header from './layout/Header'
import Home from './pages/dashboard/Home';
import Profile from './pages/user/Profile';
import StudentUsers from './pages/student/ViewStudent';
import UsersAll from './pages/student/ViewAll';
import AddStaff from './pages/staff/AddStaff';
import EditStaff from './pages/staff/EditStaff';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/profile/me' element={<Profile />} />
          <Route path='/home' element={<Home />} />
          <Route path='/student' element={<StudentUsers/>} />
          <Route path='/staff' element={<UsersAll/>} />
          <Route path='/add-staff' element={<AddStaff/>} />
          <Route path="/edit-staff/:id" element={<EditStaff/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
