import React, { useEffect, useState } from 'react'
import ProductCard from '../Catalog/ProductCard';
import api from '../../api/axios';
import BookCard from './BookCard';

const Borrows = () => {

   const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchBorrows = async () => {
       setLoading(true);
       try {
         const response = await api.get('/api/loans/on-going');
         if (response.data && response.data.success) {
          setBooks(response.data.data); 
        }
       } catch (error) {
         console.error("Erreur lors du chargement des emprunts :", error);
       } finally {
         setLoading(false);
       }
     };

     fetchBorrows();
   }, []);
  
  return (
    <div className='max-w-6xl px-6 py-8 w-full'>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          // key est obligatoire dans une boucle en React
          <BookCard book={book} />
        ))
      ) : (
        <p>No books found in this section.</p>
      )} 
    </div>
  )
}

export default Borrows