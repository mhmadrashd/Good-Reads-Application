import './App.css';
import Footer from './components/Footer';
// import { Routers, Router } from 'react-router-dom';
import NavComponent from './components/NavComponent';
import HomeComponent from './components/Home';
import Card from './components/Card'
import { Routes ,Route } from 'react-router-dom';
import Category from './components/category';
import Book from './components/Book';



function App() {
 

  return (
    
    
    <Routes>
    <Route path='/Category' element={<Category/>} />
    <Route path='/Book' element={<Book/>} />

    </Routes>
    
    
  );
}

export default App;
