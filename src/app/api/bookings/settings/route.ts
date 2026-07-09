import { NextResponse } from "next/server";
import { getActiveTimeSlots, getClosedWeekdays } from "@/lib/booking-settings";

export async function GET() {
  const [timeSlots, closedWeekdays] = await Promise.all([
    getActiveTimeSlots(),
    getClosedWeekdays(),
  ]);

  return NextResponse.json({ timeSlots, closedWeekdays });
}
