import { Route, Routes, BrowserRouter } from "react-router-dom"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AddServicePage from "./pages/AddServicePage"
import ServicesPage from "./pages/ServicesPage"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage/>} />
        <Route path="/SignUp" element={<SignUpPage/>}/>
        <Route path="AllServices" element={<ServicesPage/>}/>
        <Route path="/AddService" element={<AddServicePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
