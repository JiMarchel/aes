import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from "./components/Home"
import EncryptText from './components/EncrypText';
import DecryptText from './components/DecrypText';
import EncryptImage from './components/EncrypImage';
import DecryptImage from './components/DecrypImage';
import EncryptFile from './components/EncrypFile';
import DecryptFile from './components/DecrypFile';
import LoginPage from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* remove login page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path='login' element={<LoginPage />} />
        <Route path="/encrypt-text" element={<EncryptText />} />
        <Route path="/decrypt-text" element={<DecryptText />} />
        <Route path="/encrypt-image" element={<EncryptImage />} />
        <Route path="/decrypt-image" element={<DecryptImage />} />
        <Route path="/encrypt-file" element={<EncryptFile />} />
        <Route path="/decrypt-file" element={<DecryptFile />} />
      </Routes>
    </Router>
  );
}

export default App
