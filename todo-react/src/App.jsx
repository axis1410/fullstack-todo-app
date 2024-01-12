import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div className="z-40">
          <Navbar />
        </div>
        <div className="z-[-1]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
