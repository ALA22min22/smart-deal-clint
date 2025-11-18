import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {

    const { googleSignIn, setUser, userSignIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        userSignIn()
        .then(result => {
            const userfind = result.user;
            setUser(userfind)

            navigate(`${location.state? location.state : "/"}`)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userFind = result.user;
                setUser(userFind)

                const userData = {
                    name: userFind.displayName,
                    email: userFind.email,
                    image : userFind.photoURL
                }

                //send to the backend and database:
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userData)
                })
                .then(res => res.json())
                .then(data => {
                    console.log("after receving the data", data)
                })

                 navigate(`${location.state? location.state : "/"}`)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="card bg-base-100 mx-auto my-20 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold mx-auto">Login now!</h1>
            <p className='mx-auto mt-5 p-2 bg-gray-50 rounded-2xl'>Are you first time our website? <Link to={"/register"} className='text-red-500 '>Register</Link></p>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
                {/* Google */}
                <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;