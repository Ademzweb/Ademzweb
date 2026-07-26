# Ademzweb — Cybersecurity Company Website

A premium, modern website for **Ademzweb** cybersecurity services. Built with Next.js, designed for easy editing — **no coding knowledge required** to update text, colors, or content.

---

## Quick Start

### 1. Install dependencies

Open a terminal in this folder and run:

```
npm install
```

### 2. Start the development server

```
npm run dev
```

### 3. Open your browser

Go to: **http://localhost:3000**

You should see your website running locally. Any changes you make to content files will appear automatically after you save the file.

---

## Where Is the Text Stored?

**All editable text lives in two places:**

### `/content` folder — Section text

| File | What you can edit |
|------|-------------------|
| `hero.ts` | Homepage headline, subheadline, button text |
| `services.ts` | All service cards (title, description) |
| `company.ts` | About section, mission, vision, values, timeline |
| `why-us.ts` | "Why Choose Us" feature cards |
| `process.ts` | Process steps (Discovery → Verification) |
| `stats.ts` | Statistics numbers and labels |
| `testimonials.ts` | Client testimonials and ratings |
| `faq.ts` | FAQ questions and answers |
| `contact.ts` | Contact form labels and messages |
| `navigation.ts` | Menu link labels |
| `footer.ts` | Footer description and service links |

### `/config/site.ts` — Site-wide settings

| Setting | What it controls |
|---------|------------------|
| `name` | Company name (appears everywhere) |
| `tagline` | Tagline in browser tab and SEO |
| `phone` | Phone number across the site |
| `email` | Email address across the site |
| `address` | Office address |
| `social` | LinkedIn, Twitter, GitHub links |
| `logo` | Logo file path |
| `theme` | All website colors |
| `url` | Your website URL (for SEO) |

---

## How to Edit Text (Step by Step)

1. Open the project folder in **Cursor**, **VS Code**, or any text editor.
2. Navigate to the `/content` folder.
3. Open the file you want to edit (e.g., `hero.ts`).
4. Find the text you want to change — it's inside quotation marks `"like this"`.
5. Change the text, save the file (Ctrl+S or Cmd+S).
6. Refresh your browser — the change appears instantly.

**Example — changing the hero headline:**

Open `content/hero.ts` and find:

```
headline: "Protecting Businesses Against Modern Cyber Threats.",
```

Change it to whatever you want:

```
headline: "Your New Headline Here.",
```

Save the file. Done!

---

## How to Change Colors

Open `config/site.ts` and find the `theme` section:

```
theme: {
  background: "#030712",    // Main background (near black)
  surface: "#0a0f1e",       // Card/section backgrounds (deep navy)
  primary: "#2563eb",       // Primary blue
  accent: "#06b6d4",        // Cyan accent color
  text: "#f9fafb",          // Main text (white)
  textMuted: "#9ca3af",     // Secondary text (gray)
}
```

Change any hex color code (the `#` followed by 6 characters) to your preferred color. Save the file and refresh.

**Tip:** Use [coolors.co](https://coolors.co) to pick color palettes.

---

## How to Add a New Service

1. Open `content/services.ts`.
2. Scroll to the `services` list.
3. Copy an existing service block (everything from `{` to `},`).
4. Paste it below the last service.
5. Change these fields:
   - `id` — a unique short name (e.g., `"red-team"`)
   - `icon` — an icon name from [lucide.dev/icons](https://lucide.dev/icons) (e.g., `"Shield"`)
   - `title` — the service name
   - `description` — what the service does

**Example:**

```
{
  id: "red-team",
  icon: "Shield",
  title: "Red Team Operations",
  description: "Full-scope adversary simulation to test your organization's detection and response capabilities.",
},
```

6. If you use a new icon name, also add it in `lib/icons.ts` (ask a developer for help with this one step).

Save and refresh.

---

## How to Add a Testimonial

1. Open `content/testimonials.ts`.
2. Copy an existing testimonial block.
3. Paste it at the end of the list.
4. Update:
   - `id` — unique number (e.g., `"6"`)
   - `name` — client's name
   - `company` — their company
   - `role` — their job title
   - `feedback` — their quote
   - `rating` — number from 1 to 5

Save and refresh.

---

## How to Change the Logo

1. Create or export your logo as **SVG** (best) or **PNG**.
2. Place the file in the `/public` folder (e.g., `public/logo.svg`).
3. Open `config/site.ts` and update:

```
logo: {
  src: "/logo.svg",        // Your filename here
  alt: "Ademzweb Logo",    // Description for accessibility
  width: 140,
  height: 40,
},
```

Save and refresh.

---

## How to Change Contact Information

Open `config/site.ts` and edit:

```
phone: "+1 (555) 123-4567",
email: "contact@ademzweb.com",
address: {
  street: "100 Security Boulevard, Suite 500",
  city: "San Francisco",
  ...
},
```

Also update the Google Maps embed:
1. Go to [Google Maps](https://maps.google.com).
2. Search for your address.
3. Click **Share** → **Embed a map**.
4. Copy the `src` URL from the iframe code.
5. Paste it in `mapEmbedUrl` in `config/site.ts`.

---

## How to Deploy to Vercel (Free Hosting)

Vercel is the recommended hosting platform for Next.js websites. It's free for personal and small business sites.

### Step 1: Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2: Upload your project to GitHub
1. Create a new repository on GitHub.
2. Upload all project files (or use Git — ask a developer for help).

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (use your GitHub account).
2. Click **"Add New Project"**.
3. Select your GitHub repository.
4. Vercel auto-detects Next.js — click **Deploy**.
5. Wait 1–2 minutes. Your site is live!

### Step 4: Add your custom domain (optional)
1. In Vercel, go to your project → **Settings** → **Domains**.
2. Add your domain (e.g., `ademzweb.com`).
3. Follow Vercel's instructions to update your DNS records.

### Step 5: Update your site URL
After deploying, open `config/site.ts` and change:

```
url: "https://ademzweb.com",
```

Replace with your actual domain. Redeploy (Vercel does this automatically when you push changes to GitHub).

---

## Project Folder Structure

```
Ademzweb/
├── app/                    # Next.js pages and routing
│   ├── layout.tsx          # Site-wide layout, fonts, SEO
│   ├── page.tsx            # Homepage (assembles all sections)
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Search engine instructions
├── components/
│   ├── sections/           # Page sections (Hero, Services, etc.)
│   └── ui/                 # Reusable UI pieces (buttons, cards)
├── config/
│   └── site.ts             # ★ SITE SETTINGS — edit this!
├── content/                # ★ ALL TEXT CONTENT — edit these!
│   ├── hero.ts
│   ├── services.ts
│   ├── company.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   └── ...
├── hooks/                  # Animation helpers
├── lib/                    # Utilities and icon mapping
├── public/                 # Static files (logo, images)
│   ├── logo.svg            # ★ Replace with your logo
│   └── favicon.svg         # Browser tab icon
├── styles/
│   └── globals.css         # Global styles
├── config/site.ts          # Theme colors and company info
├── package.json            # Project dependencies
└── README.md               # This file
```

---

## Replacing Placeholder Images

| File | Purpose | Recommended Size |
|------|---------|------------------|
| `public/logo.svg` | Site logo | 200×40 px |
| `public/favicon.svg` | Browser tab icon | 32×32 px |
| `public/og-image.jpg` | Social media preview | 1200×630 px |

Add `og-image.jpg` to `/public` and it will be used when your site is shared on social media.

---

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies (run once) |
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |

---

## Future Enhancements

When you're ready to grow the site, consider:

- **Blog** — Add a `/blog` section for security articles and news
- **Dark/Light Mode** — Toggle between dark and light themes
- **CMS Integration** — Connect Sanity, Contentful, or Strapi so you can edit content from a visual dashboard
- **Contact Form Backend** — Connect Formspree, Resend, or Netlify Forms to receive real emails
- **Authentication** — Client portal for report downloads
- **Multilingual Support** — English, Spanish, Arabic, etc.
- **Live Chat** — Integrate Intercom or Crisp for instant support
- **Analytics** — Add Google Analytics or Plausible for visitor tracking
- **Case Studies** — Dedicated page showcasing past projects

---

## Need Help?

- **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS docs:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Vercel deployment:** [vercel.com/docs](https://vercel.com/docs)
- **Lucide icons:** [lucide.dev/icons](https://lucide.dev/icons)

---

Built with ❤️ for Ademzweb
