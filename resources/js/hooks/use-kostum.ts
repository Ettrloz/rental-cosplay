import type { Kostum } from '@/data/katalog';
import { Shirt } from 'lucide-react';
import { useEffect, useState } from 'react';

const CACHE_MS = 30_000;
type CachedResponse = { expires: number; data: unknown };

const responseCache = new Map<string, CachedResponse>();
const pendingRequests = new Map<string, Promise<unknown>>();
const storageKey = (url: string) => `rent-cos:api:${url}`;

function readStoredResponse(url: string): CachedResponse | null {
  try {
    const stored = sessionStorage.getItem(storageKey(url));
    if (!stored) return null;

    const cached = JSON.parse(stored) as CachedResponse;
    if (cached.expires <= Date.now()) {
      sessionStorage.removeItem(storageKey(url));
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

function storeResponse(url: string, data: unknown): void {
  const cached = { expires: Date.now() + CACHE_MS, data };
  responseCache.set(url, cached);

  try {
    sessionStorage.setItem(storageKey(url), JSON.stringify(cached));
  } catch {
    // Continue with the in-memory cache when storage is unavailable.
  }
}

function fetchCached(url: string): Promise<unknown> {
  const cached = responseCache.get(url);
  if (cached && cached.expires > Date.now()) {
    return Promise.resolve(cached.data);
  }

  const stored = readStoredResponse(url);
  if (stored) {
    responseCache.set(url, stored);
    return Promise.resolve(stored.data);
  }

  const pending = pendingRequests.get(url);
  if (pending) return pending;

  const request = fetch(url, { headers: { Accept: 'application/json' } })
    .then(res => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
    .then(data => {
      storeResponse(url, data);
      return data;
    })
    .finally(() => {
      pendingRequests.delete(url);
    });

  pendingRequests.set(url, request);
  return request;
}

export type KostumApi = {
  id?: number;
  slug?: string;
  judul: string;
  harga: number;
  rentalDays?: number;
  brand: string;
  series: string;
  karakter: string;
  ukuran: string;
  ld: string;
  lp: string;
  gender: string;
  kota: string;
  cityId?: number | null;
  pemilik: string;
  username: string;
  whatsapp?: string | null;
  instagram?: string | null;
  deskripsi?: string | null;
  status?: string;
  dilihat: number;
  gambar?: string[];
  rental_rules?: string | null;
  rental_rules_image?: string | null;
};

export type PaginasiMeta = {
  current_page: number;
  last_page: number;
  total: number;
};

export function toKostum(item: KostumApi): Kostum {
  const gender = item.gender === 'Pria' ? 'Pria' : item.gender === 'Unisex' ? 'Pria' : 'Wanita';

  return {
    id: item.id,
    slug: item.slug,
    judul: item.judul,
    harga: item.harga,
    rentalDays: item.rentalDays,
    brand: item.brand,
    series: item.series,
    karakter: item.karakter,
    ukuran: item.ukuran,
    ld: item.ld,
    lp: item.lp,
    gender,
    kota: item.kota,
    cityId: item.cityId,
    pemilik: item.pemilik,
    username: item.username,
    whatsapp: item.whatsapp,
    instagram: item.instagram,
    deskripsi: item.deskripsi,
    status: item.status,
    dilihat: item.dilihat,
    icon: Shirt,
    gambar: item.gambar ?? [],
    rental_rules: item.rental_rules,
    rental_rules_image: item.rental_rules_image,
  };
}

export function useKostumList(url: string) {
  const [items, setItems] = useState<Kostum[]>([]);
  const [meta, setMeta] = useState<PaginasiMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;
    setLoading(true);

    fetchCached(url)
      .then(json => {
        if (batal) return;
        const payload = json as { data?: KostumApi[]; meta?: PaginasiMeta };
        setItems((payload.data ?? []).map(toKostum));
        setMeta(payload.meta ?? null);
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
  }, [url]);

  return { items, loading, meta };
}

export function useKostumDetail(slug: string | null) {
  const [item, setItem] = useState<Kostum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let batal = false;

    if (!slug) {
      setItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetchCached(`/api/costumes/${encodeURIComponent(slug)}`)
      .then(json => {
        const payload = json as { data?: KostumApi } | null;
        if (!batal) setItem(payload?.data ? toKostum(payload.data) : null);
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

export type StatsApi = {
  costumes: number;
  cosrents: number;
  cities: number;
  rating: number | null;
};

export function useStats() {
  const [stats, setStats] = useState<StatsApi | null>(null);

  useEffect(() => {
    let batal = false;

    fetch('/api/stats', { headers: { Accept: 'application/json' } })
      .then(res => res.json())
      .then(json => {
        if (!batal) setStats(json.data ?? null);
      })
      .catch(() => {
        // Jika API gagal, angka ditampilkan sebagai "-".
      });

    return () => {
      batal = true;
    };
  }, []);

  return stats;
}
