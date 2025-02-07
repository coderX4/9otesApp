const fetchInstance = async (url, options = {}) => {
    // Retrieve stored user credentials from sessionStorage
    const storedUser = sessionStorage.getItem("user");
    let authHeaders = {};

    if (storedUser) {
        try {
            const { email, password } = JSON.parse(storedUser);
            authHeaders = {
                Authorization: "Basic " + btoa(`${email}:${password}`)
            };
        } catch (error) {
            console.warn("Failed to parse stored user credentials:", error);
        }
    }

    // Set default headers and merge with options
    const fetchOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders,
            ...(options.headers || {})
        },
        credentials: "include" // Ensures cookies (session-based authentication) are included
    };

    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json(); // Automatically parse JSON response
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Re-throw for handling in the calling function
    }
};

export default fetchInstance;
