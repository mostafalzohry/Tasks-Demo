import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import NotFound from './page/NotFound';

function App() {

  return (
    <Router>
      <div className='overflow-x-hidden md:overflow-x-auto'>
        <Routes>
          <Route path='/home' element={<Home />} /> 
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} /> 
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
