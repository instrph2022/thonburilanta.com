# Thonburi Lanta Hospital Website

A high-performance, bilingual Next.js website for Thonburi Lanta Hospital.

## Architecture & Tech Stack
- **Framework**: Next.js 14 (Static HTML Export)
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Hosting**: Plesk (Deployed automatically via GitHub Actions + FTP)

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local` (copy from `.env.example`).

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build and export static files locally:
   ```bash
   npm run build
   ```
