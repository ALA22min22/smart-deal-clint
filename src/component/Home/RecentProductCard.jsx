import React, { use } from 'react';
import Product from './Product';

const RecentProductCard = ({ recentProductData }) => {
    const products = use(recentProductData);

    return (
        <div >
            <h3 className='text-center font-bold text-4xl my-5'>Recent <span className='text-primary'>Products</span></h3>
            <div className='grid grid-cols-3 gap-5 '>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default RecentProductCard;