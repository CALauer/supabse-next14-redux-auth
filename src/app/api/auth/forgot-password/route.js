import { getSupabaseRoute } from "../../../../../supabase/supabaseRoute";

export async function POST(request) {
  const supabase = getSupabaseRoute(request);

  const { email } = await request.json();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${request.url}/update-password`,
  });
  if (!error) {
    return Response.json({
      success: true,
      message: "Email sent successfully",
      details: "Check your email for the password reset link",
    });
  }
  return Response.json({
    success: false,
    message: `Something went wrong, sorry`,
  });
}
