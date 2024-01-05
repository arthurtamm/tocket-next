"use client";

import React from 'react'
import Image from 'next/image';
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const EventList = ({ data }) => {
    return (
      <div className='mt-16 prompt_layout'>
        {data.map((event) => (
            <Link href={`/events/${event._id}`}>
                <Image
                    src={event.image}
                    alt={event.title}
                    width={200}
                    height={200}
                />
            </Link>
        ))}
      </div>
    )
}

const Feed = () => {
    // const response = await fetch('/api/event');
    // const events = await response.json();
    const [events, setEvents ] = useState([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        const response = await fetch('/api/event');
        const data = await response.json();
  
        setEvents(data);
      }
  
      fetchEvents();
    }, []);

    return (
        <section className= 'w-full flex-col'>
            
            <p className='text-white'>Eventos</p>
            
            <form className='w-full flex-center mt-10'>
                <div className='w-1/3 relative'>
                    <input 
                    type="text"
                    placeholder='Buscar eventos'
                    className='w-full h-10 rounded-full pl-10'
                    />
                    <span className='absolute left-5 top-[50%]' style={{ transform: 'translate(-50%, -50%)'}}>
                        <AiOutlineSearch className='text-gray-500' />
                    </span>
                </div>
            </form>

            <EventList
                data={events}
            />

        </section>
  )
}

export default Feed