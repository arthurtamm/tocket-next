"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineSearch } from "react-icons/ai";
import Link from 'next/link';
import Loading from '@components/Loading';

const EventItem = ({ event }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='flex justify-center items-center mb-4 mr-5 ml-5'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/events/${event._id}`}>
                {isHovered ? (
                    <div className='flex justify-center items-center max-h-[200px] min-h-[200px] max-w-[350px] min-w-[350px] rounded-xl'>
                        <h1 className='text-white text-4xl text-center'>
                            {event.title}
                        </h1>
                    </div>
                ) : (
                    <Image
                        className='max-h-[200px] min-h-[200px] max-w-[350px] min-w-[350px] rounded-xl'
                        src={event.image}
                        alt={event.title}
                        width={350}
                        height={200}
                    />
                )}
            </Link>
        </div>
    );
};


const EventList = ({ data }) => {
    return (
        <>
            <div className='sm:flex hidden mt-10 h-full flex flex-row justify-between flex-wrap'>
                {data.map(event => <EventItem key={event._id} event={event} />)}
            </div>
            {/* O restante da renderização para dispositivos menores, caso necessário */}
        </>
    );
};

const Feed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchEvent, setSearchEvent] = useState({ title: '', image: '', date: new Date(), place: '', });

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
        <section className='flex w-full h-full flex-col items-center bg-indigo-950'>
            {/* Seções de pesquisa e cabeçalho, se necessário */}
            {loading ? <Loading /> : <EventList data={filteredEvents} />}
        </section>
    );
};

export default Feed;
