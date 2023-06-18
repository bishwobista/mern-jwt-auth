import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link , useNavigate} from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><SignIn/></PublicRoute>  } />
          <Route path="/signup" element= { <PublicRoute><SignUp /></PublicRoute> } />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          {/* <Route path="/" element={<SignIn/>  } />
          <Route path="/signup" element= { <SignUp /> } />
          <Route path="/home" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  
  const data = localStorage.getItem("data");
  const navigate = useNavigate();
  if (data) {
    return children;
  } else {
    useEffect(() => {
      navigate("/");
    }
    )
  }
}
export function PublicRoute({ children }) {
  const data = localStorage.getItem("data");
  const navigate = useNavigate();
  if (!data) {
    return children;
  } else {
    useEffect(() => {
    navigate("/home");
    }
    )
    return null;
  }
}