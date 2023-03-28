import { Link, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login';
import Meal from './Meal';
import History from './History'
import Favorites from './Favorites';
import Recipe from './Recipe';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element ={<Login />} />
        <Route path='/recipe' element={<Recipe />}/>
        <Route path='/recipe/:recipeId' element={<Meal />} />
        <Route path='/history' element={<History />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
