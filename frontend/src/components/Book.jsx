import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ id, title, description, coverPhoto }) => {
  // console.log(coverPhoto)
  const NOVEL_COVERS_PATH = import.meta.env.VITE_API_NOVELCOVERS_URL;
  const imageUrl = `${NOVEL_COVERS_PATH}/${coverPhoto}`;
  // console.log(imageUrl)

  return (
    <Link
      to={`/novels/${id}`}
      className="block bg-gray-100 rounded-1xl overflow-hidden max-w-xs w-48 m-2 transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <div className="flex flex-col h-full">
        {coverPhoto && (
          <img
            className="w-full h-62 object-fill"
            src={imageUrl}
            alt={title}
          />
        )}
        <div className="p-3 flex-grow">
          <h2 className="text-black text-lg font-semibold mb-1">{title}</h2>
          <p className="text-black text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
};

export default Book;
