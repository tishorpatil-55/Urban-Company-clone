import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServiceList from "./pages/ServiceList";
import BookingForm from "./pages/BookingForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/book" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
}


