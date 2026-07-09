-- ══════════════════════════════════════════════════════
-- Tasty Bites — Schema v2: configurable time slots, weekly
-- closed days, and holiday-style date closures.
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- (Run AFTER supabase-schema.sql)
-- ══════════════════════════════════════════════════════

-- ── Admin-managed booking time slots ───────────────────
create table if not exists booking_time_slots (
  id            uuid primary key default uuid_generate_v4(),
  time          time not null unique,
  display_order int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz default now()
);

alter table booking_time_slots enable row level security;

create policy "public read active time slots" on booking_time_slots
  for select using (is_active = true);

create policy "admin manage time slots" on booking_time_slots
  for all using (auth.role() = 'authenticated');

-- Seed with the previous default hours (4:00 PM – 11:30 PM, 30 min apart)
-- so nothing changes until the admin customises them.
insert into booking_time_slots (time, display_order) values
  ('16:00', 1), ('16:30', 2), ('17:00', 3), ('17:30', 4),
  ('18:00', 5), ('18:30', 6), ('19:00', 7), ('19:30', 8),
  ('20:00', 9), ('20:30', 10), ('21:00', 11), ('21:30', 12),
  ('22:00', 13), ('22:30', 14), ('23:00', 15), ('23:30', 16)
on conflict (time) do nothing;

-- ── Restaurant-wide settings (singleton row) ───────────
create table if not exists restaurant_settings (
  id              int primary key default 1,
  closed_weekdays jsonb not null default '[1]'::jsonb, -- 0=Sun … 6=Sat; default Monday
  updated_at      timestamptz default now(),
  constraint restaurant_settings_singleton check (id = 1)
);

alter table restaurant_settings enable row level security;

create policy "public read restaurant settings" on restaurant_settings
  for select using (true);

create policy "admin manage restaurant settings" on restaurant_settings
  for all using (auth.role() = 'authenticated');

insert into restaurant_settings (id, closed_weekdays)
values (1, '[1]'::jsonb)
on conflict (id) do nothing;

-- ── Extend booking_date_overrides with a "closed" mode ─
-- (holiday-style closure with a reason, distinct from "fully_booked")
alter table booking_date_overrides drop constraint if exists booking_date_overrides_mode_check;
alter table booking_date_overrides add constraint booking_date_overrides_mode_check
  check (mode in ('manual', 'fully_booked', 'closed'));
