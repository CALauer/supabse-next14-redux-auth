"use server";
import { getSupabaseRoute } from "../../../supabase/supabaseRoute";

export default async function CheckSession() {
  const supabase = getSupabaseRoute();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return { success: false, error };
  } else if (data.session) {
    return { success: true, data };
  } else {
    return { success: false, data };
  }
}
