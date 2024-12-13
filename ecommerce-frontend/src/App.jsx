// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import ProductManagement from "./components/ProductManagement";
import ProductLists from "./components/ProductLists";
import PrivateRoute from "./components/PrivateRoute";
import './App.css'
// import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        
        {/* Private Route to check if user is logged in */}
        <Route element={<PrivateRoute />}>
          <Route path="/productManagement" element={<ProductManagement />} />
        </Route>

        {/* Public Route when user is not logged in */}
        <Route path="/productLists" element={<ProductLists />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;
