import "./App.css";
import NavBar from "./Components/layout/NavBar/NavBar";
import Footer from "./Components/layout/Footer/Footer";
import Container from "./Components/layout/Container/Container";
import MyTasks, { MessageProps } from "./pages/Home/MyTasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewHome from "./pages/NewHome/NewHome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import { User } from "./entities/User/User.entity";
import Notification from "./Components/layout/Notification/Notification";

export type SetPopUpProps = {
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

function App() {
  const [user, setUser] = useState<User>();
  const [notification, setNotification] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageProps>({
    text: "",
    type: "success",
  });

  return (
    <Router>
      <NavBar />
      <Container customClass="minHeight">
        {notification ? (
          <Notification message={message.text} customClass={message.type} />
        ) : null}
        <Routes>
          <Route path="/" element={<NewHome />} />
          <Route
            path="/mytasks"
            element={
              <MyTasks
                setMessage={setMessage}
                setNotification={setNotification}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setMessage={setMessage}
                setNotification={setNotification}
              />
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
