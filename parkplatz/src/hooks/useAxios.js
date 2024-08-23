import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const useAxios = (url, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Cambiado a false inicialmente
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                setError(new Error('URL no proporcionada'));
                return;
            }
            setLoading(true);
            try {
                const response = await axiosInstance.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
};

export default useAxios;
