'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import '@styles/styles.css';

const RegisterForm = () => {
    
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError("Todos os campos são necessários.");
            return;
        }

        try {

            const resUserExists = await fetch('api/userExists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (!user) {
                setError("Usuário não cadastrado. Por favor, cadastre-se.");
                return;
            }

        } catch (error) {
            console.log("Error during registration: ", error);
        }

        if (!email.endsWith('@al.insper.edu.br')) {
          setError('Email inválido. Por favor, utilize o seu email Insper.');
          return;
        }
    
        const result = await signIn('email', { email, redirect: false });
        if (result.ok) {
            router.push('/check-email');
        } else {
            setError('Falha no login. Por favor, tente novamente.');
        }
      };

    return (
    <div className='grid place-items-center h-screen tocket-bg'>
        <div className='shadow-lg p-5 rounded-lg form-login sticky'>
            <h1 className='text-xl font-bold my-4 text-white'> Entrar </h1>

            <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
                {/* <input
                    className='input-login' 
                    type="text" 
                    placeholder='Nome e sobrenome'
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
                /> */}
                {/* <input 
                    className='input-login' 
                    type="phone number" 
                    placeholder='Número de telefone com DDD (WhatsApp)'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                /> */}
                <button className='btn-login'> Entrar </button>

                {   error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                <Link className='my-4 text-white text-right' href={"/register"}>
                    Não possui uma conta?
                    <span className='underline'> Cadastre-se </span>
                </Link>

            </form>
        </div>
    </div>
  )
}

export default RegisterForm;