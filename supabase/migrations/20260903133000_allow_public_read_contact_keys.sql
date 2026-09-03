-- Add public read policy to system_settings for contact info keys

DROP POLICY IF EXISTS "Enable public read access for contact keys" ON public.system_settings;
CREATE POLICY "Enable public read access for contact keys" ON public.system_settings FOR SELECT USING (
  key IN ('company_address', 'company_phone', 'company_fb', 'company_zalo', 'company_email')
);
