"use client";

import React from 'react'
import Image from 'next/image';
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loading from '@components/Loading';

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
    const [loading, setLoading] = useState(true);

    const [searchEvent, setSearchEvent] = useState({
        title: '',
        image: '',
        date: new Date(),
        place: '',
      });
  
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/event');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
    };

    fetchEvents();
    }, []);

    const handleSearchChange = (e) => {
        setSearchEvent({ ...searchEvent, title: e.target.value });
    };

    const filteredEvents = events.filter(
        (event) => event.title.toLowerCase().includes(searchEvent.title.toLowerCase())
    );  

    return (
        <section className= 'flex w-full flex-col items-center'>
            
            <section className= 'flex w-full mt-10 flex-row'>
                
                <h1 className='text-white mr-20'>Eventos</h1>
                
                <form className='w-full'>
                    <div className='w-1/3 relative'>
                        <input 
                            type="text"
                            placeholder='Buscar eventos'
                            className='w-full h-10 rounded-full pl-10'
                            value={searchEvent.title}
                            onChange={handleSearchChange}
                        />
                        <span className='absolute left-5 top-[50%]' style={{ transform: 'translate(-50%, -50%)'}}>
                            <AiOutlineSearch className='text-gray-500' />
                        </span>
                    </div>
                </form>

            </section>

            {loading ? <Loading /> : <EventList data={filteredEvents} />}

        </section>
  )
}

export default Feed