export async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("UserDatabase", 1);

        request.onupgradeneeded = (event) => {
            let db = event.target.result;
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", { keyPath: "email" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject("Database error: " + event.target.error);
    });
}


export async function signupUser(username, email, password) {
    try {
        const db = await openDB();
        const transaction = db.transaction("users", "readwrite");
        const store = transaction.objectStore("users");

        return new Promise((resolve, reject) => {
            const getRequest = store.get(email);
            
            getRequest.onsuccess = () => {
                if (getRequest.result) {
                    reject("User already exists! Please log in.");
                } else {
                    const addRequest = store.add({ username, email, password });
                    addRequest.onsuccess = () => resolve("Signup successful!");
                    addRequest.onerror = () => reject("Error signing up.");
                }
            };
            getRequest.onerror = () => reject("Error accessing IndexedDB.");
        });
    } catch (error) {
        throw new Error("Failed to access database.");
    }
}


export async function loginUser(email, password) {
    try {
        const db = await openDB();
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");

        return new Promise((resolve, reject) => {
            const getRequest = store.get(email);

            getRequest.onsuccess = () => {
                const user = getRequest.result;
                if (user && user.password === password) {
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("email", user.email);
                    resolve({ message: "Login successful!", username: user.username });
                } else {
                    reject("Invalid email or password.");
                }
            };
            getRequest.onerror = () => reject("Error accessing IndexedDB.");
        });
    } catch (error) {
        throw new Error("Failed to access database.");
    }
}
