import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import DisplayBooks from './DisplayBooks';
import Interests from './Interests';

function HomePage() {
    return (
        <div>
            <Navbar />
            <Interests/>
            
            <h1 className="flex justify-center py-5 text-3xl font-bold">Trending Novels</h1>
            <div className='py-5'>
                <DisplayBooks />
            </div>
        </div>
    );
}

export default HomePage;
