
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
