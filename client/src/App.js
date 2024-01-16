import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/admin dashboard/adminDashboard";
import UserDashboard from "./components/user/user home/userDashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Catalog from "./components/user/catalog/catalog";
import Personaltransaction from "./components/user/personal transaction/personaltransaction";
import Issuing from "./components/transaction/issuing/issuing";
import Returning from "./components/transaction/returning/returning";
import AddBook from "./components/book/Add/addBook"
import Remove from "./components/book/remove/removeBook"
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute/>}>

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/issuing" element={<Issuing/>}/>
        <Route path="/returning" element={<Returning/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/removebook" element={<Remove/>}/>

        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/personalTransaction" element={<Personaltransaction />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
