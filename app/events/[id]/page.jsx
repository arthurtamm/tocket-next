"use client" ;

import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading'
import { SiGooglemessages } from "react-icons/si";
import chatLink from '@helper/whatsapp';

const TicketList = ({ data }) => {
  const sortedTickets = [...data].sort((a, b) => a.price - b.price);

  return (
    <div className="mt-4 mb-8 flex-col">
      {sortedTickets.map((ticket) => (
        <div className="sticky rounded-lg p-2 m-3 flex flex-col w-full md:flex-row justify-between items-center" key={ticket._id}>
          <p className="text-lg md:w-1/3">{ticket.user?.name || 'Usuário desconhecido'}</p>
          <p className="text-lg md:w-1/3">R$ {ticket.price.toFixed(2)}</p>
          <p className="text-lg text-center md:w-1/3 flex flex-row">
            <div className="mt-1 mr-2">
              <a href={chatLink(ticket.user?.phoneNumber)}>
                <SiGooglemessages />
              </a>
            </div>
              {ticket.user?.phoneNumber
                ? ticket.user.phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
                : 'Sem número cadastrado'}
            
          </p>

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
  const [selectedType, setSelectedType] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typeNow, setTypeNow] = useState('');

  const [userData, setUserData] = useState({
    name: null,
    phoneNumber: null,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia o carregamento
  
      try {
        // Combina as chamadas de API necessárias
        const [eventResponse, ticketsResponse, userDataResponse] = await Promise.all([
          fetch(`/api/event/${eventId}`),
          fetch(`/api/ticket/${eventId}`),
          session?.user?.id ? fetch(`/api/userData/${session?.user?.id}`) : Promise.resolve(null),
        ]);
  
        const eventData = await eventResponse.json();
        const ticketsData = await ticketsResponse.json();

        for (let i = 0; i < ticketsData.length; i++) {
          console.log("ticketsData: ", ticketsData[i]);
        }

        const userDataRes = userDataResponse ? await userDataResponse.json() : null;
  
        // Atualiza o estado com os dados recebidos
        setEvent({
          title: eventData.title,
          image: eventData.image,
          date: new Date(eventData.date),
          place: eventData.place,
          ticketTypes: eventData.ticketTypes || [],
        });

        setTypeNow(eventData.ticketTypes[0]);

        setTickets(ticketsData);
  
        if (userData) {
          setUserData({
            name: userDataRes.name,
            phoneNumber: userDataRes.phoneNumber,
          });
        }
  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
  
    if (eventId || session?.user?.id) fetchData();
  }, [eventId, session?.user?.id]); // Dependências do useEffect
  
  
  const openModal = () => {
    setPrice('');
    // Define o selectedType para o primeiro tipo de ingresso disponível
    if (event.ticketTypes.length > 0) {
      setSelectedType(event.ticketTypes[0]);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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

      if (response.ok) {
        const newTicket = await response.json(); // Supondo que o servidor retorne o ingresso criado
  
        // Aqui você adiciona o novo ingresso ao estado, assegurando que os dados do usuário estão incluídos
        setTickets(prevTickets => [...prevTickets, { ...newTicket, user: { name: userData.name, phoneNumber: userData.phoneNumber } }]);
  
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
              onClick={() => {
                if (userData.name) {
                  openModal();
                } else {
                  console.log("userData: ", userData);
                  router.push('/profile');
                }
              }}
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

                    <select
                      id="ticketType"
                      value={selectedType}
                      onChange={(e) => setTypeNow(e.target.value)}
                      className="p-2 border rounded-md w-full text-black"
                    >
                      {event.ticketTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

              <TicketList
                data={tickets.filter((ticket) => ticket.type === typeNow).filter((ticket) => tickets.indexOf(ticket) < 5 )}
              />
      </>
    )}
  </section>
  );
}

export default EventPage;