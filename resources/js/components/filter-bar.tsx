import { Dropdown } from '@/components/dropdown';
import { MOCK_KOSTUM, UKURAN } from '@/data/katalog';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

export type FilterState = {
  provinsi: string;
  kota: string;
  gender: 'Semua' | 'Wanita' | 'Pria';
  ukuran: string;
  urutan: 'Terbaru' | 'Harga Terendah' | 'Harga Tertinggi' | 'Paling Banyak Dilihat';
};

export const FILTER_AWAL: FilterState = {
  provinsi: 'Semua Provinsi',
  kota: 'Semua Kota',
  gender: 'Semua',
  ukuran: 'Semua',
  urutan: 'Terbaru'
};

function parseKota(kota: string) {
  const [kabupaten, ...rest] = kota.split(', ');
  return { kota: kabupaten, provinsi: rest.join(', ') };
}

export function getFilterOptions() {
  const provinsi = [...new Set(MOCK_KOSTUM.map(item => parseKota(item.kota).provinsi))].sort();
  const kota = [...new Set(MOCK_KOSTUM.map(item => parseKota(item.kota).kota))].sort();
  return { provinsi, kota };
}

type ProvinsiApi = { id: number; name: string };
type KotaApi = { id: number; province_id: number; name: string };

export function useLokasiOptions(provinsiDipilih: string) {
  const [provinsiList, setProvinsiList] = useState<ProvinsiApi[]>([]);
  const [kotaList, setKotaList] = useState<KotaApi[]>([]);

  useEffect(() => {
    let batal = false;
    const opsi = { headers: { Accept: 'application/json' } };

    Promise.all([
      fetch('/api/provinces', opsi).then(res => res.json()),
      fetch('/api/cities', opsi).then(res => res.json())
    ])
      .then(([provinsi, kota]) => {
        if (batal) return;
        setProvinsiList(provinsi.data ?? []);
        setKotaList(kota.data ?? []);
      })
      .catch(() => {
        // Jika API gagal, dropdown tetap hanya berisi pilihan "Semua".
      });

    return () => {
      batal = true;
    };
  }, []);

  const provinsi = useMemo(() => provinsiList.map(item => item.name), [provinsiList]);

  const kota = useMemo(() => {
    const dipilih = provinsiList.find(item => item.name === provinsiDipilih);
    const sumber = dipilih ? kotaList.filter(item => item.province_id === dipilih.id) : kotaList;
    return [...new Set(sumber.map(item => item.name))];
  }, [provinsiList, kotaList, provinsiDipilih]);

  return { provinsi, kota };
}

export const GENDER_OPTIONS = ['Semua', 'Wanita', 'Pria'] as const;

export const URUTAN_OPTIONS = [
  'Terbaru',
  'Harga Terendah',
  'Harga Tertinggi',
  'Paling Banyak Dilihat'
] as const;

export function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return <Dropdown label={label} value={value} options={options} onChange={onChange} />;
}

export function FilterBar({
  value,
  onChange
}: {
  value: FilterState;
  onChange: (filter: FilterState) => void;
}) {
  const { provinsi, kota } = useLokasiOptions(value.provinsi);

  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="Provinsi"
          value={value.provinsi}
          options={['Semua Provinsi', ...provinsi]}
          onChange={setProvinsi => set({ provinsi: setProvinsi, kota: FILTER_AWAL.kota })}
        />
        <FilterSelect
          label="Kota"
          value={value.kota}
          options={['Semua Kota', ...kota]}
          onChange={setKota => set({ kota: setKota })}
        />
        <FilterSelect
          label="Gender"
          value={value.gender}
          options={GENDER_OPTIONS}
          onChange={setGender => set({ gender: setGender as FilterState['gender'] })}
        />
        <FilterSelect
          label="Urutan"
          value={value.urutan}
          options={URUTAN_OPTIONS}
          onChange={setUrutan => set({ urutan: setUrutan as FilterState['urutan'] })}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[12.5px] font-semibold text-faint">Ukuran:</span>
        <button
          type="button"
          onClick={() => set({ ukuran: 'Semua' })}
          className={clsx(
            'rounded-lg px-2.5 py-1.5 text-[12.5px] font-bold transition-colors',
            value.ukuran === 'Semua' ? 'bg-accent text-white' : 'bg-chip text-muted hover:bg-chip3'
          )}
        >
          Semua
        </button>
        {UKURAN.map(ukuran => (
          <button
            key={ukuran}
            type="button"
            onClick={() => set({ ukuran })}
            className={clsx(
              'rounded-lg px-2.5 py-1.5 text-[12.5px] font-bold transition-colors',
              value.ukuran === ukuran ? 'bg-accent text-white' : 'bg-chip text-muted hover:bg-chip3'
            )}
          >
            {ukuran}
          </button>
        ))}
      </div>
    </div>
  );
}
