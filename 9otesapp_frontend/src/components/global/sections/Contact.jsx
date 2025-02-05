import React from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function Contact() {
    return (
        <section className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-indigo-800 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
                    Have questions or need support? Fill out the form below or reach out through email or phone.
                </p>

                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
                        <Mail className="w-8 h-8 text-indigo-600" />
                        <div>
                            <h3 className="text-xl font-bold text-indigo-800">Email</h3>
                            <p className="text-gray-700">9otes@gmail.com</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
                        <Phone className="w-8 h-8 text-indigo-600" />
                        <div>
                            <h3 className="text-xl font-bold text-indigo-800">Phone</h3>
                            <p className="text-gray-700">+91 93XXX 84XXX</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4">
                        <MessageSquare className="w-8 h-8 text-indigo-600" />
                        <div>
                            <h3 className="text-xl font-bold text-indigo-800">Live Chat</h3>
                            <p className="text-gray-700">Available 24/7</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Send a Message</h3>
                    <form className="space-y-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                            required
                        ></textarea>
                        <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
