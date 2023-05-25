import "./App.css";
import NavBar from "./Components/layout/NavBar/NavBar";
import Footer from "./Components/layout/Footer/Footer";
import Container from "./Components/layout/Container/Container";
import MyTasks from "./pages/Home/MyTasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewHome from "./pages/NewHome/NewHome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/register";

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
