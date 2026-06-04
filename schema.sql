-- Create inquiries table
create table inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  phone text,
  email text,
  channel text default 'web_form', -- 'web_form' | 'facebook' | 'line' | 'walk_in' | 'phone'
  service_interest text not null, -- 'general' | 'dive_package' | 'health_check' | 'emergency' | 'insurance' | 'resort_partnership'
  message text,
  language text default 'th', -- 'th' | 'en'
  status text default 'new' -- 'new' | 'contacted' | 'booked' | 'closed'
);

-- Enable Row Level Security (RLS)
alter table inquiries enable row level security;

-- Policy 1: Anyone (public) can insert an inquiry
create policy "public can insert"
  on inquiries for insert
  with check (true);

-- Policy 2: Authenticated administrators can read all inquiries
create policy "admin can read all"
  on inquiries for select
  using (auth.role() = 'authenticated');

-- Policy 3: Authenticated administrators can update any inquiry (to manage status)
create policy "admin can update all"
  on inquiries for update
  using (auth.role() = 'authenticated');
