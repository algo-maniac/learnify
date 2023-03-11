
import './App.css';
import HomepageTeacher from './components/HomepageTeacher';
import LiveStream from './components/LiveStream';
import Navbar from './components/Navbar';
import { BrowserRouter as Router} from 'react-router-dom'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomepageTeacher/ >} />
        <Route path="/live" element={<LiveStream/ >} />
      {/* <HomepageTeacher /> */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
