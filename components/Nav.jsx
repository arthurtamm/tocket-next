"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineHome, AiOutlineSwap, AiOutlineUser } from "react-icons/ai";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';
import Dropdown from '@components/Dropdown';
import HamburgerMenu from '@components/Burger';
import '@styles/styles.css';

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
        <nav className={`transition-all duration-300 w-full top-0 z-10 bg-indigo-900 sticky ${navSticky ? 'nav-bg' : 'bg-transparent'}`}>
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
                            <div className='hidden xl:flex'>
                                <Dropdown
                                    toggleDropdown={toggleDropdown}
                                    setToggleDropdown={setToggleDropdown}
                                />
                            </div>

                            <div className='flex xl:hidden'>
                                <HamburgerMenu />
                            </div>

                            </>
                    ): (
                        <>
                            {providers && 
                                Object.values(providers).map((provider) => (
                                    <div className='flex'>
                                    <Link
                                        href='/login'
                                        className='btn'
                                    >
                                        Acesse sua conta
                                    </Link>

                                    <Link
                                        href='/register'
                                        className='btn ml-1'
                                    >
                                        Cadastre-se
                                    </Link>
                                    </div>
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