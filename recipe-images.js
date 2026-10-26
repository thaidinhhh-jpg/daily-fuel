// Picks one of the 48 dish illustrations (img/*.webp) for a recipe from its title and category.
// First matching rule wins (so specific rules sit above general ones); the category fallback covers the rest.
window.RECIPE_IMG = (function(){
  const RULES = [
    // specific overrides first
    [/weet-bix slice/, "cookies"],
    [/golden syrup dumplings/, "cake"],
    [/stew with dumplings|chicken and dumplings \(dinner\)/, "casserole"],
    [/^creamy mashed|^mashed potato|^sweet potato mash|^cauliflower mash/, "veggie-bake"],
    [/pasta salad/, "pasta"],
    [/fruit salad|fruit kebab/, "fruit"],
    [/garlic bread|flatbread|dinner roll|pizza bread|on rye/, "sandwich"],
    [/ratatouille/, "veggie-bake"],
    [/bread and butter pudding/, "cake"],
    [/crackers|crispbread|rice cake/, "snack-balls"],
    [/milkshake/, "smoothie"],
    [/calamari|squid|prawn cocktail/, "prawns"],
    [/^meal-prep (chicken|beef)/, "roast-dinner"],
    [/fried rice|nasi goreng|kimchi fried/, "fried-rice"],
    [/pho\b|ramen|laksa|wonton soup|miso soup|tom yum|tom kha|noodle soup|miso noodle|dumpling soup|egg drop|hot and sour/, "noodle-soup"],
    [/soup|chowder|broth|minestrone|gazpacho|bisque/, "soup"],
    // drinks & breakfast
    [/smoothie|\bshake|\blassi\b|frappe|protein iced|iced protein/, "smoothie"],
    [/latte|cappuccino|flat white|coffee|mocha|hot chocolate|milo|chai|matcha|turmeric milk|bulletproof/, "coffee"],
    [/iced tea|lemonade|sparkling|coconut water|electrolyte|juice|chocolate milk|cordial/, "drink"],
    [/yoghurt bowl|yogurt bowl|parfait|chia pudding|yoghurt with|yoghurt and|cottage cheese (bowl|with)|greek yoghurt|protein pudding|yoghurt cup|frozen yoghurt bark|bircher|yoghurt dip/, "yoghurt-bowl"],
    [/porridge|\boats\b|muesli|weet-bix|cornflakes|granola|breakfast quinoa|quinoa and apple/, "porridge"],
    [/pancake|waffle|crepe|french toast|flapjack/, "pancakes"],
    [/dumpling|gyoza|wonton(?! soup)|spring roll|samosa/, "dumplings"],
    [/pizza/, "pizza"],
    [/toastie|jaffle|\bmelt\b|melts\b|croque|grilled cheese|cheese toast/, "toastie"],
    [/quesadilla/, "tacos"],
    [/nacho/, "nachos"],
    [/burger|slider|hot dog|chilli dog/, "burger"],
    [/\bbowl\b|bowls\b|poke\b/, "grain-bowl"],
    [/sandwich|bagel|croissant|\broll\b|rolls\b|banh mi|\bsub\b|\bblt\b|\bclub\b|open-faced|open sandwich|ploughman|bruschetta|crumpet|scroll/, "sandwich"],
    [/\bwrap|pita\b|gyros|shawarma|rice paper|lettuce cup|lettuce wrap|san choy|gozleme|lettuce boat|roll-up/, "wrap"],
    [/salad|slaw|tabbouleh|caprese|niçoise|cobb|waldorf|panzanella/, "salad"],
    // eggs & breakfast plates
    [/\begg|omelette|frittata|shakshuka|toast\b|avocado on|big breakfast|\bhash\b|rosti|tofu scramble|chickpea scramble|baked beans|vegemite/, "eggs-toast"],
    // pasta, rice, noodles
    [/lasagne|cannelloni|moussaka/, "lasagne"],
    [/alfredo|carbonara|creamy|stroganoff|mac and cheese|mac & cheese|macaroni|mornay|pasta bake|gnocchi|tetrazzini|cacio|primavera|noodle casserole/, "creamy-pasta"],
    [/pasta|spaghetti|linguine|penne|fettuccine|rigatoni|ravioli|bolognese|\bragu\b|orzo|pappardelle|aglio|arrabbiata|napolitana|marinara|fideo|e fagioli/, "pasta"],
    [/risotto|arancini|paella|jambalaya|biryani|congee|kedgeree|pilaf|coconut rice|rice \(|basmati rice|jasmine rice|steamed rice|garlic butter rice|mexican rice|dirty-style rice/, "risotto"],
    [/pad thai|pad see ew|chow mein|lo mein|singapore noodle|japchae|drunken|noodle|udon|soba|bun cha|okonomiyaki/, "noodles"],
    [/green curry|thai green|panang/, "green-curry"],
    [/prawn|shrimp|scallop|calamari|squid|mussel|seafood/, "prawns"],
    [/curry|korma|masala|butter chicken|tikka|vindaloo|madras|rogan|massaman|rendang|dahl|\bdal\b|chana|tagine|jalfrezi|saag|keema|afritada|adobo|mapo|sukiyaki|gyudon|oyakodon|inasal|jerk|katsu|karaage/, "curry"],
    [/tofu|tempeh|edamame|vegan/, "tofu"],
    [/stir-fry|stir fry|teriyaki|honey soy|sweet and sour|lemon chicken|kung pao|general tso|mongolian|cashew|black bean|bulgogi|korean beef|pad krapow|caramel pork|char siu|crispy chilli|salt and pepper|honey prawns|sesame chicken|beef and broccoli|skillet/, "stir-fry"],
    [/taco|tostada|fajita|tinga/, "tacos"],
    [/burrito|enchilada|carnitas|huevos|con carne|turkey chilli|vegetarian chilli|vegan chilli|keto chilli|chilli beef|sweet potato chilli|lean beef chilli|mexican|refried|elote/, "burrito"],
    [/skewer|kebab|kofta|yakitori|satay|souvlaki|tandoori|larb|falafel/, "kebabs"],
    // meat & fish mains
    [/schnitzel|parmigiana|parma\b|crumbed|nugget|tender|cordon bleu|kiev|crispy chicken|fried chicken|wings|saltimbocca|piccata|scaloppine|involtini/, "schnitzel"],
    [/fish and chips|fish & chips|battered|fish fingers|fisherman|tempura|fish burger/, "fish-chips"],
    [/salmon|barramundi|snapper|tuna|\bfish\b|sardine|anchov/, "fish"],
    [/steak|t-bone|eye fillet|sirloin|rump|kangaroo|brisket|corned beef|reuben|pepper steak|wellington/, "steak"],
    [/sausage|bangers|chorizo|snag/, "sausages"],
    [/\bpie\b|pies\b|pasty|quiche|empanada|tart\b|spanakopita|impossible pie|zucchini slice/, "pie"],
    [/casserole|stew|braise|slow-cook|shank|goulash|bourguignon|osso|hotpot|cassoulet|irish|one-pot|pressure-cooker|pulled|ribs|pork belly|gumbo|étouffée|etouffee|chasseur|fricassee|coq au vin|provençal|marbella|cacciatore/, "casserole"],
    [/meatball|rissole|meatloaf|savoury mince|mince\b|meat loaf|cabbage roll/, "meatballs"],
    [/roast|tray bake|drumstick|whole chicken|maryland|chicken breast with|chicken thighs with|chicken thigh|lamb chops|lamb cutlet|cutlets|pork chop|pork fillet|pork loin|lamb leg|honey mustard|lemon .* chicken|peri-peri|beer-can|hunter|chicken divan|air fryer (chicken|pork|steak|salmon|lamb|whole)/, "roast-dinner"],
    // snacks, baking, desserts, sides
    [/bliss|protein ball|energy|\bbar\b|bars\b|trail mix|\bnuts\b|almonds|crackers|crispbread|rice cake|hummus|\bdip\b|dips\b|popcorn|jerky|cheese and |cheese & |snack|chickpeas \(|roasted chickpeas|cucumber bites|stuffed dates|fat bomb|fudge|protein cookie|seed cracker|platter|plate\b|box\b|pack\b/, "snack-balls"],
    [/muffin|scone|banana bread|\bloaf\b|\bbread\b|lamington|macaroon|cloud bread|almond bread/, "muffin"],
    [/cookie|biscuit|anzac|shortbread|jam drop|honey joys|crackles|rocky road|hedgehog|slice\b/, "cookies"],
    [/cake|brownie|cheesecake|pavlova|pudding|crumble|turnover|churro|donut|doughnut|apple pie|lemon meringue|custard tart|baked apple|poached pear|grilled pineapple|baked peach/, "cake"],
    [/mousse|panna cotta|trifle|custard|ice cream|nice cream|sorbet|frozen yoghurt|jelly|dessert|tiramisu|banana split|strawberries and cream|chocolate dipped|frozen banana|yoghurt bark|protein ice cream/, "dessert"],
    [/fruit|watermelon|mango|apple\b|banana\b|pear\b|grapes|mandarin|melon|berries/, "fruit"],
    [/mash|potato|chips|wedges|fries|rice\b|quinoa|couscous|polenta|vegetable|veg\b|broccoli|carrot|pumpkin|corn\b|beans|peas|asparagus|zucchini|mushroom|greens|bok choy|gratin|bake\b|fritter|ratatouille|stuffed|capsicum|eggplant|cauliflower|haloumi|sauce|dressing|gravy|pesto|tzatziki|guacamole|pico|raita|chutney|pickled|kimchi|sauerkraut|stuffing|yorkshire|onion rings/, "veggie-bake"],
    [/chicken|turkey|duck/, "roast-dinner"],
    [/beef|lamb|pork|\bham\b|bacon/, "steak"],
    [/protein|whey/, "smoothie"],
  ];
  const BY_CAT = {
    "Breakfast": "eggs-toast", "Lunch": "sandwich", "Salads": "salad", "Soups": "soup", "Dinner": "roast-dinner",
    "Pasta": "pasta", "Asian": "stir-fry", "Mexican": "curry", "Vegetarian": "veggie-bake", "Meal prep": "grain-bowl",
    "Snacks": "snack-balls", "Smoothies": "smoothie", "Desserts": "cake", "Sides": "veggie-bake", "Kids": "sausages",
    "Seafood": "fish", "Slow cooker": "casserole", "Light": "salad", "Low carb": "steak", "BBQ": "kebabs",
    "Eggs & quick": "stir-fry", "Chicken": "roast-dinner", "Beef": "steak", "Air fryer": "schnitzel", "Toasties": "toastie", "My recipes": "grain-bowl"
  };
  function pick(title, cat){
    const t = String(title).toLowerCase();
    for (const [re, img] of RULES) if (re.test(t)) return img;
    for (const k in BY_CAT) if (String(cat||"").startsWith(k)) return BY_CAT[k];
    return "grain-bowl";
  }
  const LIST = ["porridge","eggs-toast","pancakes","yoghurt-bowl","smoothie","coffee","sandwich","wrap","toastie","burger","salad","grain-bowl","soup","noodle-soup","pasta","creamy-pasta","lasagne","pizza","risotto","stir-fry","noodles","curry","green-curry","fried-rice","dumplings","tacos","burrito","nachos","kebabs","roast-dinner","steak","schnitzel","fish","fish-chips","prawns","sausages","pie","casserole","meatballs","veggie-bake","tofu","snack-balls","muffin","cake","cookies","dessert","fruit","drink"];
  // per-recipe pictures live in img/r/<slug>.webp once generated; the dish-type picture is the fallback
  const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  const perRecipe = false;
  return { pick, LIST, slug, perRecipe, src: name => "img/" + name + ".webp", per: title => perRecipe ? "img/r/" + slug(title) + ".webp" : "" };
})();
