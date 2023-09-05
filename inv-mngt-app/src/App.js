import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
