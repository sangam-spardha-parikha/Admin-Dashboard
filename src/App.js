import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginForm from "./pages/auth/Signin";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Home from './pages/dashboard/Home';
import Profile from './pages/user/Profile';
import StudentUsers from './pages/student/ViewStudent';
import UsersAll from './pages/student/ViewAll';
import AddStaff from './pages/staff/AddStaff';
import EditStaff from './pages/staff/EditStaff';
import NotificationPage from './components/Notification';
import ViewAdmin from './pages/admin/ViewAdmin';
import AddAdmin from './pages/admin/AddAdmin';
import EditAdmin from './pages/admin/EditAdmin';
import NoteList from './pages/notes/NoteList';
import AddNotes from './pages/notes/AddNotes';
import EditNote from './pages/notes/EditNotes';
import TestList from './pages/testseries/ViewTest';
import AddTestSeries from './pages/testseries/CreateTest';
import NoteListId from './pages/notes/ViewById';
import TestListId from './pages/testseries/ViewById';
import CourseTable from "./pages/course/CourseTable";
import CourseDetails from "./pages/course/CourseDetails";
import Payment from "./pages/payment/Payment";
import Invoice from "./pages/payment/Invoice";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Redirect to home if logged in and tries to access login page
  if (token && location.pathname === "/") {
    return <Navigate to="/home" />;
  }

  // Hide Sidebar and Header on Login Page
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!isLoginPage && <Header />}
        <main className="p-6 mt-16 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/profile/me" element={<Profile />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/student" element={<StudentUsers />} />
            <Route path="/staff" element={<UsersAll />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/edit-staff/:id" element={<EditStaff />} />
            <Route path="/admin" element={<ViewAdmin />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/edit-admin/:id" element={<EditAdmin />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/add-note" element={<AddNotes />} />
            <Route path="/edit-note/:id" element={<EditNote />} />
            <Route path="/view-note/:id" element={<NoteListId />} />
            <Route path="/test-series" element={<TestList />} />
            <Route path="/add-test-series" element={<AddTestSeries />} />
            <Route path="/view-test-series/:id" element={<TestListId />} />
            <Route path="/course" element={<CourseTable />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/view-pay" element={<Invoice />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
 