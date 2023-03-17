import { Link, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Meal from './Meal';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element ={<Login />} />
        <Route path='/recipe' element={<Meal />} />
      </Routes>
    </Router>
  );
}

export default App;
