import React, { useEffect, useState } from 'react'
import ProductCard from '../Catalog/ProductCard';
import api from '../../api/axios';
import BookCard from './BookCard';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchMyBooks = async () => {
       setLoading(true);
       try {
         const response = await api.get('/api/books/shared-books'); 
        if (response.data && response.data.success) {
          setBooks(response.data.data); 
        }
       } catch (error) {
         console.error("Erreur lors du chargement de vos livres :", error);
       } finally {
         setLoading(false);
       }
     };

     fetchMyBooks();
   }, []);
  return (
    <div className='max-w-6xl p-6 w-full'>
       {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <BookCard book={book} />
        ))
      ) : (
        <p>No books found in this section.</p>
      )} 
    </div>
  )
}

export default MyBooks