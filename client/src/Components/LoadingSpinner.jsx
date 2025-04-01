import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			
			<motion.div
				className="w-16 h-16 border-4 border-t-4 border-t-indigo-500 border-indigo-300 rounded-full shadow-lg"
				animate={{ rotate: 360 }}
				transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;
