import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
const HamburgerMenu = () => (
    <div className="relative p-2">
        <Menu right
            customBurgerIcon={<HamburgerIcon />}
            width={'150px'}
            className="right-0 top-12"
            // nessa className se colocar acima se colocar top-0
            // fica bonito, mas fica por cima do botão de menu que é onde
            // cancela o menu. eu queria deixar top-0 e só clicando
            // no background cancelar o menu, mas não consegui.
            // nesse link tem mais informações sobre:
            // https://www.npmjs.com/package/react-burger-menu
            customCrossIcon={false}
        >
            <Links />
        </Menu>
    </div>
);

const HamburgerIcon = () => (
    <div className="p-1/2">
        <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </div>
);

export const Links = () => (
    <>
        <Link 
            href="/profile"
        >
            Perfil
        </Link>

        <Link
            href='/eventos'
        >
            Eventos
        </Link>


        <Link
            href='/sac'
        >
            SAC
        </Link>
        <Link
            href='/sobre'
        >
            Sobre nós
        </Link>
        <Link
            href='/project'
        >
            Marketplace
        </Link>
        <Link
            href='/'
            onClick={() => {
                signOut();
            }}
        >
            Sair
        </Link>
    </>
);

export default HamburgerMenu;