import { useState } from 'react';

//custom hook to call an async function and get the result
const useFetch = (cb, options = {}) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
        const response = await cb(options, ...args);
        setData(response);
        } catch (error) {
        setError(error);
        } finally {
        setLoading(false);
        }
    };
    
  
    
    return { data, error, loading, fn };
    }


    export default useFetch;

    