import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="w-full mt-16 py-6 bg-black/50 backdrop-blur-lg border-t border-gray-700 text-gray-300">
            <div className="max-w-screen-lg mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                
                {/* Logo / Copyright */}
                <p className="text-sm">
                    © {new Date().getFullYear()} WebForge. All rights reserved.
                </p>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center md:justify-end gap-4">
                    <Link 
                        to="/about" 
                        className="border border-gray-700 px-3 py-1 rounded-full transition-colors hover:bg-purple-700 hover:text-white hover:border-transparent"
                    >
                        About
                    </Link>
                    <Link 
                        to="/contact" 
                        className="border border-gray-700 px-3 py-1 rounded-full transition-colors hover:bg-purple-700 hover:text-white hover:border-transparent"
                    >
                        Contact
                    </Link>
                    <Link 
                        to="/privacy" 
                        className="border border-gray-700 px-3 py-1 rounded-full transition-colors hover:bg-purple-700 hover:text-white hover:border-transparent"
                    >
                        Privacy Policy
                    </Link>
                </div>

            </div>
        </footer>
    );
}
