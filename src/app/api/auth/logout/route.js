import { getSupabaseRoute } from "../../../../../supabase/supabaseRoute";

export async function POST(request) {
  const supabase = getSupabaseRoute(request);
  const { error } = await supabase.auth.signOut();

  if (!error) {
    return Response.json({ success: true });
  }
  return Response.json({ error: error.message });
}
