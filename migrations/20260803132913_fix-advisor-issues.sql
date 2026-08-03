-- 1. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_umkm_is_verified ON public.umkm (is_verified);
CREATE INDEX IF NOT EXISTS idx_submissions_service_type_id ON public.submissions (service_type_id);
CREATE INDEX IF NOT EXISTS idx_news_is_published ON public.news (is_published);

-- 2. Clean Up Old Policies on All 9 Tables
DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public read news" ON public.news;
DROP POLICY IF EXISTS "Public read service_types" ON public.service_types;
DROP POLICY IF EXISTS "Public read achievements" ON public.achievements;
DROP POLICY IF EXISTS "Public read umkm" ON public.umkm;
DROP POLICY IF EXISTS "Public read public_places" ON public.public_places;
DROP POLICY IF EXISTS "Public read staff_members" ON public.staff_members;
DROP POLICY IF EXISTS "Public insert submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public read submissions" ON public.submissions;
DROP POLICY IF EXISTS "Public read submissions by ticket or nik" ON public.submissions;
DROP POLICY IF EXISTS "Public insert complaints" ON public.complaints;
DROP POLICY IF EXISTS "Public read complaints" ON public.complaints;

DROP POLICY IF EXISTS "Authenticated full control site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated full control news" ON public.news;
DROP POLICY IF EXISTS "Authenticated full control service_types" ON public.service_types;
DROP POLICY IF EXISTS "Authenticated full control submissions" ON public.submissions;
DROP POLICY IF EXISTS "Authenticated full control complaints" ON public.complaints;
DROP POLICY IF EXISTS "Authenticated full control achievements" ON public.achievements;
DROP POLICY IF EXISTS "Authenticated full control umkm" ON public.umkm;
DROP POLICY IF EXISTS "Authenticated full control public_places" ON public.public_places;
DROP POLICY IF EXISTS "Authenticated full control staff_members" ON public.staff_members;

-- 3. Authenticated Full Control Policies (ALL Operations for Admin/Staff Role)
CREATE POLICY "Authenticated full control site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control service_types" ON public.service_types FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control submissions" ON public.submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control complaints" ON public.complaints FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control achievements" ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control umkm" ON public.umkm FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control public_places" ON public.public_places FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full control staff_members" ON public.staff_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Specific Public (Anon) Policies
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read news" ON public.news FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Public read service_types" ON public.service_types FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read umkm" ON public.umkm FOR SELECT TO anon, authenticated USING (is_verified = true);
CREATE POLICY "Public read public_places" ON public.public_places FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read staff_members" ON public.staff_members FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert submissions" ON public.submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public read submissions" ON public.submissions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert complaints" ON public.complaints FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public read complaints" ON public.complaints FOR SELECT TO anon, authenticated USING (true);
