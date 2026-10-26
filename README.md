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

## Fast food
`fastfood.js` holds about 5,000 menu items, taken from each chain's own published
nutrition (websites and nutrition PDFs), collected October 2026:

- **Australia:** McDonald's, KFC, Hungry Jack's, Subway, Guzman y Gomez, Zambrero,
  Domino's, Pizza Hut, Nando's (18 items with published nutrition), Red Rooster and
  Oporto (these two publish energy only, so they're tagged "energy only"), Boost Juice,
  Betty's Burgers, Pie Face, Gloria Jean's (food), Soul Origin
- **Australian ready meals:** My Muscle Chef, Youfoodz, Lite n' Easy, Dineamic,
  Muscle Meals Direct (per-meal panels from each company's site)
- **Australian supermarket protein snacks:** about 640 protein bars, cookies, balls,
  wafers, chips, yoghurts, puddings, shakes and powders (Musashi, BSc, Muscle Nation,
  Quest, Grenade, Carman's, YoPRO, Chobani, Koja, Health Lab and more) from the
  manufacturer nutrition panels published on woolworths.com.au; the brand is shown
  as the "chain"
- Not available (no published nutrition): Mad Mex, Schnitz, Carl's Jr AU, Sushi Hub,
  Chicken Treat, Krispy Kreme AU
- **UK & Europe:** McDonald's UK, McDonald's Germany, KFC UK & Ireland, Burger King UK,
  Wendy's UK, Greggs, Subway UK & Ireland, Five Guys Europe (components; standard
  burgers are calculated from the official bun/patty/cheese values and labelled as such)
- **US:** McDonald's, Subway, Chick-fil-A, Wendy's, Taco Bell (plus older US chains in
  the USDA list)

Add a country to a search to filter by it, e.g. "whopper uk" or "big mac usa".

## Recipes
`recipes.js` holds 2,000 recipes across 25 categories (breakfast, lunch, salads, soups,
Aussie classics, pasta, Asian, Mexican/Indian/Middle Eastern, vegetarian & vegan, meal
prep & high protein, snacks, smoothies, desserts & baking, sides, kids, seafood, slow
cooker & one-pot, light dinners, low carb & keto, BBQ & burgers, quick dinners, chicken,
beef/lamb/pork, air fryer & oven bakes, toasties). Each recipe lists its ingredients in
grams, a short method and the number of serves; the nutrition per serve is calculated
from the USDA values of those ingredients (raw weights), so it is an estimate that moves
if you change quantities. Browse them on the Recipes tab or type "recipe" in the food
search (e.g. "recipe chicken curry") to see only recipes. Logging a recipe adds one serve
(or the whole recipe) to the chosen meal.

Values are per serve as the chain publishes them; menus change, so re-check
the chain's site for anything new. Settings → "Fast food menus to show first"
puts your region's menus at the top of search results.

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
