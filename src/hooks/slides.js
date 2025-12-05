import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function useSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("slides")
        .select("*")
        .order("id", { ascending: true }); 

      if (error) {
        setError(error);
        setSlides([]);
      } else {
        setSlides(data);
        setError(null);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  return { slides, loading, error };
}
