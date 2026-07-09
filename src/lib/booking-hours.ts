// Pure date/time helpers — no DB access. Weekly closed days and bookable
// time slots are configured in the admin panel; see src/lib/booking-settings.ts.

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function weekdayName(day: number): string {
  return WEEKDAY_NAMES[day] ?? "";
}

export function isClosedWeekday(dateStr: string, closedWeekdays: number[]): boolean {
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  return closedWeekdays.includes(day);
}

export function isValidTimeSlot(timeStr: string, activeSlots: string[]): boolean {
  return activeSlots.includes(timeStr.slice(0, 5));
}

export function formatSlotLabel(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function isPastDate(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${dateStr}T00:00:00`);
  return date < today;
}
