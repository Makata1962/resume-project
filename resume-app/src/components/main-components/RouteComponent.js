import React from "react";
import { Route, Routes } from "react-router-dom";
import Education from "./Education";
import Experience from "./Experience";
import GeneralInfo from "./GeneralInfo";
import Landing from "./Landing";

const RouteComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/general-info" element={<GeneralInfo />} />
      <Route exact path="/experience" element={<Experience />} />
      <Route exact path="/education" element={<Education />} />
    </Routes>
  );
};

export default RouteComponent;
