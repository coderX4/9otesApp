import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { baseUrl } from "../globalindex.js";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
    };

    // Form validation
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/mail/sendmail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Message sent successfully! ✅");
                setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
                setStatus("Failed to send message. ❌ Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("An error occurred. ❌ Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-indigo-800 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
                    Have questions or need support? Fill out the form below or reach out through email or phone.
                </p>

                {/* Contact Info */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 text-left mb-12">
                    {[
                        { icon: Mail, title: "Email", text: "9otesapp@gmail.com" },
                        { icon: Phone, title: "Phone", text: "+91 93XXX 84XXX" },
                        { icon: MessageSquare, title: "Live Chat", text: "Available 24/7" },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 transition-transform duration-300 hover:scale-105"
                        >
                            <item.icon className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h3 className="text-xl font-bold text-indigo-800">{item.title}</h3>
                                <p className="text-gray-700">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Send a Message</h3>

                    {status && (
                        <p className={`mt-3 mb-2 text-center ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
                            {status}
                        </p>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {[
                            { name: "name", type: "text", placeholder: "Your Name" },
                            { name: "email", type: "email", placeholder: "Your Email" },
                        ].map((field) => (
                            <div key={field.name}>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    autoFocus={field.name === "name"}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                                        errors[field.name] ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                            </div>
                        ))}

                        <div>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 ${
                                    errors.message ? "border-red-500" : "border-gray-300"
                                }`}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-all ${
                                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-700"
                            }`}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
