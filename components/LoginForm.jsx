"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const [providers, setProviders] = useState(null);

    const router = useRouter();
    
    // useEffect(() => {
    //     const setUpProviders = async () => {
    //         const response = await getProviders();
    //         console.log("providers:  ", response);
    //         setProviders(response);
    //     }
    
    //     setUpProviders();
    //   }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            // const res = await signIn(provider.id);

            if (res.error) {
                console.log(res.error);
                setError("Invalid credentials.");
                return;
            }

            router.replace("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='grid place-items-center h-screen bg-white'>
            <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                <h1 className='text-xl font-bold my-4'>Login</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input 
                        className='input-login' 
                        type="text" 
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className='input-login' 
                        type="password" 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'> Login </button>

                    { error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {error}
                        </div>
                    )}

                    <Link className='text-sm mt-3 text-right' href={"/register"}>
                        Don't you have an account?
                        <span className='underline'> Register </span>
                    </Link>

                </form>
            </div>
        </div>
    )
}

export default LoginForm;