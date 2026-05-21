import React, { useEffect, useState } from 'react'
import ProductCard from '../Catalog/ProductCard';
import api from '../../api/axios';

const Borrows = () => {

  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchBorrows = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get('/api/loans/on-going');
  //       setBooks(Array.isArray(response.data) ? response.data : []);
  //     } catch (error) {
  //       console.error("Erreur lors du chargement des emprunts :", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBorrows();
  // }, []);
  
  return (
    <div>
      {/* {loading ? (
        <p>Chargement en cours...</p>
      ) : Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          // key est obligatoire dans une boucle en React
          <ProductCard book={book} />
        ))
      ) : (
        <p>Aucun livre trouvé dans cette section.</p>
      )} */}
    </div>
  )
}

export default Borrows