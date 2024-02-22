import React from 'react'

const CheckEmail = () => {
    return (
      <div className="flex items-center justify-center h-screen"> {/* Fundo cinza escuro */}
        <div className="max-w-md px-8 py-6 mt-4 text-left sticky shadow-lg rounded-lg"> {/* Caixa com sombra e bordas arredondadas */}
          <h1 className="text-2xl font-bold text-white">Verifique seu email</h1>
          <p className="my-4 text-white">
            Um link de verificação foi enviado para o seu email.
          </p>
        </div>
      </div>
    );
  };
  
  export default CheckEmail;
  
  