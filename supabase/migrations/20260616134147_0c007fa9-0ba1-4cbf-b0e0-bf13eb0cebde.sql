
CREATE TABLE public.user_builds (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  collection JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_builds TO authenticated;
GRANT ALL ON public.user_builds TO service_role;
ALTER TABLE public.user_builds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner can read" ON public.user_builds FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner can insert" ON public.user_builds FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner can update" ON public.user_builds FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner can delete" ON public.user_builds FOR DELETE TO authenticated USING (auth.uid() = user_id);
