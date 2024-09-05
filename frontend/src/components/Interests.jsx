import React from 'react';
import WeeklyBest from './WeeklyBest';
import Forum from './Forum';

function Extra() {
    return (
        <div className="container py-5">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-3xl font-bold" style={{ width: '50%' }}>Weekly Specials</h1>
                <h2 className="text-xl font-bold">Explore Forum</h2>
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20">
                    <div className="col-span-1 md:col-span-2">
                        <WeeklyBest />
                    </div>
                    <div className="col-span-1">
                        <Forum />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Extra;
