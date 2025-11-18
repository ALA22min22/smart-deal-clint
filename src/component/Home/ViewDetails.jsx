import React, { use, useEffect, useState } from 'react';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ViewDetails = () => {
    const data = useLoaderData();
    const { _id: productId } = data;
    const { user, } = use(AuthContext);
    const bitReff = useRef(null)
    const [bids, setBids] = useState([]);

    const handleModal = () => {
        bitReff.current.showModal();
    }

    const handleModalSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const amount = e.target.amount.value;
        console.log(productId, name, email, amount);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_image: user.photoURL,
            buyer_email: email,
            bid_price: amount,
            status: "pending",
        }
        fetch("http://localhost:3000/bids", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log("after reciving the bids data", data)
                if (data.insertedId) {
                    bitReff.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    //New bid add in the state:
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];  
                    newBids.sort((a,b)=> b.bid_price - a.bid_price);   //IMportant And Intersting
                    setBids(newBids)
                }
            })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/product/${productId}/bids`)
            .then(res => res.json())
            .then(data => {
                console.log("receving all bits data", data);
                setBids(data);
            })
    }, [productId])

    return (
        <>
            <div>
                {/* all data sections */}
                <div>

                </div>

                {/* buy button click and bit info show with modal */}
                <div>

                    <button onClick={handleModal} className='btn bg-primary-gradient'>I want Buy This Product</button>

                    <dialog ref={bitReff} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give Seller Your Offered Price!</h3>

                            <form onSubmit={handleModalSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input" defaultValue={user?.displayName} readOnly />
                                    {/* email */}
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" defaultValue={user?.email} readOnly />
                                    {/* Bid amount */}
                                    <label className="label">Bid Amount</label>
                                    <input type="text" name='amount' className="input" placeholder='Enter Amount' />
                                    <button className="btn bg-primary-gradient mt-4 bg-primary-gradientss">Bid</button>
                                </fieldset>
                            </form>
                            <div className='flex justify-between items-center'>
                                <p className="py-4">button below to close</p>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn bg-primary-gradient">Cancle</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>

            </div>

            {/* Bits for this product */}
            <div>
                <h3 className="text-3xl font-bold"> Bids For This Products: <span className='text-primary'> {bids.length}</span></h3>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL No:
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) => <tr>
                                    {/* Important & Intersting */}
                                    <th> {index + 1} </th> 
                                     {/*----------------------*/}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default ViewDetails;