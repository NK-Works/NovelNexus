import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Forum() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts`);
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

     const getRandomPosts = (posts, num) => {
        const shuffled = posts.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const displayedPosts = getRandomPosts(posts, 4);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className="col-span-1 md:col-span-1 bg-gray-100 rounded-lg p-6 shadow-md h-[350px]">
            {displayedPosts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                />
            ))}
        </div>
    );
}
export default Forum;