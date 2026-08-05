-- Add overview text, boundaries, and demographic statistics columns to site_settings
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS overview_text TEXT DEFAULT 'Merupakan salah satu Kelurahan dari 16 Kelurahan yang ada di wilayah Kecamatan Bogor Barat dan merupakan wilayah dataran 368 meter diatas permukaan laut, dengan luas Kurang Lebih 157,085 Ha. dengan jumlah Ketua RT Sebanyak 50 dan Ketua RW Sebanyak 13.',
  ADD COLUMN IF NOT EXISTS boundary_north VARCHAR(150) DEFAULT 'Kelurahan Semplak',
  ADD COLUMN IF NOT EXISTS boundary_south VARCHAR(150) DEFAULT 'Kelurahan Margajaya dan Balumbangjaya',
  ADD COLUMN IF NOT EXISTS boundary_west VARCHAR(150) DEFAULT 'Kelurahan Situgede',
  ADD COLUMN IF NOT EXISTS boundary_east VARCHAR(150) DEFAULT 'Kelurahan Sindang Barang',
  ADD COLUMN IF NOT EXISTS total_population INTEGER DEFAULT 18724,
  ADD COLUMN IF NOT EXISTS total_kk INTEGER DEFAULT 5732,
  ADD COLUMN IF NOT EXISTS male_population INTEGER DEFAULT 9519,
  ADD COLUMN IF NOT EXISTS female_population INTEGER DEFAULT 9205,
  ADD COLUMN IF NOT EXISTS rt_count INTEGER DEFAULT 50,
  ADD COLUMN IF NOT EXISTS rw_count INTEGER DEFAULT 13,
  ADD COLUMN IF NOT EXISTS area_size VARCHAR(50) DEFAULT '157,085 Ha',
  ADD COLUMN IF NOT EXISTS altitude VARCHAR(50) DEFAULT '368 mdpl';
