"use client" ;

import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading'

const TicketList = ({ data }) => {
  const sortedTickets = [...data].sort((a, b) => a.price - b.price);

  return (
    <div className="mt-4 mb-8">
      {sortedTickets.map((ticket) => (
        <div className="sticky rounded-lg p-2 m-3 flex flex-col w-2/5 md:flex-row justify-between items-center" key={ticket._id}>
          <p className="text-lg md:w-1/3">{ticket.user?.username || 'Usuário desconhecido'}</p>
          <p className="text-lg md:w-1/3">R$ {ticket.price.toFixed(2)}</p>
          <p className="text-lg text-center md:w-1/3">{ticket.user?.phone || 'Sem número cadastrado'}</p>
        </div>
      ))}
    </div>
  );
};


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
      // console.log("user: ",  session?.user.id, "event: ", eventId, "price: ", price, "type: ", selectedType);
      console.log("session: ", session?.user);
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
          <div className="flex flex-col rounded-lg sm:flex-row items-stretch">
            <div className="w-full sm:w-1/2">
              <Image
                src={event.image}
                alt={event.title}
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
            <div className="w-full sticky sm:w-1/2 flex">
              <div className="m-auto p-5 flex flex-col justify-between text-center">
                <p className="text-sm sm:text-base lg:text-lg p-1">{`Data: ${event.date.getDay()} / ${event.date.getMonth()} / ${event.date.getFullYear()}`}</p>
                <p className="text-sm sm:text-base lg:text-lg p-1">{`Horário: ${event.date.getHours()}:00`}</p>
                <p className="text-sm sm:text-base lg:text-lg p-1">{`Local: ${event.place}`}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row place-content-center mt-10 text-center">
            <button
              className="px-4 py-2 text-sm sm:text-base lg:text-lg btn_anuncia transition duration-300 ease-in-out"
              onClick={session?.user ? openModal : signIn}
            >
              Anunciar Ingresso
            </button>


            { modalVisible && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="mb-4">
                    <p className="mb-2">Preço:</p>
                    <div className="flex items-center border rounded-md">
                      <span className="p-2 bg-gray-200">R$</span>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 flex-1 text-black"
                        placeholder="0,00"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ticketType" className="mb-2 block">Tipo:</label>
                    <select
                      id="ticketType"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="p-2 border rounded-md w-full text-black"
                    >
                      {event.ticketTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={closeModal} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg">
                      Cancelar
                    </button>

                    <button onClick={sellTicket} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            )}

        </div>

        <p className="text-center pt-10 pb-4"> Ingressos Disponíveis </p>

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