export default function Footer() {
    return (
        <div>
            <footer
                className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 text-white shadow-inner rounded-t-2xl">
                <div className="max-w-7xl mx-auto py-6 px-8 flex flex-col md:flex-row justify-between items-center">
                    {/* Brand Section */}
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold tracking-wide">9otes</span>
                        <span className="text-sm opacity-80">Empowering Student Success</span>
                    </div>

                    {/* Links Section */}
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-blue-300 transition-all">Terms</a>
                        <a href="#" className="hover:text-blue-300 transition-all">Privacy</a>
                        <a href="#" className="hover:text-blue-300 transition-all">Contact</a>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-2 text-center text-sm opacity-80 border-t border-white/20 py-3">
                    © 2025 9otes. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
