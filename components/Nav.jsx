"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSwap, AiOutlineUser } from "react-icons/ai";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);

    const [navSticky, setNavSticky] = useState(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isSticky = window.scrollY > 0;
            setNavSticky(isSticky);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const setUpProviders = async () => {
          const response = await getProviders();
          setProviders(response);
        }
    
        setUpProviders();
      }, [])

    return (
        <nav className={`transition-all duration-300 w-full top-0 z-10 bg-indigo-900 ${navSticky ? 'sticky' : 'bg-transparent'}`}>
            <div className='flex justify-around py-5'>
                <Link href="/" className="flex items-center ml-10">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Logo"
                        width={124}
                        height={30}
                    />
                </Link>

                <Link href="/about" className="sm:flex hidden text-white mx-2  flex items-center">
                    <AiOutlineUser className="mr-2" /> Sobre Nós
                </Link>
                <Link href="/project" className="sm:flex hidden text-white mx-2 flex items-center">
                    <AiOutlineSwap className="mr-2" /> Marketplace
                </Link>
                
                <div className='flex relative'>
                {session?.user ? (
                    <>
                        <div className='flex'>
                            <Image
                                src={"/assets/images/icon-three-bars.jpg"}
                                width={37}
                                height={37}
                                alt='profile'
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />

                            {toggleDropdown && (
                                <div className="dropdown bg-black z-50">
                                    <Link
                                        href='/eventos'
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Eventos
                                    </Link>

                                    <Link
                                        href='/sac'
                                        className="dropdown_link" 
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        SAC
                                    </Link>
                                    <Link
                                        href='/sobre'
                                        className="sm:hidden dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Sobre nós
                                    </Link>
                                    <Link
                                        href='/project'
                                        className=" sm:hidden dropdown_link" 
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Marketplace
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                        className='text-white'
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}
                        </div>
                        <Image className='sm:hidden ml-4 rounded-full'
                            src={session?.user.image}
                            alt='profile'
                            width={37}
                            height={37}
                        />
                        <Image className='sm:flex hidden ml-8 rounded-full'
                            src={session?.user.image}
                            alt='profile'
                            width={37}
                            height={37}
                        />
                    </>
                ): (
                    <>
                        {providers && 
                            Object.values(providers).map((provider) => (

                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='btn text-white p-2'
                                >
                                    Entrar
                                </button>
                            ))
                        }
                    </>
                )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
