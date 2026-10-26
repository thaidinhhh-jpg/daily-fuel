# Daily Fuel Tracker

Personal tracker for food, meals, water, steps, exercise, weight and macros.

## Using it on this computer
Double-click `index.html`. Everything works except the camera barcode scanner
(you can still type a barcode number) and installing as an app.

## Putting it on your phone (free, ~5 minutes)
The camera and "install as app" only work when the page is opened from a web
address (https). The easiest free option is GitHub Pages:

1. Sign in at github.com (or create a free account).
2. Create a new repository, e.g. `daily-fuel`. It can be public or private
   (private repos need a paid plan for Pages; public is fine since the repo
   only holds the app, never your logged data).
3. Upload every file in this folder: `index.html`, `sw.js`,
   `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`,
   `apple-touch-icon.png`.
4. Repository → Settings → Pages → Source: "Deploy from a branch", branch
   `main`, folder `/ (root)` → Save.
5. After a minute it's live at `https://<your-username>.github.io/daily-fuel/`.
6. Open that address on your phone:
   - iPhone (Safari): Share → Add to Home Screen.
   - Android (Chrome): ⋮ menu → Install app.

## Food list
`foods.js` holds about 12,500 foods from USDA FoodData Central (public domain):
SR Legacy (raw/cooked/dry ingredients, meat cuts, produce, brand-name fast food)
plus the FNDDS survey foods (everyday dishes with real portion sizes). Values are
per 100 g with portion weights. Packaged products not in the list can be found
with barcode scan or "Search online" (Open Food Facts).

## Your data
- Logs are stored on each device, in that browser only. They never go to
  GitHub or anywhere else.
- The phone and computer keep separate logs. To move data, use
  Settings → Export backup, then Import backup on the other device.
- Barcode lookups and "Search online" send only the barcode or search words
  to Open Food Facts (openfoodfacts.org).

## Updating the app later
Upload the changed files to the repository again. The installed app picks up
the new version the second time you open it. To force an update, bump
`VERSION` in `sw.js`.
