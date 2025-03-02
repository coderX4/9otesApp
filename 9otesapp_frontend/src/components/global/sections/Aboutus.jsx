export default function AboutUs() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-indigo-800 mb-6">About Us</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                    NOTESFORGE is dedicated to providing high-quality study materials and an interactive learning
                    environment for students worldwide. Our mission is to empower students by making education
                    accessible, engaging, and effective.
                </p>

                {/* Mission, Vision, and Values Section */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Our Mission",
                            description: "To revolutionize the way students learn by providing high-quality, accessible, and interactive study resources.",
                            icon: "🚀", // Icon for more engaging experience
                        },
                        {
                            title: "Our Vision",
                            description: "To create a global community where students and educators can collaborate and excel together.",
                            icon: "🌍", // Icon for better context
                        },
                        {
                            title: "Our Values",
                            description: "Innovation, accessibility, and collaboration are at the core of everything we do.",
                            icon: "💡", // Icon for visual appeal
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-indigo-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center"
                            aria-label={item.title}
                        >
                            <div className="text-5xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-indigo-800 mb-2">{item.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
