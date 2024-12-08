import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./NavBar/Navbar";
import Main from "./Main/Main";
import Home from "./Home/Home";
import About from "./About/About";
import Testimonials from "./Testimonials/Testimonials";
import Contact from "./Contact/Contact";
import Product from "./Admin/Product";
import Art from "./Admin/Art";
import AdminPanelSidebar from "./Admin/AdminPanelSidebar";
// import AdminPanel from './Admin/AdminPanel';
import AdminDashboard from "./Admin/AdminDashboard";
import AdminPanel from "./Admin/afasf";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <Navbar />
    <Main />
    <Home />
    <About />
    <Testimonials />
    <Contact /> */}

    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    {/* <Art/> */}
    {/* <Product/> */}
    {/* <AdminPanelSidebar/> */}
    {/* <AdminPanel/> */}
    <AdminDashboard/> 


    {/* <Route exact path="/admin/product" element={<Product />} />
        <Route exact path="/admin/art" element={<Art />} />
        <Route exact path="/admin/panel/sidebar" element={<AdminPanelSidebar />} />
        <Route exact path="/admin/panel" element={<AdminPanel />} /> */}
          {/* <Route exact path="/admin/panel" element={<AdminPanel />} /> */}
  </>
);

