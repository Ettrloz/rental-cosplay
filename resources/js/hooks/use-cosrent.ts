import type { Cosrent } from '@/data/cosrent';
import { useEffect, useState } from 'react';

type CosrentApi = {
  nama: string;
  username: string;
  kota: string;
  post: number;
  online: string;
  foto: string;
  thumbnail: string | null;
  bio: string | null;
  deskripsi: string;
  rating: number;
  ulasanCount: number;
  pengikut: number;
  tokoDibuka: string;
  jamOperasional: string;
  terverifikasi: boolean;
};

export function toCosrent(item: CosrentApi): Cosrent {
  return {
    nama: item.nama,
    username: item.username,
    kota: item.kota,
    post: item.post,
    online: item.online,
    foto: item.foto,
    thumbnail: item.thumbnail,
    bio: item.bio,
    deskripsi: item.deskripsi,
    rating: item.rating,
    ulasanCount: item.ulasanCount,
    pengikut: item.pengikut,
    tokoDibuka: item.tokoDibuka,
    jamOperasional: item.jamOperasional,
    terverifikasi: item.terverifikasi,
    review: []
  };
}

export function useCosrentList() {
  const [items, setItems] = useState<Cosrent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    fetch('/api/cosrents', { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(json => {
        if (!batal) setItems((json.data ?? []).map(toCosrent));
      })
      .catch(() => {
        // Jika API gagal, daftar dibiarkan kosong.
      })
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, []);

  return { items, loading };
}

export function useCosrentDetail(username: string) {
  const [item, setItem] = useState<Cosrent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    fetch(`/api/cosrents/${encodeURIComponent(username)}`, {
      headers: { Accept: 'application/json' }
    })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (!batal && json?.data) setItem(toCosrent(json.data));
      })
      .catch(() => {})
      .finally(() => {
        if (!batal) setLoading(false);
      });

    return () => {
      batal = true;
    };
  }, [username]);

  return { item, loading };
}
