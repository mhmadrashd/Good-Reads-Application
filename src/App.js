import './App.css';
import Footer from './components/Footer';
import Card from './components/Card'
import { Routes ,Route } from 'react-router-dom';
import Category from './components/category';
import Categories from './components/Categories';
import Book from './components/Book';
import Books from './components/Books';
import Navcomp from './components/Navcom';
import Authors from './components/Authors';


// lk

function App() {
 

  return (
    
    
    <Routes>
    <Route path='/Category' element={<Category/>} />
    <Route path='/Categories' element={<Categories/>} />


    <Route path='/Book' element={<Book/>} />

    <Route path='/Books' element={<Books/>} />
    <Route path='/Authors' element={<Authors/>} />






    </Routes>


    
    
  );
}

export default App;
