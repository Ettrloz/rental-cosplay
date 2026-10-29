import type { Thread } from '@/data/forum';
import { useEffect, useState } from 'react';

export function useForumList() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    fetch('/api/forum/threads', { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(json => {
        if (!batal) setThreads((json.data ?? []) as Thread[]);
      })
      .catch(() => {
        // Jika API gagal, daftar thread dibiarkan kosong.
      })
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, []);

  return { threads, loading };
}
