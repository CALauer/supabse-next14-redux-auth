import { getSupabaseRoute } from "../../../../../supabase/supabaseRoute";

export async function POST(request) {
  const supabase = getSupabaseRoute(request);

  const { password, type } = await request.json();
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (!error & !type) {
    return Response.json({
      success: true,
      message: "Great, your password was updated!",
      details: `Log back in using your new password.`,
      data,
    });
  } else if (!error & (type === "account")) {
    return Response.json({
      success: true,
      message: "Great, your password was updated!",
      details: `Make sure you dont forget it!`,
      data,
    });
  }
  return Response.json({
    success: false,
    message: `Something went wrong, sorry`,
    details: error.message,
  });
}
