import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/Authentification/SignUp";
import Login from "./pages/Authentification/Login";
import Header from './pages/Header/Header';
import Userprofile from './pages/User/Userprofile';
import Usersettings from './pages/User/User-settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Header />} />
          <Route path="/user-profile" element={<Userprofile />} />
          <Route path="/user-settings" element={<Usersettings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
