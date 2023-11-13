import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddServicePage from "./pages/AddServicePage";
import ServicesPage from "./pages/ServicesPage";
import UserContext from "./contexts/UserContext";

function App() {
  const [userData, setUserData] = useState("");

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="allServices" element={<ServicesPage />} />
          <Route path="/addService" element={<AddServicePage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
