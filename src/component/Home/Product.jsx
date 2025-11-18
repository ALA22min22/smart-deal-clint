import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id,title, price_min, price_max } = product;
    return (
        <div className="card bg-base-100  shadow-sm">
            <figure className="px-4 pt-4 ">
                <img
                    src={"https://i.ibb.co.com/VcBCr9Xx/581061327-122151381716637649-100277417179260380-n.jpg"}
                    alt="Shoes"
                    className="rounded-xl h-55" />
            </figure>
            <div className="card-body  ">
                <h2 className="card-title">{title}</h2>
                <p>${price_min} - {price_max}</p>
                <div className="card-actions">
                   <Link to={`/product/${_id}`}> <button className="btn btn-primary w-full text-white">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Product;