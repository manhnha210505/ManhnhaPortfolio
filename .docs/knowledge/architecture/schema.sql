-- ManhnhaPortfolio — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query).
-- All content tables are public-read-only. Editing happens via Table Editor
-- (owner login), never through the public anon API key. See ADR-0006.

create extension if not exists "pgcrypto"; -- for gen_random_uuid()

-- ============================================================
-- profile (singleton — expect exactly 1 row)
-- ============================================================
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  display_name text,
  tagline text,
  bio text,
  email text,
  github_url text,
  linkedin_url text,
  location text,
  career_goal text,
  short_term_goal text,
  long_term_goal text,
  target_company_type text,
  hobbies text,
  show_hobbies boolean not null default true,
  avatar_url text,
  resume_url text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- education
-- ============================================================
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  major text,
  start_date date,
  end_date date, -- null = ongoing
  gpa text,
  highlights text[], -- notable courses / thesis / capstone
  sort_order int not null default 0
);

-- ============================================================
-- skills
-- ============================================================
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in (
    'data_science', 'machine_learning', 'data_visualization', 'mlops',
    'backend', 'cloud', 'languages', 'frameworks', 'tools'
  )),
  name text not null,
  is_core boolean not null default false, -- true = one of the 4 core areas (DS/ML/DataViz/MLOps)
  sort_order int not null default 0
);

-- ============================================================
-- projects
-- ============================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text,          -- short card/preview copy
  problem text,           -- long-form case study body
  approach text,
  impact text,
  role text,               -- e.g. "Team Leader"
  is_team_project boolean not null default false,
  team_size int,
  repo_url text,
  demo_url text,
  cover_image_url text,     -- Cloudflare R2 URL
  tags text[],
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- certificates
-- ============================================================
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text,
  issued_date date,
  credential_url text,
  sort_order int not null default 0
);

-- ============================================================
-- activities
-- ============================================================
create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  role text,
  start_date date,
  end_date date,
  description text,
  sort_order int not null default 0
);

-- ============================================================
-- awards
-- ============================================================
create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  awarded_date date,
  description text,
  sort_order int not null default 0
);

-- ============================================================
-- contacts (from the contact form — write-only for visitors)
-- ============================================================
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

-- Content tables: public can SELECT, nobody (anon/authenticated) can write.
-- Writes happen only via the Supabase Dashboard Table Editor (owner session,
-- bypasses RLS) — see ADR-0006. No INSERT/UPDATE/DELETE policy is created
-- for these tables on purpose.

alter table profile enable row level security;
create policy "public read profile" on profile for select to anon using (true);

alter table education enable row level security;
create policy "public read education" on education for select to anon using (true);

alter table skills enable row level security;
create policy "public read skills" on skills for select to anon using (true);

alter table projects enable row level security;
create policy "public read published projects" on projects for select to anon using (published = true);

alter table certificates enable row level security;
create policy "public read certificates" on certificates for select to anon using (true);

alter table activities enable row level security;
create policy "public read activities" on activities for select to anon using (true);

alter table awards enable row level security;
create policy "public read awards" on awards for select to anon using (true);

-- contacts: public can INSERT only, nobody can SELECT (privacy — visitors
-- must not be able to read other people's submitted messages).
alter table contacts enable row level security;
create policy "public can submit contact form" on contacts for insert to anon with check (true);
