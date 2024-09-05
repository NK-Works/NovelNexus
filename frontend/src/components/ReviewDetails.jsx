import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const ReviewDetails = () => {
    const { reviewId } = useParams();
    const location = useLocation();
    const novelId = location.state?.novelId;  // Access novelId from location state
    const [review, setReview] = useState(null);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const reviewResponse = await axios.get(`${API_URL}/novels/${novelId}/reviews/${reviewId}`);
                console.log(reviewResponse.data)
                console.log(reviewResponse.data.reviewTitle)
                setReview(reviewResponse.data);
            } catch (err) {
                setError('Failed to fetch review details or replies');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewDetails();
    }, [reviewId]); // Include novelId in dependency array

    const handleReplySubmit = async () => {
        try {
            await axios.post(`${API_URL}/novels/${novelId}/reviews/${reviewId}`, { content: newReply });
            setReplies([...replies, { content: newReply }]);
            setNewReply('');
        } catch (err) {
            console.error('Failed to post reply', err);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-lg">{error}</div>;
    if (!review) return <div className="flex justify-center items-center h-screen text-lg">Review not found</div>;


    return (
        <div>
            {/* Render Navbar */}
            <Navbar />

            {/* Render Review Details */}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg">
                <h2 className="text-3xl font-bold mb-4">{review.reviewTitle}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{review.reviewContent}</p>
                <div className="mt-6">
                    <h3 className="text-2xl font-bold mb-4">Replies</h3>
                    {review.replies.length > 0 ? (
                        <ul className="space-y-4">
                            {review.replies.map((reply, index) => (
                                <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                    <p className="text-gray-700">{reply.content}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-lg text-gray-700">No replies yet</p>
                    )}
                </div>
                <div className="mt-6">
                    <textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Write your reply..."
                    />
                    <button
                        onClick={handleReplySubmit}
                        className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-5 rounded-lg mt-4"
                    >
                        Submit Reply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;
