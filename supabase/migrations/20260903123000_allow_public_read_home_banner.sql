-- Add public read policy to system_settings for specific keys

DROP POLICY IF EXISTS "Enable public read access for home_hero_banner" ON public.system_settings;
CREATE POLICY "Enable public read access for home_hero_banner" ON public.system_settings FOR SELECT USING (key = 'home_hero_banner');

-- Add insert/update policy for admins just in case it's not broad enough
-- The previous migration had "Enable all access for authenticated users only"
