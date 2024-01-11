"use client" ;

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TicketList = ({ tickets }) => {
  return (
    <div>
      <div className='mt-16 prompt_layout'>
        {data.map((ticket) => (
            <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around">
              <p className="w-1/5"> {ticket.user.username}</p>
              <p className="w-1/5"> R$ { ticket.price } </p>
              <p className="w-1/5"> (65) 99987-3246 </p>
            </div>
        ))}
      </div>
    </div>
  )
}

const EventPage = ( { params } ) => {

  const { data: session } = useSession();
  const router = useRouter();

  const eventId = params.id;
  const [event, setEvent] = useState({
    title: '',
    image: '',
    date: new Date(),
    place: '',
  });
  const [tickets, setTickets] = useState({
    userId: '',
    eventId: '',
    price: '',
  
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
      const getEventDetails = async () => {
          const response = await fetch(`/api/event/${eventId}`);
          const data = await response.json();
          console.log("data: ", data);

          setEvent({
            title: data.title,
            image: data.image,
            date: new Date(data.date),
            place: data.place,
          })
      }

    if(eventId) getEventDetails();
  }, [eventId]);
  
  useEffect(() => {
    const getTickets = async () => {
      const response = await fetch('/api/ticket');
      const data = await response.json();

      setTickets(data);
    }

    getTickets();
  }, [eventId]);

  const openModal = () => {
    setPrice('');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    console.log('Preço confirmado:', price);
    closeModal();
  };

  const sellTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const response = await fetch('/api/ticket/new', {
            method: 'POST',
            body: JSON.stringify({
                userId: session?.user.id,
                event: eventId,
                price: price,
            }),
        })

        if(response.ok){
            router.push('/');
        }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmitting(false);
    
    }
}

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

      
      <div className="flex flex-row place-content-center mt-10">
        <p className="text-center p-4"> Ingressos Disponíveis </p>

        <button className="p-4 ml-10 btn" onClick={openModal}>
          Anunciar Ingresso
        </button>

        {modalVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Preço:</p>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 border rounded-md mb-4 text-black"
              />

              <div>
                <button onClick={closeModal} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg m-4">
                  Cancelar
                </button>

                <button onClick={sellTicket} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg m-4">
                  Confirmar
                </button>

              </div>
            </div>
          </div>
        )}

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