import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden'>
			{/* Stylish Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-indigo-500 border-indigo-300 rounded-full shadow-lg'
				animate={{ rotate: 360 }}
				transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;
