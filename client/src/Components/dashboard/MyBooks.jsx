import React, { useEffect, useState } from 'react'
import ProductCard from '../Catalog/ProductCard';
import api from '../../api/axios';

const MyBooks = () => {
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchMyBooks = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get('/api/books/shared-books'); 
  //       setBooks(Array.isArray(response.data) ? response.data : []);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement de vos livres :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMyBooks();
  // }, []);
  return (
    <div>
      {/* {loading ? (
        <p>Chargement en cours...</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <ProductCard book={book} />
        ))
      ) : (
        <p>Aucun livre trouvé dans cette section.</p>
      )} */}
    </div>
  )
}

export default MyBooks