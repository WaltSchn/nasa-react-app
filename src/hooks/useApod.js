import { useState, useEffect, useCallback } from "react";

const API_URL = "https://api.nasa.gov/planetary/apod";

export default function useApod(initialDate = new Date()) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  // Função memoizada para evitar warnings do ESLint
  const fetchApodByDate = useCallback(async (date) => {
    setLoading(true);
    setError(null);
    try {
      const formattedDate = date.toISOString().slice(0, 10);
      const res = await fetch(`${API_URL}?api_key=${API_KEY}&date=${formattedDate}`);
      if (!res.ok) throw new Error("Failed to fetch APOD");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchApodByDate(initialDate);
  }, [initialDate, fetchApodByDate]);

  return { data, loading, error, fetchApodByDate };
}
