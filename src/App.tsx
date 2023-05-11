import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./Components/layout/NavBar/NavBar";
import Footer from "./Components/layout/Footer/Footer";
import Container from "./Components/layout/Container/Container";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Container customClass="minHeight">
        <Home />
      </Container>
      <Footer />
    </>
  );
}

export default App;
