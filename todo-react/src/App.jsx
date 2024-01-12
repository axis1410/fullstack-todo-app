import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import AddTodoPage from "./pages/AddTodoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <div className="z-40">
          <Navbar />
        </div>
        <div className="z-[-1] w-full flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/add-todo" element={<AddTodoPage />} />
            </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
