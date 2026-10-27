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

## Food list
`foods.js` rows also carry fibre, total sugars, sodium and saturated fat per 100 g where
USDA reports them. The food modal shows them under **More nutrients** (you can type them
for packaged foods), and the Today tab totals fibre vs your goal, sugar, sodium vs your
limit and saturated fat under the macros, noting how many logged items had no values.
Fast-food items and quick adds don't carry them.

## Food ratings and diet filters
Every food in search and every recipe shows a coloured dot: **green** good choice, **amber**
fine in moderation, **red** limit. It's worked out per 100 g from sugar, saturated fat and
sodium (UK traffic-light thresholds), with credit for fibre and protein and a penalty for
sugary foods with nothing else in them. Recipes also carry diet tags derived from their
ingredients — Vegetarian, Vegan, Pescatarian, Dairy-free, Low carb (≤20 g/serve), High
protein (≥25 g/serve), High fibre, Under 400 kcal — and the Recipes tab has a second row of
chips to filter by them, followed by style tags worked out from the method (Quick ≤20 min, Few
ingredients ≤5, Baking, No-cook, One-pot) and a row of calorie ranges (under 200 … 600+). Every
recipe shows an estimated total time, read from the times in its steps. The star on a card saves
it to **Favourites**; a **Recipe of the day** is picked from the recipes matching your diet.
**Cook mode** (button under a recipe's steps) shows one step at a time in large type and keeps
the screen awake.

## First run, meals and the weekend
The first time the app opens it asks three things — your goal, your body details and pace — and
shows the plan: daily calorie target, protein/carbs/fat in grams and the date you'd reach your
goal weight at that pace. Everything it sets can be changed later in Settings.

Settings → **Meals & diary**: rename the meals (Brekkie, Tea…), reorder them, and share your
calorie goal between them in percent — each meal on the Today tab then shows "eaten / budget"
(default 30/40/25/5 like most trackers). **Eat a bit more on…** lets the weekend (Sat–Sun,
Fri–Sun or Fri–Sat) have extra calories and the other days a little less, so the week still adds
up to seven times your goal. Also here: a diet preference that pre-selects the recipe filter, the
glass size for the water button, whether exercise counts toward "burned", the starting weight for
the progress bar, and show/hide for the water, fasting, steps and notes cards.

## Reminders
Settings → **Reminders**: meal reminders at the times you set (skipped once that meal has food
logged), a water reminder every few hours while you're under your goal, a daily or Monday
weigh-in reminder, and a notification when a timed fast is complete. In the browser these only
fire while Daily Fuel is open in a tab; the Android/iOS app schedules them on the phone so they
arrive with the app closed.

## Fasting
Plans 12:12 to 24:0 plus **5:2**: on the 5:2 plan the card has "Make this a fast day", which
sets that day's calorie goal to 600 kcal (the ring, meals and week balance all use it) and
counts your two fast days for the week. Timed fasts keep a history, "this week" count and a
streak of consecutive completed fasts.

## Mood, symptoms and measurements
Under the day's notes you can tap a mood (😞 😐 🙂 😄) and symptom chips (hungry, bloated,
tired, slept badly, cravings…); they're saved per day and included in the CSV export.
History → **Body measurements** logs waist, hips, chest, arm, thigh and body fat %, shows the
last ten entries and the change since the first. The History chart can show 14, 30 or 90
days with a dotted average line for logged days.

## Today tab extras
- **Quick add** logs calories (and optional macros) without choosing a food.
- **Fasting** card: pick a plan (12:12 to 24:0), start after your last meal and it counts
  while the app is closed; ending saves the fast to a history used for "this week".
- **Notes for the day** under the meals, saved as you type and included in the CSV export.
- Food search with nothing typed shows your saved meals, saved foods, most-logged foods
  ("frequent") and recent items.
- The weight card projects the date you'd reach your goal weight at the current two-week
  trend, shows a progress bar from your starting weight to the goal, and the exercise list has
  63 activities with MET values.

## History tab
**Last 7 days** shows the streak, average eaten and net, the week's balance against your
goal in kcal and kg (next to what your chosen pace aims for), the actual trend change,
protein, water, steps, and your best and worst day. The **Calendar** colours each day by
whether it finished under or over the goal; tap a day to open it.

## Recipe pictures
`img/` holds 48 dish illustrations (400 px WebP, about 1 MB in total, cached offline).
`recipe-images.js` picks one for each recipe from its title — a curry gets the curry
picture, a smoothie the smoothie, and so on. When `img/r/` holds a picture named after a
recipe (`<title-as-slug>.webp`, 320 px WebP) that one is shown instead and cached the first
time it's seen; the dish-type picture is the fallback. Your own recipes use the dish type.

## Your own recipes
Recipes → **+ My recipe**: name it, set the serves, search the food list for each
ingredient and type the grams; the per-serve calories and macros are calculated the same
way as the built-in recipes (USDA values, raw weights). Your recipes show up under
**★ My recipes**, in the food search, and can go on the meal plan and shopping list like
any other. Edit or delete them from their card; they're included in backups.

## Adaptive calorie goal
Settings → Calorie goal shows an **Adaptive estimate** once you have 10+ logged days and
4+ weigh-ins over 10+ days in the last three weeks. It takes your average net intake
(food minus burned) and the slope of your trend weight, works out what you were actually
maintaining on (7,700 kcal per kg), then applies your chosen pace. It's a better guide
than the formula because it comes from your results; **Use this** copies it into your goal.

## Meal plan & shopping list
The Plan tab shows a week (Monday to Sunday). Add recipes to any meal of any day and
the day's calories and macros are totalled against your goal; "Log day" copies the planned
items into that day's food log. Recipes can also be sent to the plan from the food search
("+ Add to meal plan" under a recipe's ingredients). The shopping list totals the
ingredients of every planned recipe for the week (or one day), scaled to the serves you
planned; tick items off as you shop (ticks are remembered per week), copy the list or
share it to another app.

## Native apps, Health sync and the Shortcuts hook
The `daily-fuel-native` folder next to this one wraps the app for **Android and iOS** with
Capacitor and adds Apple Health / Health Connect sync (steps, weight, active energy) —
see its README for building and installing. Inside those apps, Settings shows a **Health
sync** card (Connect / Sync now / Turn off); the web version hides it.

The web app also accepts `?steps=N`, `?weight=KG`, `?water=ML` and an optional
`&date=YYYY-MM-DD` in the address, logs them and cleans the URL — for iPhone Shortcuts,
Tasker or any automation (details in the native README). `privacy.html` is the privacy
policy Health Connect requires.

## Backups
Everything is stored in the browser, so Settings → Backup has **Export backup** (a JSON
file), **Share backup…** on phones (send the file to yourself), **Import backup** with a
choice of *Merge* (keeps what's here and adds the backup's days) or *Replace*, and
**Undo last import**. The Today tab reminds you when it's been more than two weeks since
a backup. **Export CSV** gives a spreadsheet of every logged item.

## Recipes
`recipes.js` holds 2,000 recipes across 25 categories (breakfast, lunch, salads, soups,
Aussie classics, pasta, Asian, Mexican/Indian/Middle Eastern, vegetarian & vegan, meal
prep & high protein, snacks, smoothies, desserts & baking, sides, kids, seafood, slow
cooker & one-pot, light dinners, low carb & keto, BBQ & burgers, quick dinners, chicken,
beef/lamb/pork, air fryer & oven bakes, toasties). Each recipe lists its ingredients in
grams, numbered step-by-step cooking instructions (times and temperatures included) and the number of serves; the nutrition per serve is calculated
from the USDA values of those ingredients (raw weights), so it is an estimate that moves
if you change quantities. Browse them on the Recipes tab or type "recipe" in the food
search (e.g. "recipe chicken curry") to see only recipes. Logging a recipe adds one serve
(or the whole recipe) to the chosen meal.

Fast-food values are per serve as the chain publishes them; menus change, so re-check
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
