'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '@components/Loading';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import '@styles/styles.css'; 


const UserTicketList = ({ data, openModal }) => {
    const sortedTickets = [...data].sort((a, b) => a.price - b.price);
    
    return (
      <div className="mt-4 mb-8 flex-col tocket-bg">
        {sortedTickets.map((ticket) => (
          <div className="bg-blue-900 rounded-lg p-2 m-3 mt-4 mb-5 flex flex-row w-full md:flex-row justify-between text-white" key={ticket._id}>
            <p className="text-lg md:w-1/3 ml-2">{ticket.event?.title}</p>
            <p className="text-lg md:w-1/3">{ticket.type}</p>
            <p className="text-lg md:w-1/3 flex flex-row">
                <div className='mr-5'>
                    R$ {ticket.price.toFixed(2)}
                </div>

                <div className="mt-1 mr-2">
                    <button onClick={() => openModal(ticket, 'edit')} className='mr-4'>
                        <MdOutlineEdit />
                    </button>

                    <button onClick={() => openModal(ticket, 'delete')}>
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

// Componente para edição de preço
const EditTicketModal = ({ isOpen, onClose, ticket, updateTicketPrice }) => {
    const [newPrice, setNewPrice] = useState('');

    const handleSave = () => {
        updateTicketPrice(ticket, newPrice);
        onClose(); // Fecha o modal após salvar
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            {/* <div className="bg-white p-5 rounded-lg">
                <h2 className="text-lg mb-4">Editar Preço do Ingresso</h2>
                <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Novo Preço"
                    className="border p-2"
                />
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" disabled={!newPrice}>
                        Salvar
                    </button>
                </div>
            </div> */}

            <div className="modal-overlay">
                <div className="modal">
                    <div className="mb-4">
                        <p className="mb-2 text-white">Editar preço:</p>
                        <div className="flex items-center border rounded-md">
                            <span className="p-2 bg-gray-200">R$</span>
                            <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="p-2 flex-1 text-black"
                            placeholder="0,00"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={onClose} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg">
                            Cancelar
                        </button>

                        <button onClick={handleSave} className="bg-blue-900 bg-opacity-65 text-white p-2 rounded-lg">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>

        </div>

        
    );
};
  
const MyTicketsForm = () => {
    const { data: session, status } = useSession();

    const [userTickets, setUserTickets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    const getUserData = async () => {
        try {

            const userTicketsResponse = await fetch(`/api/userTickets/${session?.user?.id}`);
            const userTickets = await userTicketsResponse.json();
            setUserTickets(userTickets);

        } catch (error) {
            console.log("Error fetching user data: ", error);
        }
    };

    const openModal = (ticket, action) => {
        setSelectedTicket(ticket);
        setModalAction(action);
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (status === "authenticated") {
            getUserData();
        }
      }, [status]);
    
    const deleteTicket = async (ticket, reason) => {
        try {
            const response = await fetch(`/api/ticket/updateStatus/${ticket._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason }),
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
        
        setIsModalOpen(false);
    };

    const updateTicketPrice = async (ticket, newPrice) => {
       try {
            const response = await fetch(`/api/ticket/updatePrice/${ticket._id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPrice: parseFloat(newPrice) }),
            });
        
            if (response.ok) {
                // Atualiza o estado para remover o ingresso deletado da lista
                setUserTickets(prevTickets => prevTickets.map(t => {
                    if (t._id === ticket._id) {
                        return { ...t, price: parseFloat(newPrice) }; // Atualiza o preço do ingresso específico
                    }
                    return t; // Retorna os demais ingressos sem alteração
                }));
            } else {
            console.error('Falha ao editar o ingresso');
            }
        } catch (error) {
            console.error('Erro ao editar o ingresso:', error);
        }
        
        setIsModalOpen(false);
    };
      
    if (status === "loading") {
        return <Loading />;
    }

    return (
        <div className='grid place-items-top h-screen w-full bg-tocket'>
            <div className='shadow-lg p-5 rounded-lg w-full flex-col justify-center items-center'>
                <h1 className='text-xl font-bold mb-4 text-white'> Meus ingressos </h1>

                {modalAction === 'delete' ? (
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={deleteTicket}
                        ticket={selectedTicket}
                    />
                ) : modalAction === 'edit' ? (
                    <EditTicketModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        ticket={selectedTicket}
                        updateTicketPrice={updateTicketPrice}
                    />
                ) : null}

                
                <UserTicketList data={userTickets} openModal={openModal}/>

            </div>
        </div>
  )
}

export default MyTicketsForm;