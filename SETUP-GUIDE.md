# Your Wedding Website — Setup Guide

A free, self-hosted wedding site with the same core features as Joy / Zola:
**countdown, our story, schedule, travel & hotels, registry, photo gallery,
wedding party, FAQ, and a real RSVP system** that saves responses to a Google
Sheet you own. Star Wars theme, minimal style. No monthly fees, no limits.

Files in this folder:
- `index.html` — the entire website (edit the CONFIG block inside it)
- `rsvp-backend.gs` — the Google Apps Script that collects RSVPs
- `SETUP-GUIDE.md` — this file
- `photos/` — (optional) drop your gallery photos here

---

## 1. Edit your details (5 minutes)

Open `index.html` and scroll to the big **`const CONFIG = { … }`** block near the
bottom. Everything is editable there — names, date, story, events, hotels,
registry links, FAQ, wedding party, etc. Change the text, save, done.

The **countdown** reads `CONFIG.date` (format `YYYY-MM-DDTHH:MM:SS`).

### Photos
Make a folder named `photos` next to `index.html`, drop your images in, then list
them in `CONFIG.gallery`, e.g.:
```js
gallery: ["photos/1.jpg", "photos/2.jpg", "photos/engagement.jpg"],
```
Leave it `[]` and it shows tasteful placeholder tiles.

### Optional password
Want a guests-only site? Set `CONFIG.password: "rebelalliance"`. Leave it `""`
to keep the site open. (This is light protection — fine for weddings, not a vault.)

---

## 2. Turn on RSVP (10 minutes, one time)

This is the only piece that needs a free backend. Responses land in a Google
Sheet that acts as your guest dashboard.

1. Go to **https://sheets.new** to create a blank Google Sheet. Name it
   "Wedding RSVPs" (this is where responses appear).
2. In that sheet: **Extensions ▸ Apps Script**.
3. Delete whatever sample code is there. Open `rsvp-backend.gs` from this folder,
   copy **all** of it, paste it in, and click the **Save** (💾) icon.
4. Click **Deploy ▸ New deployment**.
   - Click the gear ⚙ next to "Select type" → choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** **Anyone**  ← important, so guests can submit
   - Click **Deploy**.
5. Google will ask you to **authorize**. Approve it (you may see an "unverified
   app" screen → click *Advanced* → *Go to (project) → Allow*. It's your own script.)
6. Copy the **Web app URL** it shows (ends in `/exec`).
7. In `index.html`, paste that URL into:
   ```js
   rsvpEndpoint: "https://script.google.com/macros/s/…/exec",
   ```
8. Save. Submit a test RSVP on your site — a new row should appear in the Sheet. 🎉

> Tip: Want an email every time someone RSVPs? In the Sheet, add a notification
> rule under **Tools ▸ Notification settings** (or ask me to add email-on-submit
> to the script).

---

## 3. Put it online for free (2 minutes)

Pick one — all genuinely free:

### Easiest — Netlify Drop
1. Go to **https://app.netlify.com/drop**
2. Drag this whole `wedding-website` folder onto the page.
3. You instantly get a live URL like `your-site.netlify.app`. You can rename it
   in Site settings, and add a custom domain later.

### Or — Cloudflare Pages / GitHub Pages
Both free and support custom domains. Cloudflare Pages: create a project, upload
the folder. GitHub Pages: push the folder to a repo, enable Pages in settings.

### Custom domain (optional, ~$12/yr)
Buy e.g. `hanandleia.com` from Cloudflare or Namecheap and point it at your host.
The hosting stays free — only the domain name costs money.

---

## Feature map vs Joy / Zola

| Joy / Zola | This site |
|---|---|
| Wedding website with sections | ✅ |
| Countdown | ✅ |
| RSVP + meal choice + party size + per-event | ✅ → Google Sheet |
| Guest response dashboard | ✅ the Google Sheet |
| Registry links + cash/honeymoon fund | ✅ |
| Travel + hotel room blocks | ✅ |
| Photo gallery + lightbox | ✅ |
| Wedding party, Our story, FAQ | ✅ |
| Password protection | ✅ (optional) |
| Custom domain | ✅ (domain ~$12/yr, hosting free) |
| Mass-email guests / printed invites / seating-chart tool | ✗ not built-in (can be added) |

Want any of the ✗ items, or e-vite "save the dates," a guestbook, or an RSVP
admin summary view? Just ask.
