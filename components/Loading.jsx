import { RiLoader2Line } from 'react-icons/ri';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RiLoader2Line className="animate-spin text-4xl text-gray-500" />
    </div>
  );
};

export default Loading;
