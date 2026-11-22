# 💛 Us: our little corner of the internet

A static site for the two of us: e-date invites, our journey, photos, writings and games. There's no backend, no database and no build step. Everything is plain files, hosted on GitHub Pages.

## Go live (one time)
1. Push this repo to GitHub.
2. Open **Settings → Pages → Build and deployment**, pick *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.
3. After about a minute the site is up at `https://<username>.github.io/<repo>/`.

## Everything you edit lives in `data/`
| File | What it holds |
|---|---|
| `data/site.js` | Names, anniversary, RSVP phone number |
| `data/invites.js` | Date invites: letter, movie options, plan |
| `data/journey.js` | Timeline moments and their photos |
| `data/writings.js` | Letters, poems, thoughts |
| `data/play.js` | Conversation card decks and game links |

You can edit any of these straight on github.com (pencil icon → Commit). The site updates about a minute later.

### Add photos
On GitHub open `photos/`, then **Add file → Upload files**. Add the filename to a moment in `data/journey.js`:
```js
photos: ["photos/pumpkin-pie-selfie.jpg"],
```
The Photos page picks it up automatically. Keep files under about 1 MB each (phone photos can be resized first).

### Send an invite
Share `https://<username>.github.io/<repo>/invite.html?id=thanksgiving-2026`

- Your partner opens the envelope, reads the letter and says yes (the No button runs away 😌).
- Then they see: the date in their own time zone with a countdown, add-to-calendar, the movie, the plan (in their own time zone), and an RSVP button that pre-fills a text message.

To add a new date, copy the Thanksgiving object in `data/invites.js` and give it a new `id`.

### Run it locally
Double-click `index.html`; it works straight from your disk. To reset an invite (so the envelope shows again), clear the site's data in the browser.

## ⚠️ Privacy note
GitHub Pages sites are **public**, and on the free plan so is the repo. Pages carry `noindex` so search engines skip them, but anyone with the link (or anyone reading the repo) can see everything.
