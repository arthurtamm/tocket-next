"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSwap, AiOutlineUser } from "react-icons/ai";
import { signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
    // const { data: session } = useSession();
    const isLoggedIn = true;
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

    return (
        <nav className={`transition-all duration-300 w-full top-0 z-10 ${navSticky ? 'sticky' : 'bg-transparent'}`}>
            <div className='flex justify-around py-5'>
                <Link href="/" className="flex items-center ml-10">
                    <Image
                        src="/assets/images/logo.png"
                        alt="Logo"
                        width={124}
                        height={30}
                    />
                </Link>

                <Link href="/" className="text-white mx-2  flex items-center">
                    <AiOutlineHome className="mr-2" /> Início
                </Link>
                <Link href="/about" className="text-white mx-2  flex items-center">
                    <AiOutlineUser className="mr-2" /> Sobre Nós
                </Link>
                <Link href="/project" className="text-white mx-2 flex items-center">
                    <AiOutlineSwap className="mr-2" /> Marketplace
                </Link>

                <div className='flex relative'>
                {isLoggedIn ? (
                    <div className='flex'>
                        <Image
                            src={'/assets/images/profile.png'}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className="dropdown bg-black">
                                <Link
                                    href='/eventos'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Eventos
                                </Link>

                                <Link
                                    href='/sobre'
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Sobre nós
                                </Link>

                                <Link
                                    href='/sac'
                                    className="dropdown_link" 
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    SAC
                                </Link>

                                {/* <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button> */}
                            </div>
                        )}
                    </div>
                ): (
                    <>
                        {providers && 
                            Object.values(providers).map((provider) => (

                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
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
