import './App.css';
import { Routes ,Route } from 'react-router-dom';
import Category from './components/category';
import Categories from './components/Categories';
import Book from './components/Book';
import Books from './components/Books';
import Authors from './components/Authors';
import Author from './components/Author';



// lk

function App() {
 

  return (
    
    
    <Routes>
    <Route path='/Category' element={<Category/>} />
    <Route path='/Categories' element={<Categories/>} />


    <Route path='/books/:id' element={<Book/>} />

    <Route path='/Books' element={<Books/>} />
    <Route path='/Authors' element={<Authors/>} />
    <Route path='/Authors/:id' element={<Author/>} />







    </Routes>


    
    
  );
}

export default App;
