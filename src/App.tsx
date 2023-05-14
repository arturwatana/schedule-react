import { useState } from "react";
import "./App.css";
import NavBar from "./Components/layout/NavBar/NavBar";
import Footer from "./Components/layout/Footer/Footer";
import Container from "./Components/layout/Container/Container";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
