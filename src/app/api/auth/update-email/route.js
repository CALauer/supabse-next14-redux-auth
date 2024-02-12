import { getSupabaseRoute } from "../../../../../supabase/supabaseRoute";

export async function POST(request) {
  const supabase = getSupabaseRoute(request);

  const { email } = await request.json();

  const { data, error } = await supabase.auth.updateUser({ email: email });

  if (!error) {
    return Response.json({
      success: true,
      message: "Great, your email was updated!",
      details: `You will use your new email to login from now on.`,
      data,
    });
  } else {
    return Response.json({
      success: false,
      message: `Something went wrong, sorry`,
      details: error.message,
    });
  }
}
