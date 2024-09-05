import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import ReviewDetails from './ReviewDetails';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [users, setUsers] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const NOVEL_COVERS_PATH = import.meta.env.VITE_API_NOVELCOVERS_URL;

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const [bookResponse, reviewsResponse] = await Promise.all([
                    axios.get(`${API_URL}/novels/${id}`),
                    axios.get(`${API_URL}/novels/${id}/reviews`)
                ]);
                setBook(bookResponse.data);
                setReviews(reviewsResponse.data);

                const userIds = reviewsResponse.data.map(review => review.userId);
                const userResponses = await Promise.all(
                    userIds.map(userId => axios.get(`${API_URL}/users/${userId}`))
                );

                const usersData = userResponses.reduce((acc, userResponse) => {
                    acc[userResponse.data.id] = userResponse.data.name;
                    return acc;
                }, {});

                setUsers(usersData);
            } catch (err) {
                setError('Failed to fetch book details or reviews');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-lg">{error}</div>;
    if (!book) return <div className="flex justify-center items-center h-screen text-lg">Book not found</div>;

    return (
        <div>
            <Navbar />
            <div className="flex flex-col lg:flex-row justify-center items-center p-6 bg-gray-50 rounded-xl mx-auto mt-0 mb-6">
                <div className="lg:w-1/4 p-4 lg:pr-6 flex-shrink-0">
                    <img
                        className="w-64 h-auto object-cover rounded-lg shadow-lg"
                        src={`${NOVEL_COVERS_PATH}/${book.coverPhoto}`}
                        alt={book.title}
                    />
                </div>
                <div className="lg:w-auto p-1 lg:pl-6">
                    <h1 className="text-5xl font-extrabold py-20 text-gray-900 mb-4">{book.title}</h1>
                    <div className="flex items-center py-20">
                        <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg mr-4 transition duration-200 ease-in-out">
                            Read Now
                        </button>
                        <button className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-5 rounded-lg transition duration-200 ease-in-out">
                            Add to Library
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
                <h2 className="text-3xl font-bold mb-4">About</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{book.description}</p>

                <h2 className="text-3xl font-bold mb-4">Introduction Video</h2>
                <div className="relative h-0 overflow-hidden max-w-full w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={book.introVideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Introduction Video"
                    ></iframe>
                </div>
                </div>

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
                <h2 className="text-3xl font-bold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <Link
                                key={review.id} 
                                to={`/novels/${book.id}/reviews/${review.id}`} 
                                state={{ novelId: book.id }}
                            >
                                <div className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition mb-5">
                                    <h3 className="text-xl font-semibold mb-2">{review.reviewTitle}</h3>
                                    <p className="text-gray-700">{review.reviewContent}</p>
                                    <p className="text-sm text-gray-500 mt-2">By {users[review.userId]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-700">No reviews available</p>
                )}
            </div>

        </div>

    );
};

export default BookDetails;