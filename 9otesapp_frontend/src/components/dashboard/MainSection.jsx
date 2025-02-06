export default function MainSection() {
    return (
        <main className="flex-1 p-8 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-l-2xl">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-800 mb-8">Welcome to 9otes</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-200"
                        >
                            <h2 className="text-lg font-semibold text-indigo-800 mb-3">Content Section {item}</h2>
                            <p className="text-gray-600">Your notes and study materials will appear here.</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
