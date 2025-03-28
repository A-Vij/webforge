const Input = ({ icon: Icon, ...props }) => {
  return (
      <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Brightened icon & added a glow */}
              <Icon key = "input-icon" className="size-5 text-purple-300 drop-shadow-md" />
          </div>
          <input
              {...props}
              className="w-full pl-10 pr-3 py-2 bg-black/40 rounded-lg border border-white/10 
                         focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none text-white 
                         placeholder-gray-500 transition duration-200 shadow-md"
          />
      </div>
  );
};
export default Input;
