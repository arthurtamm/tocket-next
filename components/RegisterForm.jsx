'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import '@styles/styles.css';

const RegisterForm = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !phoneNumber) {
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

            if (user) {
                setError("Usuário já cadastrado.");
                return;
            }

        } catch (error) {
            console.log("Erro durante o cadastro: ", error);
        }

        if (!email.endsWith('@al.insper.edu.br')) {
          setError('Email inválido. Por favor, utilize o seu email Insper.');
          return;
        }
        
        // try {
        //     const resRegister = await fetch('api/register', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ name, phoneNumber }),
        //     });
        // } catch (error) {
            
        // }
        

        const result = await signIn('email', { email, redirect: false });
        if (result.error) {
            setError(result.error);
        } else {
            // Atualiza as informações do usuário
            try {
                const updateRes = await fetch('/api/register', { // Substitua '/api/updateUser' pelo caminho correto da sua API
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, phoneNumber }),
                });
        
                const updateResult = await updateRes.json();
        
                if (updateRes.ok) {
                    // Redireciona ou mostra uma mensagem de sucesso
                    // console.log(updateResult.message);
                    router.push('/check-email');
                    // router.push('/pathToRedirectAfterSuccess'); // Use isso para redirecionar o usuário
                } else {
                    setError(updateResult.message || 'Erro ao atualizar informações do usuário.');
                }
            } catch (error) {
                console.error("Erro durante a atualização do usuário: ", error);
                setError('Falha ao atualizar informações do usuário.');
            }
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
        <div className='shadow-lg p-5 rounded-lg form-cadastro sticky'>
            <h1 className='text-xl font-bold my-4 text-white'>Cadastre-se</h1>

            <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
                <input
                    className='input-login' 
                    type="text" 
                    placeholder='Nome e sobrenome'
                    onChange={(e) => setName(e.target.value)}
                />
                
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
                <input 
                    className='input-login' 
                    type="phone number" 
                    placeholder='Número de telefone com DDD (WhatsApp)'
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button className='btn-signin'> Cadastrar </button>

                {   error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                )}

                <Link className='my-4 text-white text-right' href={"/login"}>
                    Já possui uma conta?
                    <span className='underline'> Faça login </span>
                </Link>

            </form>
        </div>
    </div>
  )
}

export default RegisterForm;