import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Path from './routes';
import Navbar from "./components/Navbar.js";
import Footer from './components/Footer.js';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Path />
      <Footer />
    </div>
  );
}

export default App;
