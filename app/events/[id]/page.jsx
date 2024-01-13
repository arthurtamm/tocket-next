"use client" ;

import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading'

const TicketList = ({ data }) => {
  const sortedTickets = [...data].sort((a,b) => a.price - b.price);

  return (
    <div>
      <div className='mt-16 prompt_layout'>
        {sortedTickets.map((ticket) => (
            <div className="sticky rounded-lg p-2 m-3 flex flex-row justify-around" key={ticket._id}>
              <p className="w-1/5"> {ticket.user?.username}</p>
              <p className="w-1/5"> R$ { ticket.price } </p>
              <p className="w-1/5"> (11) 99999-9999 </p>
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
    ticketTypes: [],
  });
  const [tickets, setTickets] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, ticketsResponse] = await Promise.all([
          fetch(`/api/event/${eventId}`),
          fetch(`/api/ticket/${eventId}`)
        ]);

        const eventData = await eventResponse.json();
        const ticketsData = await ticketsResponse.json();

        setEvent({
          title: eventData.title,
          image: eventData.image,
          date: new Date(eventData.date),
          place: eventData.place,
          ticketTypes: eventData.ticketTypes || []  ,
        });

        setTickets(ticketsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
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
                type: selectedType,
            }),
        })

        if(response.ok){
          router.refresh();
        }
    } catch (error) {
        console.log(error);
    } finally {
      setSubmitting(false);
      closeModal();
    }
}

return (
  <section className="text-white p-3">
    {loading ? (
      <div>
        <Loading/>
      </div>
    ) : (
      <>
        <div className="flex flex-row items-center">
          <h1 className='text-white text-6xl text-center ml-7 mr-10'>{event.title}</h1>
          <div className="flex flex-row">
            <Image
              src={event.image}
              alt={event.title}
              width={500}
              height={300}
            />
            <div className="sticky rounded-lg p-5 flex flex-col justify-between text-white text-xl text-center">
              <div>
                <p>{`Data:${event.date.getDay()}/${event.date.getMonth()}/${event.date.getFullYear()}`}</p>
                <p>{`Horário: ${event.date.getHours()}:00`}</p>
                <p>{`Local: ${event.place}`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row place-content-center mt-10">
          <p className="text-center p-4"> Ingressos Disponíveis </p>

          <button className="p-4 ml-10 btn" onClick={session?.user ? openModal : signIn}>
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
                    <label htmlFor="ticketType">Tipo:</label>
                    <select
                      id="ticketType"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="p-2 border rounded-md mb-4 text-black"
                    >
                      {event.ticketTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                </div>

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

         {/* Mostra os ingressos organizados por tipo */}
         {event.ticketTypes.map((type) => (
            <div key={type}>
              <h2>{type}</h2>
              <TicketList
                data={tickets.filter((ticket) => ticket.type === type)}
              />
            </div>
          ))}
      </>
    )}
  </section>
  );
}

export default EventPage;