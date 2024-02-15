"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import EventList from '@components/EventList';
import Loading from '@components/Loading';

const Feed = () => {
    // const response = await fetch('/api/event');
    // const events = await response.json();
    const [events, setEvents] = useState([]);
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
        <section className='flex w-full h-full flex-col items-center '>

            <section className='sm:flex hidden flex w-full mt-10 flex-row justify-center items-center'>

                <div className='flex flex-col justify-start'>
                    <h1 className='text-white mr-20 text-4xl'>EVENTOS</h1>
                    <h1 className='text-white mr-20 text-3xl'>BOMBANDO</h1>
                </div>

                <form className='w-1/3'>
                    <div className='relative'>
                        <input
                            type="text"
                            placeholder='Buscar eventos'
                            className='w-full h-10 rounded-full pl-10'
                            value={searchEvent.title}
                            onChange={handleSearchChange}
                        />
                        <span className='absolute left-5 top-[50%]' style={{ transform: 'translate(-50%, -50%)' }}>
                            <AiOutlineSearch className='text-gray-500' />
                        </span>
                    </div>
                </form>
            </section>

            <section className='sm:hidden flex w-full h-full mt-2 flex-row justify-center items-center'>

                <div className='flex flex-col justify-start'>
                    <h1 className='text-white ml-2 mr-5 text-2xl'>EVENTOS</h1>
                    <h1 className='text-white ml-2 mr-5 text-xl'>BOMBANDO</h1>
                </div>

                <form className='w-full mr-2'>
                    <div className='relative'>
                        <input
                            type="text"
                            placeholder='Buscar eventos'
                            className='w-full h-10 rounded-full pl-10'
                            value={searchEvent.title}
                            onChange={handleSearchChange}
                        />
                        <span className='absolute left-5 top-[50%]' style={{ transform: 'translate(-50%, -50%)' }}>
                            <AiOutlineSearch className='text-gray-500' />
                        </span>
                    </div>
                </form>
            </section>

            {loading ? <Loading /> : <EventList data={filteredEvents} />}
        </section>
    )
}

export default Feed;