import { supabase } from "./supabase";

export async function getActiveTimeSlots(): Promise<string[]> {
  const { data, error } = await supabase
    .from("booking_time_slots")
    .select("time")
    .eq("is_active", true)
    .order("time");

  if (error || !data) {
    console.error("Failed to load time slots:", error);
    return [];
  }

  return data.map((row) => (row.time as string).slice(0, 5));
}

export async function getClosedWeekdays(): Promise<number[]> {
  const { data, error } = await supabase
    .from("restaurant_settings")
    .select("closed_weekdays")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) {
    console.error("Failed to load restaurant settings:", error);
    return [1]; // fall back to the original default (Monday closed)
  }

  return data.closed_weekdays as number[];
}
