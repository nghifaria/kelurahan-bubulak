-- 1. site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  village_name VARCHAR(100) DEFAULT 'Kelurahan Bubulak',
  lurah_name VARCHAR(150),
  office_address TEXT,
  office_photo_url TEXT,
  hero_video_youtube_url TEXT,
  contact_email VARCHAR(100),
  contact_whatsapp VARCHAR(20),
  google_maps_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. news
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) DEFAULT 'Pengumuman',
  content TEXT NOT NULL,
  summary TEXT,
  cover_image_url TEXT NOT NULL,
  documentation_urls JSONB DEFAULT '[]'::jsonb,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  created_by UUID,
  author VARCHAR(150)
);

-- 3. service_types
CREATE TABLE IF NOT EXISTS public.service_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) DEFAULT 'Layanan Kependudukan',
  icon_name VARCHAR(50) DEFAULT 'FileText',
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- 4. submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  service_type_id UUID REFERENCES public.service_types(id) ON DELETE SET NULL,
  citizen_name VARCHAR(150) NOT NULL,
  citizen_nik VARCHAR(16) NOT NULL,
  citizen_whatsapp VARCHAR(20) NOT NULL,
  citizen_email VARCHAR(100),
  notes TEXT,
  attachment_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  status VARCHAR(30) DEFAULT 'PENDING',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. complaints
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  rt_rw_location VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  photo_url TEXT,
  reporter_name VARCHAR(150),
  reporter_whatsapp VARCHAR(20),
  status VARCHAR(30) DEFAULT 'PENDING',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  photo_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. umkm
CREATE TABLE IF NOT EXISTS public.umkm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name VARCHAR(150) NOT NULL,
  category VARCHAR(50) DEFAULT 'Kuliner',
  owner_name VARCHAR(150),
  description TEXT,
  photo_url TEXT,
  whatsapp_contact VARCHAR(20) NOT NULL,
  address TEXT,
  google_maps_url TEXT,
  is_verified BOOLEAN DEFAULT true
);

-- 8. public_places
CREATE TABLE IF NOT EXISTS public.public_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  category VARCHAR(50) DEFAULT 'Pemerintahan',
  address TEXT,
  google_maps_url TEXT NOT NULL,
  description TEXT
);

-- 9. staff_members
CREATE TABLE IF NOT EXISTS public.staff_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  position VARCHAR(100) NOT NULL,
  photo_url TEXT,
  display_order INTEGER DEFAULT 1
);

-- Enable RLS and setup policies for public read/write access
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read news" ON public.news;
CREATE POLICY "Public read news" ON public.news FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public read service_types" ON public.service_types;
CREATE POLICY "Public read service_types" ON public.service_types FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read achievements" ON public.achievements;
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read umkm" ON public.umkm;
CREATE POLICY "Public read umkm" ON public.umkm FOR SELECT USING (is_verified = true);

DROP POLICY IF EXISTS "Public read public_places" ON public.public_places;
CREATE POLICY "Public read public_places" ON public.public_places FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read staff_members" ON public.staff_members;
CREATE POLICY "Public read staff_members" ON public.staff_members FOR SELECT USING (true);

-- PUBLIC SUBMISSIONS & COMPLAINTS POLICIES
DROP POLICY IF EXISTS "Public insert submissions" ON public.submissions;
CREATE POLICY "Public insert submissions" ON public.submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read submissions" ON public.submissions;
CREATE POLICY "Public read submissions" ON public.submissions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert complaints" ON public.complaints;
CREATE POLICY "Public insert complaints" ON public.complaints FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read complaints" ON public.complaints;
CREATE POLICY "Public read complaints" ON public.complaints FOR SELECT USING (true);
