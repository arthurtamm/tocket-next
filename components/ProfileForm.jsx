'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { set } from 'mongoose';

const ProfileForm = () => {
    const { data: session } = useSession();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const getUserData = async () => {
        try {
            console.log(session?.user?.id);
            const res = await fetch(`/api/userData/${session?.user?.id}`);
            const data = await res.json();
            console.log(data);
            setName(data.name);
            setPhoneNumber(data.phoneNumber);
        } catch (error) {
            console.log("Error fetching user data: ", error);
        }
    }

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
                body: JSON.stringify({ id : session?.user?.id, name, phoneNumber }),
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

    useEffect(() => {
        getUserData();
      }, [])

    return (
    <div className='grid place-items-top h-screen bg-white w-full'>
        <div className='shadow-lg p-5 rounded-lg w-full flex-col justify-center items-center'>
            <h1 className='text-xl font-bold mb-4'>Dados Cadastrais</h1>

            <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
            <input
                    className='input-login' 
                    type="text" 
                    value={session?.user?.email ? (session?.user?.email) : ('Carregando Dados...')}
                    disabled
                />
                <input
                    className='input-login' 
                    type="text" 
                    value={name ? (name) : ('Carregando Dados...')}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    className='input-login' 
                    type="phone number" 
                    value={phoneNumber ? (phoneNumber) : ('Carregando Dados...')}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button className='bg-indigo-900 text-white font-bold cursor-pointer px-6 py-2'> Atualizar Dados </button>

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