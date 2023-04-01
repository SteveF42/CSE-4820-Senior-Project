import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Meal from './Meal';
import History from './History'
import Favorites from './Favorites';
import Recipe from './Recipe';
import ProtectedRoutes from './components/ProtectedRoutes';
import Register from './Register';
import Logout from './Logout';
import Login from './Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recipe' element={<Recipe />} />
        <Route path='/recipe/:recipeId' element={<Meal />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/history' element={<History />} />
          <Route path='/favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
