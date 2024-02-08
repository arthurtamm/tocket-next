'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProfileForm = () => {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleSubmit =  async (e) => {
        e.preventDefault();

        if (!name || !phoneNumber) {
            setError("All fields are required.");
            return;
        }

        try {

            const resUserExists = await fetch('api/userExists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("Nome já existente. Escolha outro nome de usuário");
                return;
            }

            const res = await fetch('api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: session?.user?._id, name, phoneNumber }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed.")
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    return (
    <div className='grid place-items-center h-screen bg-white'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Meus dados</h1>

            <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
                <input
                    className='input-login' 
                    type="text" 
                    placeholder='Nome de usuário'
                    onChange={(e) => setName(e.target.value)}
                />
                
                <input 
                    className='input-login' 
                    type="phone number" 
                    placeholder='Número de telefone com DDD'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'> Salvar </button>

                {   error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}


            </form>
        </div>
    </div>
  )
}

export default ProfileForm;