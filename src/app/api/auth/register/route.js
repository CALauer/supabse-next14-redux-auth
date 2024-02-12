import { getSupabaseRoute } from "../../../../../supabase/supabaseRoute";
export async function POST(request) {
  const supabase = getSupabaseRoute(request);

  const { email, password } = await request.json();
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (!error) {
    return Response.json({
      success: true,
      session: data.session,
      message: "Account created successfully!",
      details: "Verify your email to login.",
    });
  }
  return Response.json({
    success: false,
    message: `Hmm... something went wrong.`,
    details: error.message,
  });
}
