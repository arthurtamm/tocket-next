'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '@components/Loading';
import { RiDeleteBin6Line } from "react-icons/ri";
import '@styles/styles.css'; 


const UserTicketList = ({ data, openModal }) => {
    const sortedTickets = [...data].sort((a, b) => a.price - b.price);
    
    return (
      <div className="mt-4 mb-8 flex-col tocket-bg">
        {sortedTickets.map((ticket) => (
          <div className="bg-blue-900 rounded-lg p-2 m-3 flex flex-row w-full md:flex-row justify-between text-white" key={ticket._id}>
            <p className="text-lg md:w-1/3 ml-2">{ticket.event?.title}</p>
            <p className="text-lg md:w-1/3">{ticket.type}</p>
            <p className="text-lg md:w-1/3 flex flex-row">
                <div className='mr-5'>
                    R$ {ticket.price.toFixed(2)}
                </div>

                <div className="mt-1 mr-2">
                <button onClick={() => openModal(ticket)}>
                    <RiDeleteBin6Line />
                </button>
                </div>

            </p>
          </div>
        ))}
      </div>
    );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, ticket }) => {
    const [deletionReason, setDeletionReason] = useState('');
  
    const handleConfirm = () => {
      onConfirm(ticket, deletionReason);
      setDeletionReason(''); // Reseta a escolha ao confirmar
      onClose(); // Fecha o modal
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
          <h2 className="text-lg mb-4">Confirmação</h2>
          <p>Você vendeu o ingresso ou deseja apenas retirar o anúncio?</p>
          <div className="my-4">
            <label>
              <input
                type="radio"
                name="deletionReason"
                value="sold"
                checked={deletionReason === 'sold'}
                onChange={(e) => setDeletionReason(e.target.value)}
              />
              Vendido pela plataforma
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="deletionReason"
                value="withdrawn"
                checked={deletionReason === 'inactive'}
                onChange={(e) => setDeletionReason(e.target.value)}
              />
              Apenas retirar o anúncio
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
              Cancelar
            </button>
            <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" disabled={!deletionReason}>
              Confirmar Deleção
            </button>
          </div>
        </div>
      </div>
    );
};
  
const ProfileForm = () => {
    const { data: session, status } = useSession();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userTickets, setUserTickets] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    
    const router = useRouter();

    const getUserData = async () => {
        try {
            const [userDataResponse, userTicketsResponse] = await Promise.all([
                fetch(`/api/userData/${session?.user?.id}`),
                fetch(`/api/userTickets/${session?.user?.id}`),
            ]);

            const userData = await userDataResponse.json();
            const userTickets = await userTicketsResponse.json();

            setName(userData.name);
            setPhoneNumber(userData.phoneNumber);
            setUserTickets(userTickets);
            

        } catch (error) {
            console.log("Error fetching user data: ", error);
        }
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();

        if (!name || !phoneNumber) {
            setError("All fields are required.");
            return;
        }

        try {

            const resUserExists = await fetch('api/userExists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("Nome já existente. Escolha outro nome de usuário");
                return;
            }

            const res = await fetch('api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id : session?.user?.id, name, phoneNumber }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("User registration failed.")
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (status === "authenticated") {
            getUserData();
        }
      }, [status]);
    
    const deleteTicket = async (ticket, reason) => {
        // Aqui você pode adicionar lógica condicional baseada na razão
        console.log(`Deletando ticket ${ticket._id} por motivo: ${reason}`);
        // Exemplo de chamada de API para deletar o ingresso, ajuste conforme sua API
        try {
            const response = await fetch(`/api/ticket/changeStatus/${ticket._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason }), // Passa a razão para a API, se necessário
            });
        
            if (response.ok) {
                // Atualiza o estado para remover o ingresso deletado da lista
                setUserTickets(prevTickets => prevTickets.filter(t => t._id !== ticket._id));
            } else {
            console.error('Falha ao deletar o ingresso');
            }
        } catch (error) {
            console.error('Erro ao deletar o ingresso:', error);
        }
        
        setIsModalOpen(false); // Fecha o modal
    };
      
    if (status === "loading") {
        return <Loading />;
    }

    return (
        <div className='grid place-items-top h-screen w-full bg-tocket'>
            <div className='shadow-lg p-5 rounded-lg w-full flex-col justify-center items-center'>
                <h1 className='text-xl font-bold mb-4 text-white'>Dados Cadastrais</h1>

                <form onSubmit={handleSubmit}   className='flex flex-col gap-3'>
                <input
                        className='input-login' 
                        type="text" 
                        value={session?.user?.email ? (session?.user?.email) : ('Carregando Dados...')}
                        disabled
                    />
                    <input
                        className='input-login' 
                        type="text" 
                        value={name ? (name) : ('Carregando Dados...')}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                        className='input-login' 
                        type="phone number" 
                        value={phoneNumber ? (phoneNumber) : ('Carregando Dados...')}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <button className='bg-indigo-900 text-white font-bold cursor-pointer px-6 py-2'> Atualizar Dados </button>

                    {   error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                            {error}
                        </div>
                    )}

                </form>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={deleteTicket}
                    ticket={selectedTicket}
                />
                
                <UserTicketList data={userTickets} openModal={openModal}/>

            </div>
        </div>
  )
}

export default ProfileForm;