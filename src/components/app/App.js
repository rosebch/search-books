import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import MainPage from '../../pages/MainPage';
import SingleBookPage from '../../pages/SingleBookPage';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/:bookId' element={<SingleBookPage/>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
