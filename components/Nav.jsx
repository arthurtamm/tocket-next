"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineHome, AiOutlineSwap, AiOutlineUser } from "react-icons/ai";
import HamburgerMenu from './Burger';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Dropdown from '@components/Dropdown';

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
            <div className='flex justify-between py-5 px-5 md:mx-10'>
                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Logo"
                        width={124}
                        height={30}
                    />
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
                                        href='/profile'
                                        className="dropdown_link"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Perfil
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
                    {!session?.user ? (
                        <>
                                <div className='flex'>
                                    <HamburgerMenu />
                                    <Dropdown
                                        toggleDropdown={toggleDropdown}
                                        setToggleDropdown={setToggleDropdown}
                                    />
                                </div>
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
                                </div>
                            )}
                        </div>
                    </>
                ): (
                    <>
                        {providers && 
                            Object.values(providers).map((provider) => (

                                // <button
                                //     type="button"
                                //     key={provider.name}
                                //     onClick={() => signIn(provider.id)}
                                //     href='/login'
                                //     className='btn text-white p-2'
                                // >
                                //     Entrar
                                // </button>
                                <Link
                                    href='/login'
                                    className='bg-white'
                                >
                                    Entrar
                                </Link>
                            ))
                        }
                    </>
                )}
                                ))
                            }
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
