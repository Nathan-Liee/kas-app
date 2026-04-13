import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useRealtime = (tableName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tableName) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const { data: initialData, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (!isMounted) return;

      if (fetchError) {
        console.error('Gagal fetch data:', fetchError.message);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setData(initialData || []);
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel(`live-${tableName}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        (payload) => {
          if (!isMounted) return;
          if (payload.eventType === 'INSERT') {
            setData((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === 'DELETE') {
            setData((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  return { data, loading, error };
};