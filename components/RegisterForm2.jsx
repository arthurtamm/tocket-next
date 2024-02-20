'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const RegisterForm2 = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!email.endsWith('@al.insper.edu.br')) {
          setError('Email inválido. Por favor, utilize o seu email Insper.');
          return;
        }
    
        const result = await signIn('email', { email, redirect: true });
        if (!result.ok) {
          setError('Falha no login. Por favor, tente novamente.');
        }
      };

    // const handleSubmit =  async (e) => {
    //     e.preventDefault();

    //     if (!name || !email || !password || !phoneNumber) {
    //         setError("All fields are required.");
    //         return;
    //     }

    //     try {

    //         const resUserExists = await fetch('api/userExists', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email }),
    //         });

    //         const { user } = await resUserExists.json();

    //         if (user) {
    //             setError("User already exists.");
    //             return;
    //         }

    //         const res = await fetch('api/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ name, email, password, phoneNumber }),
    //         });

    //         if (res.ok) {
    //             const form = e.target;
    //             form.reset();
    //             router.push("/login");
    //         } else {
    //             console.log("User registration failed.")
    //         }
    //     } catch (error) {
    //         console.log("Error during registration: ", error);
    //     }
    // };

    return (
    <div className='grid place-items-center h-screen tocket-bg'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-blue-900 sticky'>
            <h1 className='text-xl font-bold my-4 text-white'>Register</h1>

            <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
                {/* <input
                    className='input-login' 
                    type="text" 
                    placeholder='Full Name'
                    onChange={(e) => setName(e.target.value)}
                /> */}
                
                <input 
                    className='input-login' 
                    type="email" 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}    
                />
                {/* <input 
                    className='input-login' 
                    type="password" 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    className='input-login' 
                    type="phone number" 
                    placeholder='Phone Number'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                /> */}
                <button className='btn_signin'> Registrar com email </button>

                {   error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                {/* <Link className='text-sm mt-3 text-right' href={"/login"}>
                    Already have an account?
                    <span className='underline'> Login </span>
                </Link> */}

            </form>
        </div>
    </div>
  )
}

export default RegisterForm2;