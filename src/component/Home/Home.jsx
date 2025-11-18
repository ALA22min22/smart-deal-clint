import React, { Suspense } from 'react';
import RecentProductCard from './RecentProductCard';

const recentProductData = fetch("http://localhost:3000/recent-product")
    .then(res => res.json());

const Home = () => {
    return (
        <div>
            <h3>Home</h3>
            <Suspense fallback={<div className='flex justify-center'><span className="loading loading-spinner loading-xl"></span></div>}>
                <RecentProductCard recentProductData={recentProductData}></RecentProductCard>
            </Suspense>
        </div>
    );
};

export default Home;