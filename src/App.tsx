import { useState } from "react";
import "./App.css";
import NavBar from "./Components/layout/NavBar/NavBar";
import Footer from "./Components/layout/Footer/Footer";
import Container from "./Components/layout/Container/Container";
import MyTasks from "./pages/Home/MyTasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewHome from "./pages/NewHome/NewHome";

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/aboutus" element={<NewHome />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
