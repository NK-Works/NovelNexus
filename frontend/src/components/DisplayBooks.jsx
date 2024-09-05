import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const DisplayBooks = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await axios.get(`${API_URL}/novels`);
        setNovels(response.data);
      } catch (err) {
        setError('Failed to fetch novels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-20 w-full h-full">
      {novels.map((novel) => (
        <Book
          key={novel.id}
          id={novel.id}
          title={novel.title}
          description={novel.description}
          coverPhoto={novel.coverPhoto}
        />
      ))}
    </div>
  );
};

export default DisplayBooks;
