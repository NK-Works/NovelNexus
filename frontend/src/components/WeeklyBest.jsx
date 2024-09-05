import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeeklyBest() {
    const [novels, setNovels] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const NOVEL_COVERS_PATH = import.meta.env.VITE_API_NOVELCOVERS_URL;


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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);
        }, 2000); // Change image and text every 2 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [novels]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="col-span-1 md:col-span-2 relative overflow-hidden rounded-lg">
            <div className="relative flex flex-col md:flex-row h-[350px]">
                {/* Background Image */}
                {novels.length > 0 && (
                    <>
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={`${NOVEL_COVERS_PATH}/${novels[currentIndex].coverPhoto}`}
                                alt="Book Cover"
                                className="w-full h-full object-cover blur-sm transition-opacity duration-1000" // Smooth transition effect
                            />
                        </div>
                        {/* Overlay with Content */}
                        <div className="relative z-10 flex flex-col md:flex-row bg-white bg-opacity-70 rounded-lg p-6 shadow-md w-full h-full">
                            {/* Image Section */}
                            <div className="h-full mb-4 md:mb-0 pr-4 flex items-center justify-center">
                                <img
                                    src={`${NOVEL_COVERS_PATH}/${novels[currentIndex].coverPhoto}`}
                                    alt="Book Cover"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Description Section */}
                            <div className="flex-1 flex items-center">
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold mb-4">{novels[currentIndex].title}</h2>
                                    <p className="text-gray-600 text-lg">
                                        {novels[currentIndex].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default WeeklyBest;
