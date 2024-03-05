'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '@components/Loading';
import Image from 'next/image';
import { MdOutlineEmail, MdModeEdit } from "react-icons/md";
import { HiDevicePhoneMobile, HiOutlineIdentification } from "react-icons/hi2";
import { GiGraduateCap } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import '@styles/styles.css'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
  
const ProfileForm = () => {
  const { data: session, status } = useSession();

	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [error, setError] = useState("");
	const [editing, setEditing] = useState(false);
	const startDate = new Date();
	const formattedDate = startDate.toLocaleDateString('pt-BR', {
		day: '2-digit', // Exibe o dia com dois dígitos
		month: '2-digit', // Exibe o mês com dois dígitos
		year: 'numeric', // Exibe o ano numericamente
	});

	const router = useRouter();

		const getUserData = async () => {
		try {
			const userDataResponse = await fetch(`/api/userData/${session?.user?.id}`);

			const userData = await userDataResponse.json();

			setName(userData.name);
			setPhoneNumber(userData.phoneNumber);

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

		useEffect(() => {
		if (status === "authenticated") {
			getUserData();
		}
		}, [status]);

		if (status === "loading") {
		return <Loading />;
		}

		return (
		<>

		{/* Telas Maiores */}
			<div className='hidden xl:flex flex-col items-center p-5'>
			<h1 className='text-2xl mb-4 text-white'>
				Meus Dados
			</h1>

			<div className='w-[140px] h-[140px] rounded-full mx-auto overflow-hidden'>
				<Image
					src="/assets/images/profile2.png"
					alt="Logo"
					width={140}
					height={140} // Ajuste a altura para corresponder à largura para manter a proporção
				/>
			</div>
			<h1 className='text-white pt-2 text-lg'>
				{name ? (name) : ('Carregando Dados...')}
			</h1>

			<h3 className='text-gray-300 pt-1 text-sm'>
				{session?.user?.email ? session.user.email : ('Carregando Dados...')}
			</h3>

			<div className='shadow-lg p-5 rounded-lg w-full flex-col justify-center items-center'>
				<form onSubmit={handleSubmit} className='flex flex-col justify-center gap-6'>
					<div className='flex flex-wrap max-w-[700px] w-fit justify-center items-center align-middle mx-auto gap-5'>

						<div className="input-login">
							<MdModeEdit className="absolute " size="1.25em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="text"
								value={name ? (name) : ('Carregando Dados...')}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="input-login">
									<HiDevicePhoneMobile className="absolute " size="1.25em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="phone number"
								value={phoneNumber ? (phoneNumber) : ('Carregando Dados...')}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>

						<div className="input-login">
									<HiOutlineIdentification className="absolute " size="1.25em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="document"
								value='123.456.789-00'
							/>
						</div>

						<div className="input-login">
									<GiGraduateCap className="absolute " size="1.25em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="university"
								value='Insper'
							/>
						</div>
					</div>

							<button className='bg-indigo-900 text-white w-4/12 mx-auto rounded-md font-bold cursor-pointer px-6 py-2'> Atualizar Dados </button>

					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
							{error}
						</div>
					)}
				</form>
			</div>
		</div>

		{/* Telas Menores */}
		<div className='flex flex-col xl:hidden items-center p-5'>
				<h1 className='text-2xl mb-4 text-white'>
					Meus Dados
				</h1>

			<div className='w-[140px] h-[140px] rounded-full mx-auto overflow-hidden'>
				<Image
					src="/assets/images/profile2.png"
					alt="Logo"
					width={140}
					height={140} // Ajuste a altura para corresponder à largura para manter a proporção
				/>
			</div>
			<h1 className='text-white pt-2 text-lg'>
				{name ? (name) : ('Carregando Dados...')}
			</h1>

			<h3 className='text-gray-300 pt-1 text-sm'>
				{session?.user?.email ? session.user.email : ('Carregando Dados...')}
			</h3>
		
			<div className='shadow-lg p-5 rounded-lg w-full flex-col justify-center items-center'>
				<form onSubmit={handleSubmit} className='flex flex-col justify-center gap-6'>
					<div className='flex flex-wrap justify-center gap-3'>
		
						<div className="input-login">
							<MdModeEdit className="absolute" size="1.5em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="text"
								value={name ? (name) : ('Carregando Dados...')}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="input-login">
							<HiDevicePhoneMobile className="absolute" size="1.5em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="phone number"
								value={phoneNumber ? (phoneNumber) : ('Carregando Dados...')}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>

						<div className="input-login">
							<HiOutlineIdentification className="absolute" size="1.5em" />
							<input
								className="ml-8 w-full bg-transparent outline-none"
								type="document"
								value='123.456.789-00'
							/>
						</div>

						<div className="input-login relative">
							<IoCalendarOutline className="absolute left-0 top-0 mt-2 ml-2" size="1.5em" />
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								className="ml-8 w-full bg-transparent outline-none"
								dateFormat="dd / MM / yyyy"
							/>
						</div>

					</div>

					<button className='bg-indigo-900 text-white w-8/12 mx-auto rounded-md font-bold cursor-pointer px-6 py-2'> Atualizar Dados </button>

					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
							{error}
						</div>
					)}
				</form>
			</div>
		</div>
		</>
  )
}

export default ProfileForm;