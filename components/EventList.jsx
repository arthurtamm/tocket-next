import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

const EventList = ({ data }) => {
    return (
        <>
            <div className='flex mt-10 h-full flex-row justify-center flex-wrap'>
                {data.map(event => <EventItem key={event._id} event={event} hover={true} />)}
            </div>
        </>
    );
};

export default EventList;