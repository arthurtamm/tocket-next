import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EventItem = ({ event, hover }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div
                className='md:flex justify-center items-center mb-4 mr-5 ml-5'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href={`/events/${event._id}`}>
                    {hover ? (
                        isHovered ? (
                            <div className='flex justify-center items-center max-h-[170px] min-h-[170px] max-w-[300px] min-w-[300px] rounded-xl bg-gray-950'>
                                <h1 className='text-white text-4xl text-center mr-2 z-10'>
                                    {event.title}
                                </h1>
                                <Image
                                    className='absolute rounded-xl max-h-[170px] min-h-[170px] max-w-[300px] min-w-[300px] opacity-30 animate-pulse'
                                    src={event.image}
                                    alt={event.title}
                                    width={300}
                                    height={170}
                                />
                            </div>
                        ) : (
                            <Image
                                className='max-h-[170px] min-h-[170px] max-w-[300px] min-w-[300px] rounded-xl'
                                src={event.image}
                                alt={event.title}
                                width={300}
                                height={170}
                            />
                        )
                    ) : (
                        <div className='max-w-[640px] flex flex-col justify-center items-center'>
                            <Link href={`/events/${event._id}`}>
                                <Image
                                    className='max-h-[170px] min-h-[170px] max-w-[300px] min-w-[300px] rounded-xl'
                                    src={event.image}
                                    alt={event.title}
                                    width={300}
                                    height={170}
                                />
                            </Link>
                        </div>
                    )}
                </Link>
            </div>
        </>
    );
};

export default EventItem;