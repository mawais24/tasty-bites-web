export type Dietary = "vegetarian" | "vegan" | "gluten-free";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceDisplay?: string;
  badge?: "popular" | "chef-special" | "new" | "signature";
  dietary?: Dietary[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  tabLabel?: string;
  description?: string;
  note?: string;
  highlight?: boolean;
  flavours?: string[];
  items: MenuItem[];
};

export const SQUARE_ONLINE_URL = "https://tasty-bites-restaurant-bistro.square.site";

// ─── Featured items shown on the homepage ────────────────────────────────────
export const featuredItems: MenuItem[] = [
  {
    id: "feat-1",
    name: "Lamb Mandi",
    description:
      "Slow-cooked tender lamb over fragrant mandi rice with traditional Pakistani spices, served with fresh salad and house chutneys",
    price: 30,
    badge: "signature",
    image: "/lamb-mandi.jpeg",
  },
  {
    id: "feat-2",
    name: "Chicken Steak",
    description:
      "Free-range chicken marinated in our signature blend of Pakistani herbs and spices, served with roasted vegetables and house chips",
    price: 26,
    badge: "popular",
    image: "/chicken-steak.jpeg",
  },
  {
    id: "feat-3",
    name: "Desi Paratha Roll",
    description:
      "Warm, flaky paratha wrapped around your choice of chargrilled chicken tikka, slow-roasted lamb, or spiced paneer — $15 each",
    price: 15,
    badge: "popular",
    image: "/desi-paratha-roll.jpeg",
  },
  {
    id: "feat-4",
    name: "Traditional Pakistani Rotiza",
    description:
      "Our unique take on Pakistani-style flatbread pizza. Choose your style: Deep Dish, Flat Bread, Crusty Bites, Cheese Slab or Crispy Disaster. Loaded with onions, capsicums, tomatoes, olives, jalapeños, mozzarella, spinach, rocket & pineapple.",
    price: 18,
    priceDisplay: "From $18",
    badge: "new",
    image: "/hero-image/pizza.jpeg",
  },
];

// ─── Full dine-in menu ────────────────────────────────────────────────────────
export const menuCategories: MenuCategory[] = [
  // ── 1. Mandi ─────────────────────────────────────────────────────────────
  {
    id: "mandi",
    name: "Mandi Deals",
    tabLabel: "Mandi",
    description:
      "Slow-cooked lamb or chicken over fragrant mandi rice with traditional Pakistani spices. Served with fresh salad and house chutneys.",
    items: [
      // Lamb Mandi
      {
        id: "lm1",
        name: "Lamb Mandi — 1 Serve",
        description: "1 Serve lamb mandi with salad & chutneys",
        price: 30,
        badge: "signature",
      },
      {
        id: "lm2",
        name: "Lamb Mandi — 2 Serves",
        description: "2 Serves lamb mandi with salad & chutneys",
        price: 55,
      },
      {
        id: "lm3",
        name: "Lamb Mandi — 4 Serves",
        description:
          "4 Serves lamb mandi with salad & chutneys, bowl of chips & 1.25L drink",
        price: 110,
      },
      // Chicken Mandi
      {
        id: "cm1",
        name: "Quarter Chicken Mandi",
        description: "Quarter chicken mandi with salad & chutneys",
        price: 22,
      },
      {
        id: "cm2",
        name: "Half Chicken Mandi",
        description: "Half chicken mandi with salad & chutneys",
        price: 30,
      },
      {
        id: "cm3",
        name: "Full Chicken Mandi",
        description: "Full chicken mandi with salad & chutneys",
        price: 50,
        badge: "popular",
      },
      // Family & Mix deals
      {
        id: "fm1",
        name: "Family Chicken Mandi Platter",
        description:
          "2 full chicken mandis with salad & chutneys, bowl of chips & 1.25L drink",
        price: 100,
      },
      {
        id: "fm2",
        name: "Mix Family Mandi Deal",
        description:
          "1 Serve lamb mandi + 1 full chicken mandi with salad & chutneys, bowl of chips & 1.25L drink",
        price: 80,
      },
    ],
  },

  // ── 2. Steaks ─────────────────────────────────────────────────────────────
  {
    id: "steaks",
    name: "Modern Pakistani Style Steaks",
    tabLabel: "Steaks",
    description:
      "Marinated with a combination of Pakistani spices & herbs, served with an enriched sauce",
    items: [
      {
        id: "st1",
        name: "Chicken n Cheese Pocket",
        description:
          "Chicken cheese pocket with mash potatoes & stir fry veggies",
        price: 24,
      },
      {
        id: "st2",
        name: "Chicken Steak",
        description: "Chicken steak with roasted veggies & chips",
        price: 26,
        badge: "popular",
      },
      {
        id: "st3",
        name: "Lamb Steak (Lamb Chops)",
        description: "Lamb chops with mash potatoes & salad",
        price: 30,
        badge: "chef-special",
      },
    ],
  },

  // ── 3. Seafood ────────────────────────────────────────────────────────────
  {
    id: "seafood",
    name: "Seafood",
    tabLabel: "Seafood",
    items: [
      {
        id: "sf1",
        name: "Fried Fish",
        description:
          "Barramundi marinated in Pakistani style herbs & spices, with chips & salad",
        price: 24,
      },
      {
        id: "sf2",
        name: "Grilled Fish",
        description: "Barramundi with chips & salad",
        price: 24,
      },
      {
        id: "sf3",
        name: "Tempura Prawns",
        description: "Tempura prawns (6 pcs) with chips & salad",
        price: 24,
      },
    ],
  },

  // ── 4. Burgers ────────────────────────────────────────────────────────────
  {
    id: "burgers",
    name: "Burgers",
    tabLabel: "Burgers",
    description: "Served with chips",
    items: [
      // UFO Burgers
      {
        id: "bg1",
        name: "UFO Chicken Tikka Burger",
        description:
          "Chargrilled chicken tikka on a toasted bun with fresh garnish and your choice of sauce — the Flying Saucer",
        price: 18,
        badge: "popular",
      },
      {
        id: "bg2",
        name: "UFO Chicken Crunchy Burger",
        description:
          "Golden crumbed crunchy chicken on a toasted bun — the Flying Saucer",
        price: 18,
      },
      {
        id: "bg3",
        name: "UFO Lamb Chapli Burger",
        description:
          "Spiced lamb chapli patty on a toasted bun with fresh garnish — the Flying Saucer",
        price: 18,
      },
      {
        id: "bg4",
        name: "UFO Veggie Delight Burger",
        description: "House veggie patty on a toasted bun — the Flying Saucer",
        price: 18,
        dietary: ["vegetarian"],
      },
      // Traditional Burgers
      {
        id: "bg5",
        name: "Anda Shami Burger",
        description:
          "Traditional shami patty with fried egg, fresh garnish and house sauces",
        price: 24,
      },
      {
        id: "bg6",
        name: "Crunchy Bites Burger",
        description:
          "Chicken or fish patty, crispy crumbed and loaded with house sauces and garnish",
        price: 24,
      },
      {
        id: "bg7",
        name: "Double Decker Burger",
        description:
          "Double stacked chicken or lamb patties with cheese, fresh garnish and house sauces",
        price: 24,
        badge: "popular",
      },
    ],
  },

  // ── 5. Sandwiches ────────────────────────────────────────────────────────
  {
    id: "sandwiches",
    name: "Sandwiches",
    description: "Served with fries & salad",
    items: [
      {
        id: "sw1",
        name: "Club Sandwich",
        description:
          "Classic three-layer toasted bread with grilled chicken slices, fresh garnish and house sauces",
        price: 22,
      },
      {
        id: "sw2",
        name: "Vegetable Sandwich",
        description:
          "Pressed, warm & melty — fresh vegetables in toasted bread",
        price: 15,
        dietary: ["vegetarian"],
      },
      {
        id: "sw3",
        name: "Chicken Sandwich",
        description:
          "Pressed, warm & melty — seasoned chicken in toasted bread",
        price: 18,
      },
      {
        id: "sw4",
        name: "Lamb Sandwich",
        description:
          "Pressed, warm & melty — slow-roasted lamb in toasted bread",
        price: 18,
      },
    ],
  },

  // ── 6. Wraps ─────────────────────────────────────────────────────────────
  {
    id: "wraps",
    name: "Wraps",
    items: [
      {
        id: "sw5",
        name: "Desi Paratha Roll — Chicken Tikka",
        description:
          "Warm flaky paratha wrapped around chargrilled, spicy & vibrant chicken tikka",
        price: 15,
        badge: "popular",
      },
      {
        id: "sw6",
        name: "Desi Paratha Roll — Lamb",
        description:
          "Warm flaky paratha wrapped around slow-roasted & deeply seasoned lamb",
        price: 15,
      },
      {
        id: "sw7",
        name: "Desi Paratha Roll — Paneer / Vegetable",
        description:
          "Warm flaky paratha wrapped around grilled paneer or vegetables with aromatic spices & tangy sauces",
        price: 15,
        dietary: ["vegetarian"],
      },
    ],
  },

  // ── 7. Rotiza ─────────────────────────────────────────────────────────────
  {
    id: "rotiza",
    name: "Traditional Pakistani Rotiza",
    tabLabel: "Rotiza",
    description:
      "Our unique take on Pakistani-style flatbread pizza. Choose your style: Deep Dish, Flat Bread, Crusty Bites, Cheese Slab or Crispy Disaster. Loaded with onions, capsicums, tomatoes, olives, jalapeños, mozzarella, spinach, rocket & pineapple.",
    items: [
      {
        id: "rz1",
        name: "Fajita Mix Vegetables",
        description: "Loaded with seasoned fajita vegetables and mozzarella",
        price: 18,
        dietary: ["vegetarian"],
      },
      {
        id: "rz2",
        name: "Tasty Chicken Tikka",
        description: "Chargrilled chicken tikka with all the classic toppings",
        price: 20,
        badge: "popular",
      },
      {
        id: "rz3",
        name: "Cheesy Meat Lovers",
        description: "A generous mix of seasoned meats with extra mozzarella",
        price: 22,
      },
      {
        id: "rz4",
        name: "Seafood",
        description:
          "Prawns, fish and calamari with all the classic toppings",
        price: 24,
        badge: "chef-special",
      },
    ],
  },

  // ── 8. Pasta & Soup ───────────────────────────────────────────────────────
  {
    id: "pasta",
    name: "Pasta & Soup",
    tabLabel: "Pasta & Soup",
    items: [
      {
        id: "ps1",
        name: "Soup of the Day",
        description: "Ask your server for today's freshly made selection",
        price: 10,
      },
      {
        id: "ps2",
        name: "Baked Chicken Pasta",
        description:
          "Pasta baked with tender chicken in a rich, seasoned sauce topped with melted cheese",
        price: 20,
      },
      {
        id: "ps3",
        name: "Baked Veg Pasta",
        description:
          "Pasta baked with fresh vegetables in a rich, seasoned sauce topped with melted cheese",
        price: 18,
        dietary: ["vegetarian"],
      },
    ],
  },

  // ── 9. Snacks & Chicken ───────────────────────────────────────────────────
  {
    id: "snacks",
    name: "Snacks & Grills",
    tabLabel: "Snacks",
    note: "Add a bowl of chips to any chicken dish for $3",
    items: [
      {
        id: "sn1",
        name: "Juicy Drumsticks (Steam Roast)",
        description: "Tender steam-roasted drumsticks seasoned to perfection",
        price: 12,
        priceDisplay: "3 pcs $12 / 6 pcs $22",
      },
      {
        id: "sn2",
        name: "Juicy BBQ Drumettes",
        description: "Succulent drumettes cooked in a rich BBQ sauce",
        price: 10,
        priceDisplay: "3 pcs $10 / 6 pcs $18",
        badge: "popular",
      },
      {
        id: "sn3",
        name: "Crunchy Chicken Wings (Fried)",
        description: "Golden crispy fried chicken wings",
        price: 6,
        priceDisplay: "3 pcs $6 / 6 pcs $12",
      },
      {
        id: "sn4",
        name: "Loaded Fries — Meat Box",
        description:
          "A cosy pile of cheesy golden fries. Add meat: Chicken, Lamb, Tikka Paneer or Kathi Sabzi",
        price: 18,
        badge: "popular",
      },
      {
        id: "sn5",
        name: "Nachos",
        description:
          "Crispy nachos loaded with your choice of Chicken, Lamb or Vegetable topping",
        price: 18,
      },
      {
        id: "sn6",
        name: "Hot Chips",
        description: "Seasoned hot chips",
        price: 6,
        priceDisplay: "Small $6 / Large $8",
      },
      {
        id: "sn7",
        name: "Chips & Nuggets",
        description: "Crispy chips served with 6 golden nuggets",
        price: 12,
      },
    ],
  },

  // ── 10. Salad Bar ─────────────────────────────────────────────────────────
  {
    id: "salad-bar",
    name: "Salad Bar",
    tabLabel: "Salads",
    description: "All salads $8 each",
    items: [
      {
        id: "sl1",
        name: "Pasta Salad",
        description:
          "Elbow pasta tossed with garden veggies, herbs and zesty café-style dressing",
        price: 8,
        dietary: ["vegetarian"],
      },
      {
        id: "sl2",
        name: "Greek Salad",
        description:
          "Crunchy cucumbers, juicy tomatoes and leafy greens with your choice of dressing",
        price: 8,
        dietary: ["vegetarian"],
      },
      {
        id: "sl3",
        name: "Russian Salad",
        description:
          "Creamy mix of potatoes, peas, carrots, apples and mayonnaise, served chilled",
        price: 8,
        dietary: ["vegetarian"],
      },
      {
        id: "sl4",
        name: "Bean Salad",
        description:
          "Hearty bowl of mixed beans, crisp veggies and a light tangy drizzle",
        price: 8,
        dietary: ["vegetarian"],
      },
      {
        id: "sl5",
        name: "Creamy Potato Salad",
        description: "Creamy, fresh and perfectly seasoned potato goodness",
        price: 8,
        dietary: ["vegetarian"],
      },
      {
        id: "sl6",
        name: "Egg Salad",
        description:
          "Fresh boiled eggs mixed with creamy mayo, herbs and crisp veggies",
        price: 8,
        dietary: ["vegetarian"],
      },
    ],
  },

  // ── 11. Sides ─────────────────────────────────────────────────────────────
  {
    id: "sides",
    name: "Sides",
    tabLabel: "Sides",
    items: [
      {
        id: "si1",
        name: "Biryani Rice",
        description: "Fragrant spiced biryani rice",
        price: 6,
      },
      {
        id: "si2",
        name: "Mandi Rice",
        description: "Aromatic slow-cooked mandi rice",
        price: 8,
      },
      {
        id: "si3",
        name: "Potato Chips",
        description: "House-seasoned potato chips",
        price: 6,
      },
      {
        id: "si4",
        name: "Garlic Bread",
        description: "2 pieces of toasted garlic bread",
        price: 4,
        dietary: ["vegetarian"],
      },
      {
        id: "si5",
        name: "Bread",
        description: "House bread",
        price: 3,
        dietary: ["vegetarian"],
      },
      {
        id: "si6",
        name: "Sauces",
        description:
          "Garlic Mayo, Jalapeño, Ranch, BBQ, Chilli, Peri Peri, Thousand Island or Aioli",
        price: 3,
      },
    ],
  },

  // ── 12. Lamb Roast Deals ──────────────────────────────────────────────────
  {
    id: "lamb-roast",
    name: "Lamb Roast Deals",
    tabLabel: "Lamb Roast",
    description:
      "Perfect for gatherings and celebrations. Pre-order recommended. Contact us to arrange.",
    items: [
      {
        id: "lr1",
        name: "Whole Lamb Leg Roast",
        description:
          "Whole lamb leg roast with mandi rice, salad and bread — serves a generous portion",
        price: 150,
        badge: "chef-special",
      },
      {
        id: "lr2",
        name: "Whole Lamb or Goat Roast (Group)",
        description:
          "Whole lamb or goat roast for 10–15 people with choice of mandi or biryani rice, salad and 4 breads",
        price: 650,
      },
    ],
  },

  // ── 13. Ice Cream (Highlighted Signature Item) ───────────────────────────
  {
    id: "ice-cream",
    name: "Premium Ice Cream",
    tabLabel: "Ice Cream ✦",
    description:
      "Handcrafted in-house daily. Eleven indulgent flavours — from classic favourites to unique house creations.",
    highlight: true,
    flavours: [
      "Creamy Vanilla Bliss",
      "Rich Chocolate Delight",
      "Mango Paradise",
      "Strawberry Bliss",
      "Nutty Pistachio Royal",
      "Golden Biscoff Crunch",
      "Roasted Almond Velvet",
      "Oreo Cookie Crunch",
      "Royal Kulfa Delight",
      "Chiku Royal Delight",
      "Blueberry Bliss",
    ],
    items: [],
  },

  // ── 14. Desserts ──────────────────────────────────────────────────────────
  {
    id: "desserts",
    name: "Desserts & Sweet Treats",
    tabLabel: "Desserts",
    description: "Homemade with love",
    items: [
      {
        id: "ds2",
        name: "Khoya Kulfi",
        description: "Homemade rich and creamy khoya kulfi",
        price: 6,
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "ds3",
        name: "Pistachio Kulfi",
        description: "Homemade creamy kulfi infused with crushed pistachios",
        price: 7,
        badge: "popular",
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "ds4",
        name: "Mango Kulfi",
        description: "Homemade creamy kulfi bursting with fresh mango flavour",
        price: 7,
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "ds5",
        name: "Rabri Falooda with Kulfi",
        description:
          "Rich falooda with sweetened vermicelli, rose syrup and kulfi — a classic South Asian dessert",
        price: 10,
        badge: "chef-special",
        dietary: ["vegetarian"],
      },
      {
        id: "ds6",
        name: "Gulab Jamun",
        description: "2 pieces of soft, syrup-soaked gulab jamun",
        price: 6,
        dietary: ["vegetarian"],
      },
      {
        id: "ds7",
        name: "Gajar Halwa",
        description:
          "Slow-cooked carrot halwa with ghee, cardamom and nuts — a timeless dessert",
        price: 8,
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "ds8",
        name: "Gajar Halwa with Gulab Jamun",
        description: "The best of both — carrot halwa served with gulab jamun",
        price: 10,
        dietary: ["vegetarian"],
      },
    ],
  },

  // ── 15. Milkshakes ───────────────────────────────────────────────────────
  {
    id: "milkshakes",
    name: "Milkshakes",
    tabLabel: "Shakes",
    description: "All milkshakes $10 unless noted",
    items: [
      {
        id: "ms1",
        name: "Almond",
        description: "Creamy & nutty almond shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms2",
        name: "Blueberry",
        description: "Creamy & fruity blueberry shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms3",
        name: "Coffee",
        description: "Bold & creamy coffee shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms4",
        name: "Fig",
        description: "Creamy & fruity fig shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms5",
        name: "KitKat",
        description: "Creamy & crispy KitKat shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms6",
        name: "Oreo",
        description: "Creamy crushed Oreo shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms7",
        name: "Vanilla",
        description: "Classic creamy vanilla shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms8",
        name: "Pistachio",
        description: "Creamy & nutty pistachio shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms9",
        name: "Strawberry",
        description: "Creamy & fruity strawberry shake",
        price: 10,
        dietary: ["vegetarian"],
      },
      {
        id: "ms10",
        name: "Majoon",
        description: "A rich date-based shake with nuts & dried fruits",
        price: 12,
        badge: "popular",
        dietary: ["vegetarian"],
      },
    ],
  },

  // ── 16. Fresh Juices ─────────────────────────────────────────────────────
  {
    id: "juices",
    name: "Fresh Juices",
    tabLabel: "Juices",
    description: "All fresh juices $10 unless noted",
    items: [
      {
        id: "fj1",
        name: "Sugarcane Juice",
        description:
          "Naturally sweet juice extracted from fresh sugarcane, served chilled",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj2",
        name: "Apple Juice",
        description:
          "Refreshingly sweet juice made from crisp, freshly pressed apples",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj3",
        name: "Carrot Juice",
        description: "Vibrant and naturally sweet carrot juice, packed with freshness",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj4",
        name: "Celery Juice",
        description:
          "Light and detoxifying juice with a mild, earthy flavour",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj5",
        name: "Go Green Juice",
        description:
          "A nutritious green blend of leafy vegetables & fruits for a revitalising boost",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj6",
        name: "Orange Juice",
        description:
          "Bright & citrusy juice made from sun-ripened oranges, packed with vitamin C",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj7",
        name: "Beetroot Juice",
        description:
          "Earthy & slightly sweet juice from beetroots, rich in nutrients and antioxidants",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj8",
        name: "Watermelon Juice",
        description:
          "Hydrating juice with a subtly sweet flavour from ripe, juicy watermelon",
        price: 10,
        dietary: ["vegan", "gluten-free"],
      },
      {
        id: "fj9",
        name: "Mixed Fruit Juice",
        description:
          "A delicious assortment of seasonal fruits blended into a refreshing and colourful juice",
        price: 12,
        dietary: ["vegan", "gluten-free"],
      },
    ],
  },

  // ── 17. Hot Drinks ───────────────────────────────────────────────────────
  {
    id: "hot-drinks",
    name: "Hot Drinks",
    tabLabel: "Hot Drinks",
    items: [
      {
        id: "hd1",
        name: "Karak Chai",
        description: "Strong, spiced tea brewed with milk — full of flavour",
        price: 5,
        badge: "popular",
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "hd2",
        name: "Doodh Pati Chai",
        description:
          "Traditional all-milk tea simmered with tea leaves and cardamom",
        price: 6,
        dietary: ["vegetarian", "gluten-free"],
      },
      {
        id: "hd3",
        name: "Kashmiri Chai",
        description:
          "Fragrant pink tea made with special Kashmiri green tea, milk and cardamom",
        price: 7,
        badge: "chef-special",
        dietary: ["vegetarian", "gluten-free"],
      },
    ],
  },

  // ── 18. Soft Drinks ──────────────────────────────────────────────────────
  {
    id: "soft-drinks",
    name: "Soft Drinks",
    tabLabel: "Soft Drinks",
    items: [
      {
        id: "sd1",
        name: "Can of Drink 375ml",
        description: "Coke, Coke Zero, Sprite or Fanta",
        price: 4,
        dietary: ["vegan"],
      },
      {
        id: "sd2",
        name: "Bottle 600ml",
        description: "Coke, Coke Zero, Sprite or Fanta",
        price: 5,
        dietary: ["vegan"],
      },
      {
        id: "sd3",
        name: "Lemon Lime Bitters",
        description: "Classic lemon lime bitters",
        price: 5,
        dietary: ["vegan"],
      },
      {
        id: "sd4",
        name: "Ginger Beer",
        description: "Refreshing ginger beer",
        price: 5,
        dietary: ["vegan"],
      },
      {
        id: "sd5",
        name: "Spring Water 600ml",
        description: "Still spring water",
        price: 3,
        dietary: ["vegan", "gluten-free"],
      },
    ],
  },
];
