import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

const EventList = ({ data }) => {
    return (
        <>
            <div className='md:flex hidden mt-10 h-full flex flex-row justify-between flex-wrap'>
                {data.map(event => <EventItem key={event._id} event={event} hover={true} />)}
            </div>
            <div className='sm:hidden mt-4 w-4/5 flex flex-col px-4'>
                {data.map(event => <EventItem key={event._id} event={event} hover={false} />)}
            </div>
        </>
    );
};

export default EventList;