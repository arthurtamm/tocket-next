"use client" ;

import { useState, useEffect } from "react";
import Image from "next/image";

const EventPage = ( { params } ) => {

  const eventId = params.name;
  const [event, setEvent] = useState({
    title: '',
    image: '',
    date: new Date(),
    place: '',
  });

  useEffect(() => {
      const getEventDetails = async () => {
          const response = await fetch(`/api/event/${eventId}`);
          const data = await response.json();

          setEvent({
            title: data.title,
            image: data.image,
            date: new Date(data.date),
            place: data.place,
          })
      }

    if(eventId) getEventDetails();
  }, [eventId]);

  return (
    <section className="text-white p-3">
      <h1>{event.title}</h1>
      <div className="flex row w-full">
        <Image
          src={event.image}
          alt={event.title}
          width={500}
          height={300}
        />
        <div className="sticky rounded-lg p-2 flex flex-col justify-center">
          <div>
            <p>{`Data:${event.date.getDay()}/${event.date.getMonth()}/${event.date.getFullYear()}`}</p>
            <p>{`Horário: ${event.date.getHours()}:00`}</p>
            <p>{`Local: ${event.place}`}</p>
          </div>
        </div>
      </div>
      
      <p className="text-center pt-10 pb-4"> Ingressos Disponíveis </p>

      <div>
        <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around">
          <p className="w-1/5"> Gabriel Mendonça</p>
          <p className="w-1/5"> R$ 175,00 </p>
          <p className="w-1/5"> (65) 99987-3246 </p>
        </div>

        <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around">
          <p className="w-1/5"> Pedro Civita</p>
          <p className="w-1/5"> R$ 180,00 </p>
          <p className="w-1/5"> (11) 99901-4434 </p>
        </div>
        
        <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around">
          <p className="w-1/5"> Arthur Tamm </p>
          <p className="w-1/5"> R$ 185,00 </p>
          <p className="w-1/5"> (31) 99645-5973 </p>
        </div>

        <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around">
          <p className="w-1/5"> Caio Bôa </p>
          <p className="w-1/5"> R$ 190,00 </p>
          <p className="w-1/5"> (11) 99257-3730 </p>
        </div>
      </div>
      
    </section>
  )
}

export default EventPage;