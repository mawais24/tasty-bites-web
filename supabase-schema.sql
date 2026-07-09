-- ══════════════════════════════════════════════════════
-- Tasty Bites — Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ══════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ── Menu Categories ────────────────────────────────────
create table if not exists menu_categories (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  tab_label     text,
  description   text,
  note          text,
  highlight     boolean not null default false,
  flavours      jsonb,
  display_order int not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Menu Items ──────────────────────────────────────────
create table if not exists menu_items (
  id            uuid primary key default uuid_generate_v4(),
  category_id   uuid not null references menu_categories(id) on delete cascade,
  name          text not null,
  description   text,
  price         numeric(10,2) not null default 0,
  price_display text,
  badge         text check (badge in ('popular','chef-special','new','signature')),
  dietary       jsonb not null default '[]',
  image_url     text,
  is_featured   boolean not null default false,
  display_order int not null default 0,
  is_available  boolean not null default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Bookings (table reservations) ──────────────────────
create table if not exists bookings (
  id               uuid primary key default uuid_generate_v4(),
  name             text not null,
  email            text not null,
  phone            text not null,
  booking_date     date not null,
  booking_time     time not null,
  party_size       int not null,
  special_requests text,
  status           text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── Per-date booking overrides ─────────────────────────
-- No row for a date = normal auto-confirm behaviour.
create table if not exists booking_date_overrides (
  id         uuid primary key default uuid_generate_v4(),
  date       date not null unique,
  mode       text not null check (mode in ('manual','fully_booked')),
  note       text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Row Level Security ─────────────────────────────────
alter table menu_categories        enable row level security;
alter table menu_items             enable row level security;
alter table bookings               enable row level security;
alter table booking_date_overrides enable row level security;

-- Public (anon key) can read active menu data and date overrides
create policy "public read active categories" on menu_categories        for select using (is_active = true);
create policy "public read available items"   on menu_items             for select using (is_available = true);
create policy "public read date overrides"    on booking_date_overrides for select using (true);

-- Bookings have no public read policy (contain customer PII) — only
-- reachable via the service-role key from server-side API routes.

-- Authenticated (admin) users can fully manage everything
create policy "admin manage categories"      on menu_categories        for all using (auth.role() = 'authenticated');
create policy "admin manage items"           on menu_items             for all using (auth.role() = 'authenticated');
create policy "admin manage bookings"        on bookings               for all using (auth.role() = 'authenticated');
create policy "admin manage date overrides"  on booking_date_overrides for all using (auth.role() = 'authenticated');

-- ── Storage bucket for menu item images ────────────────
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

create policy "public read menu images" on storage.objects
  for select using (bucket_id = 'menu-images');

create policy "admin manage menu images" on storage.objects
  for all using (bucket_id = 'menu-images' and auth.role() = 'authenticated');
