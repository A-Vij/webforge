import { X } from 'lucide-react';

export const AvatarModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const avatars = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center backdrop-blur-md">
      <div className="bg-black/20 border-4 border-purple-600 rounded-xl p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-purple-400 cursor-pointer"
        >
          <X size={20} />
        </button>
        <h2 className="text-purple-300 text-xl font-bold mb-4">Choose Your Avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Avatar ${index}`}
              className="w-20 h-20 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-500 transition cursor-pointer"
              onClick={() => {
                onSelect(src);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
