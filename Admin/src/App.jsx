import React from "react";
import { Routes, Route } from "react-router-dom";

import Add from "./pages/Add.jsx";
import Home from "./pages/Home.jsx";
import Lists from "./pages/Lists.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;
