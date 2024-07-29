import './App.css';
import Home from './components/Home';
import Reminder from './components/Reminder';
import View from './components/View';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/reminder" element={<Reminder />}/>
          <Route path="/view/:id" element={<View />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
