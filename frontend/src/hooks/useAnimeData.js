import { useState, useEffect } from 'react';

// Custom hook for fetching anime data
export function useAnimeData(fetchFunction, ...args) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchFunction(...args);
                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [fetchFunction, ...args]);

    return { data, loading, error };
}

// Hook for single anime detail
export function useAnimeDetail(fetchFunction, id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const result = await fetchFunction(id);
                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        }

        if (id) {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, [fetchFunction, id]);

    return { data, loading, error };
}
