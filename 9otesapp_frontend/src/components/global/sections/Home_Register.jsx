import { Book, Lightbulb, Users, Clock, Globe } from "lucide-react"
import {Link} from "react-router-dom";
import RegistrationForm from "./RegistrationForm.jsx"

export default function Home_Register() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-indigo-200">
            {/* Hero Section with Registration */}
            <section className="relative py-12 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Creative Box */}
                    <div className="relative p-8">
                        <div
                            className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Sign Up To Access Your Study Material
                            </h1>
                            <p className="text-xl text-blue-100 mb-8">Anytime, Anywhere!</p>
                            <div className="grid grid-cols-2 gap-4 text-white">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5"/>
                                    <span>24/7 Access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5"/>
                                    <span>Global Resources</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-2xl backdrop-blur-lg">
                        <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Create Your Account</h2>
                        <RegistrationForm />
                        <p className="mt-4 text-center text-gray-600">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose 9otes Section */}
            <section className="py-20 px-6 bg-white bg-opacity-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-indigo-800 mb-12 text-center">Why Choose
                        9otes?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Book,
                                title: "Comprehensive Study Materials",
                                description:
                                    "Access a vast library of well-organized study materials covering various subjects and topics.",
                            },
                            {
                                icon: Lightbulb,
                                title: "Interactive Learning",
                                description:
                                    "Engage with interactive content and smart study tools designed to enhance your learning experience.",
                            },
                            {
                                icon: Users,
                                title: "Collaborative Environment",
                                description: "Connect with peers and educators in a supportive learning community.",
                            },
                        ].map((feature, index) => (
                            <div key={index}
                                 className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div
                                    className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-indigo-600"/>
                                </div>
                                <h3 className="text-xl font-bold text-indigo-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-blue-500">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Learning Journey?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students already using 9otes to achieve their academic goals.
                    </p>
                    <button
                        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>
    )
}