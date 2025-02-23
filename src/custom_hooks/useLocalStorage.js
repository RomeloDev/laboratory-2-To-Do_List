import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    // useState initializes the state by checking if there's a saved value in localStorage
    const [storedValue, setStoredValue] = useState(() =>{
        const saved = window.localStorage.getItem(key); // Get item from localStorage
        return saved ? JSON.parse(saved) : initialValue; // Parse JSON if found, otherwise use initialValue
    });

    // useEffect runs whenever storedValue changes
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storedValue)); // Update localStorage with new value
    }, [storedValue]); // Dependency array ensures effect runs only when storedValue updates

    return [storedValue, setStoredValue] // Return state and setter function to be used in components
}