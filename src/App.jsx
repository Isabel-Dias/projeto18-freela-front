import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddServicePage from "./pages/AddServicePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="allServices" element={<ServicesPage />} />
        <Route path="/addService" element={<AddServicePage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
