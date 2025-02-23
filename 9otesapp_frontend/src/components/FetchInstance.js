const fetchInstance = async (url, options = {}) => {
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

    const fetchOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders,
            ...(options.headers || {})
        },
        credentials: "include"
    };

    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        // Check if the response is JSON or plain text
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse JSON response
        } else {
            return response.text(); // Return plain text (string URL)
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

export default fetchInstance;
