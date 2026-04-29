-- ============================================================
--  보드게임 LFG — Supabase DB 설정
--  Supabase 대시보드 > SQL Editor 에서 전체 실행
-- ============================================================

-- ── 1. profiles ──────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text,
  avatar_url  text,
  updated_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles: 누구나 조회"   on public.profiles for select using (true);
create policy "profiles: 본인만 수정"   on public.profiles for update using (auth.uid() = id);
create policy "profiles: 본인만 삽입"   on public.profiles for insert with check (auth.uid() = id);

-- ── 2. rooms ─────────────────────────────────────────────────
create table if not exists public.rooms (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  game_name   text,
  category    text not null
                check (category in ('boardgame_cafe','private','tabletop_sim','bga','steam')),
  description text,
  max_players int  not null default 4
                check (max_players between 2 and 20),
  host_id     uuid not null references public.profiles(id) on delete cascade,
  status      text not null default 'open'
                check (status in ('open','closed')),
  created_at  timestamptz default now()
);

alter table public.rooms enable row level security;

create policy "rooms: 누구나 조회"      on public.rooms for select using (true);
create policy "rooms: 로그인 유저 생성" on public.rooms for insert with check (auth.uid() = host_id);
create policy "rooms: 호스트만 수정"    on public.rooms for update using (auth.uid() = host_id);
create policy "rooms: 호스트만 삭제"    on public.rooms for delete using (auth.uid() = host_id);

-- ── 3. room_members ──────────────────────────────────────────
create table if not exists public.room_members (
  id        uuid primary key default gen_random_uuid(),
  room_id   uuid not null references public.rooms(id)    on delete cascade,
  user_id   uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  unique (room_id, user_id)
);

alter table public.room_members enable row level security;

create policy "room_members: 누구나 조회"      on public.room_members for select using (true);
create policy "room_members: 로그인 유저 참여" on public.room_members for insert with check (auth.uid() = user_id);
create policy "room_members: 본인만 나가기"    on public.room_members for delete using (auth.uid() = user_id);

-- ── 4. messages ──────────────────────────────────────────────
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  room_id    uuid not null references public.rooms(id)    on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  content    text not null check (char_length(content) between 1 and 500),
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "messages: 누구나 조회"       on public.messages for select using (true);
create policy "messages: 로그인 유저 전송"  on public.messages for insert with check (auth.uid() = user_id);

-- ── 5. 회원가입 시 자동으로 profile 생성 ────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 6. Realtime 활성화 ───────────────────────────────────────
-- 아래가 실패하면 대시보드 > Database > Replication 에서 직접 활성화하세요
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.room_members;
alter publication supabase_realtime add table public.messages;

-- ============================================================
--  Google OAuth 설정 (Supabase 대시보드에서 진행)
--  1. Authentication > Providers > Google 활성화
--  2. Google Cloud Console에서 OAuth 클라이언트 ID/Secret 발급
--  3. Supabase 대시보드 > Authentication > URL Configuration 에서
--     Site URL = 서비스 도메인 추가
--     Redirect URLs = 서비스 도메인 추가 (로컬: http://localhost:포트)
-- ============================================================
