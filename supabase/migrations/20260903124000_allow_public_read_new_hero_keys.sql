-- Add public read policy to system_settings for new hero keys

DROP POLICY IF EXISTS "Enable public read access for hero keys" ON public.system_settings;
CREATE POLICY "Enable public read access for hero keys" ON public.system_settings FOR SELECT USING (
  key IN ('home_hero_banner', 'home_hero_mode', 'home_hero_image_only_landscape', 'home_hero_image_only_portrait')
);
