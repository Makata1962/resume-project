import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Forms from './Forms'

const RouteComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/general-info" element={<Forms />} />
     
    </Routes>
  );
};

export default RouteComponent;
