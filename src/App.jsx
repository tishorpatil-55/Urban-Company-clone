import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServiceList from "./pages/ServiceList";
import BookingForm from "./pages/BookingForm";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<ServiceList />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/book" element={<BookingForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/admin" element={<div className="p-8 text-center">Admin (Coming Soon)</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


