export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 text-white shadow-inner rounded-t-2xl">
            <div className="max-w-7xl mx-auto py-6 px-6 flex flex-col md:flex-row md:justify-between items-center text-center md:text-left">
                {/* Brand Section */}
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
                    <span className="text-2xl font-bold tracking-wide">NOTESFORGE</span>
                    <span className="text-sm opacity-80">Empowering Student Success</span>
                </div>

                {/* Links Section */}
                <div className="flex flex-wrap justify-center md:justify-start space-x-6">
                    <a href="#" className="hover:text-blue-300 transition-all">Terms</a>
                    <a href="#" className="hover:text-blue-300 transition-all">Privacy</a>
                    <a href="#" className="hover:text-blue-300 transition-all">Contact</a>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-2 text-center text-sm opacity-80 border-t border-white/20 py-3">
                © 2025 NOTESFORGE. All rights reserved.
            </div>
        </footer>
    );
}
