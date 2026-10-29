import type { JadwalEvent } from '@/data/event';
import { useEffect, useState } from 'react';

type EventApi = {
  id?: number;
  ownerId?: number | null;
  judul: string;
  tanggal: string;
  penyelenggara: string;
  lokasi: string;
  venue: string;
  jam: string;
  harga: string;
  isi: string;
  gambar: string;
};

export function toEvent(item: EventApi): JadwalEvent {
  return {
    id: item.id ?? null,
    judul: item.judul,
    tanggal: item.tanggal,
    penyelenggara: item.penyelenggara,
    lokasi: item.lokasi,
    venue: item.venue,
    jam: item.jam,
    harga: item.harga,
    isi: item.isi,
    gambar: item.gambar,
    komentar: [],
    ownerId: item.ownerId ?? null
  };
}

export function useEventList() {
  const [items, setItems] = useState<JadwalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    fetch('/api/events', { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(json => {
        if (!batal) setItems((json.data ?? []).map(toEvent));
      })
      .catch(() => {})
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, []);

  return { items, loading };
}

export function useEventDetail(slug: string | null) {
  const [item, setItem] = useState<JadwalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    if (!slug) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`/api/events/${encodeURIComponent(slug)}`, { headers: { Accept: 'application/json' } })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (!batal) setItem(json?.data ? toEvent(json.data) : null);
      })
      .catch(() => {
        if (!batal) setItem(null);
      })
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, [slug]);

  return { item, loading };
}
