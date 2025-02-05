export default function Footer() {
    return (
        <div>
            <footer
                className="w-full bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 text-indigo-800 shadow-inner">
                <div className="max-w-7xl mx-auto py-4 px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold">9otes</span>
                        <span className="text-sm">Empowering Student Success</span>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-indigo-600 transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
                <div className="mt-2 text-center text-sm">© 2025 9otes. All rights reserved.</div>
            </footer>
        </div>
    )
}
