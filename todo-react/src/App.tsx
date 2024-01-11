import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Navbar />
        <main className="flex flex-col items-center justify-center min-h-screen">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
