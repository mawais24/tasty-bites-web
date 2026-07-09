-- Auto-generated from src/data/menu.ts — run after supabase-schema.sql

-- Mandi Deals
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'mandi', 'Mandi Deals', 'Mandi', 'Slow-cooked lamb or chicken over fragrant mandi rice with traditional Pakistani spices. Served with fresh salad and house chutneys.', null,
  false, '[]'::jsonb, 1, true
) on conflict (slug) do nothing;

-- Modern Pakistani Style Steaks
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'steaks', 'Modern Pakistani Style Steaks', 'Steaks', 'Marinated with a combination of Pakistani spices & herbs, served with an enriched sauce', null,
  false, '[]'::jsonb, 2, true
) on conflict (slug) do nothing;

-- Seafood
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'seafood', 'Seafood', 'Seafood', null, null,
  false, '[]'::jsonb, 3, true
) on conflict (slug) do nothing;

-- Burgers
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'burgers', 'Burgers', 'Burgers', 'Served with chips', null,
  false, '[]'::jsonb, 4, true
) on conflict (slug) do nothing;

-- Sandwiches
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'sandwiches', 'Sandwiches', null, 'Served with fries & salad', null,
  false, '[]'::jsonb, 5, true
) on conflict (slug) do nothing;

-- Wraps
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'wraps', 'Wraps', null, null, null,
  false, '[]'::jsonb, 6, true
) on conflict (slug) do nothing;

-- Traditional Pakistani Rotiza
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'rotiza', 'Traditional Pakistani Rotiza', 'Rotiza', 'Our unique take on Pakistani-style flatbread pizza. Choose your style: Deep Dish, Flat Bread, Crusty Bites, Cheese Slab or Crispy Disaster. Loaded with onions, capsicums, tomatoes, olives, jalapeños, mozzarella, spinach, rocket & pineapple.', null,
  false, '[]'::jsonb, 7, true
) on conflict (slug) do nothing;

-- Pasta & Soup
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'pasta', 'Pasta & Soup', 'Pasta & Soup', null, null,
  false, '[]'::jsonb, 8, true
) on conflict (slug) do nothing;

-- Snacks & Grills
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'snacks', 'Snacks & Grills', 'Snacks', null, 'Add a bowl of chips to any chicken dish for $3',
  false, '[]'::jsonb, 9, true
) on conflict (slug) do nothing;

-- Salad Bar
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'salad-bar', 'Salad Bar', 'Salads', 'All salads $8 each', null,
  false, '[]'::jsonb, 10, true
) on conflict (slug) do nothing;

-- Sides
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'sides', 'Sides', 'Sides', null, null,
  false, '[]'::jsonb, 11, true
) on conflict (slug) do nothing;

-- Lamb Roast Deals
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'lamb-roast', 'Lamb Roast Deals', 'Lamb Roast', 'Perfect for gatherings and celebrations. Pre-order recommended. Contact us to arrange.', null,
  false, '[]'::jsonb, 12, true
) on conflict (slug) do nothing;

-- Premium Ice Cream
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'ice-cream', 'Premium Ice Cream', 'Ice Cream ✦', 'Handcrafted in-house daily. Eleven indulgent flavours — from classic favourites to unique house creations.', null,
  true, '["Creamy Vanilla Bliss","Rich Chocolate Delight","Mango Paradise","Strawberry Bliss","Nutty Pistachio Royal","Golden Biscoff Crunch","Roasted Almond Velvet","Oreo Cookie Crunch","Royal Kulfa Delight","Chiku Royal Delight","Blueberry Bliss"]'::jsonb, 13, true
) on conflict (slug) do nothing;

-- Desserts & Sweet Treats
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'desserts', 'Desserts & Sweet Treats', 'Desserts', 'Homemade with love', null,
  false, '[]'::jsonb, 14, true
) on conflict (slug) do nothing;

-- Milkshakes
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'milkshakes', 'Milkshakes', 'Shakes', 'All milkshakes $10 unless noted', null,
  false, '[]'::jsonb, 15, true
) on conflict (slug) do nothing;

-- Fresh Juices
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'juices', 'Fresh Juices', 'Juices', 'All fresh juices $10 unless noted', null,
  false, '[]'::jsonb, 16, true
) on conflict (slug) do nothing;

-- Hot Drinks
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'hot-drinks', 'Hot Drinks', 'Hot Drinks', null, null,
  false, '[]'::jsonb, 17, true
) on conflict (slug) do nothing;

-- Soft Drinks
insert into menu_categories (slug, name, tab_label, description, note, highlight, flavours, display_order, is_active) values (
  'soft-drinks', 'Soft Drinks', 'Soft Drinks', null, null,
  false, '[]'::jsonb, 18, true
) on conflict (slug) do nothing;

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lamb Mandi — 1 Serve', '1 Serve lamb mandi with salad & chutneys', 30, null, 'signature', '[]'::jsonb, 1, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lamb Mandi — 2 Serves', '2 Serves lamb mandi with salad & chutneys', 55, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lamb Mandi — 4 Serves', '4 Serves lamb mandi with salad & chutneys, bowl of chips & 1.25L drink', 110, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Quarter Chicken Mandi', 'Quarter chicken mandi with salad & chutneys', 22, null, null, '[]'::jsonb, 4, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Half Chicken Mandi', 'Half chicken mandi with salad & chutneys', 30, null, null, '[]'::jsonb, 5, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Full Chicken Mandi', 'Full chicken mandi with salad & chutneys', 50, null, 'popular', '[]'::jsonb, 6, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Family Chicken Mandi Platter', '2 full chicken mandis with salad & chutneys, bowl of chips & 1.25L drink', 100, null, null, '[]'::jsonb, 7, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Mix Family Mandi Deal', '1 Serve lamb mandi + 1 full chicken mandi with salad & chutneys, bowl of chips & 1.25L drink', 80, null, null, '[]'::jsonb, 8, true
from menu_categories where slug = 'mandi';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Chicken n Cheese Pocket', 'Chicken cheese pocket with mash potatoes & stir fry veggies', 24, null, null, '[]'::jsonb, 1, true
from menu_categories where slug = 'steaks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Chicken Steak', 'Chicken steak with roasted veggies & chips', 26, null, 'popular', '[]'::jsonb, 2, true
from menu_categories where slug = 'steaks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lamb Steak (Lamb Chops)', 'Lamb chops with mash potatoes & salad', 30, null, 'chef-special', '[]'::jsonb, 3, true
from menu_categories where slug = 'steaks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Fried Fish', 'Barramundi marinated in Pakistani style herbs & spices, with chips & salad', 24, null, null, '[]'::jsonb, 1, true
from menu_categories where slug = 'seafood';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Grilled Fish', 'Barramundi with chips & salad', 24, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'seafood';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Tempura Prawns', 'Tempura prawns (6 pcs) with chips & salad', 24, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'seafood';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'UFO Chicken Tikka Burger', 'Chargrilled chicken tikka on a toasted bun with fresh garnish and your choice of sauce — the Flying Saucer', 18, null, 'popular', '[]'::jsonb, 1, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'UFO Chicken Crunchy Burger', 'Golden crumbed crunchy chicken on a toasted bun — the Flying Saucer', 18, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'UFO Lamb Chapli Burger', 'Spiced lamb chapli patty on a toasted bun with fresh garnish — the Flying Saucer', 18, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'UFO Veggie Delight Burger', 'House veggie patty on a toasted bun — the Flying Saucer', 18, null, null, '["vegetarian"]'::jsonb, 4, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Anda Shami Burger', 'Traditional shami patty with fried egg, fresh garnish and house sauces', 24, null, null, '[]'::jsonb, 5, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Crunchy Bites Burger', 'Chicken or fish patty, crispy crumbed and loaded with house sauces and garnish', 24, null, null, '[]'::jsonb, 6, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Double Decker Burger', 'Double stacked chicken or lamb patties with cheese, fresh garnish and house sauces', 24, null, 'popular', '[]'::jsonb, 7, true
from menu_categories where slug = 'burgers';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Club Sandwich', 'Classic three-layer toasted bread with grilled chicken slices, fresh garnish and house sauces', 22, null, null, '[]'::jsonb, 1, true
from menu_categories where slug = 'sandwiches';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Vegetable Sandwich', 'Pressed, warm & melty — fresh vegetables in toasted bread', 15, null, null, '["vegetarian"]'::jsonb, 2, true
from menu_categories where slug = 'sandwiches';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Chicken Sandwich', 'Pressed, warm & melty — seasoned chicken in toasted bread', 18, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'sandwiches';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lamb Sandwich', 'Pressed, warm & melty — slow-roasted lamb in toasted bread', 18, null, null, '[]'::jsonb, 4, true
from menu_categories where slug = 'sandwiches';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Desi Paratha Roll — Chicken Tikka', 'Warm flaky paratha wrapped around chargrilled, spicy & vibrant chicken tikka', 15, null, 'popular', '[]'::jsonb, 1, true
from menu_categories where slug = 'wraps';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Desi Paratha Roll — Lamb', 'Warm flaky paratha wrapped around slow-roasted & deeply seasoned lamb', 15, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'wraps';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Desi Paratha Roll — Paneer / Vegetable', 'Warm flaky paratha wrapped around grilled paneer or vegetables with aromatic spices & tangy sauces', 15, null, null, '["vegetarian"]'::jsonb, 3, true
from menu_categories where slug = 'wraps';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Fajita Mix Vegetables', 'Loaded with seasoned fajita vegetables and mozzarella', 18, null, null, '["vegetarian"]'::jsonb, 1, true
from menu_categories where slug = 'rotiza';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Tasty Chicken Tikka', 'Chargrilled chicken tikka with all the classic toppings', 20, null, 'popular', '[]'::jsonb, 2, true
from menu_categories where slug = 'rotiza';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Cheesy Meat Lovers', 'A generous mix of seasoned meats with extra mozzarella', 22, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'rotiza';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Seafood', 'Prawns, fish and calamari with all the classic toppings', 24, null, 'chef-special', '[]'::jsonb, 4, true
from menu_categories where slug = 'rotiza';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Soup of the Day', 'Ask your server for today''s freshly made selection', 10, null, null, '[]'::jsonb, 1, true
from menu_categories where slug = 'pasta';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Baked Chicken Pasta', 'Pasta baked with tender chicken in a rich, seasoned sauce topped with melted cheese', 20, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'pasta';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Baked Veg Pasta', 'Pasta baked with fresh vegetables in a rich, seasoned sauce topped with melted cheese', 18, null, null, '["vegetarian"]'::jsonb, 3, true
from menu_categories where slug = 'pasta';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Juicy Drumsticks (Steam Roast)', 'Tender steam-roasted drumsticks seasoned to perfection', 12, '3 pcs $12 / 6 pcs $22', null, '[]'::jsonb, 1, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Juicy BBQ Drumettes', 'Succulent drumettes cooked in a rich BBQ sauce', 10, '3 pcs $10 / 6 pcs $18', 'popular', '[]'::jsonb, 2, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Crunchy Chicken Wings (Fried)', 'Golden crispy fried chicken wings', 6, '3 pcs $6 / 6 pcs $12', null, '[]'::jsonb, 3, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Loaded Fries — Meat Box', 'A cosy pile of cheesy golden fries. Add meat: Chicken, Lamb, Tikka Paneer or Kathi Sabzi', 18, null, 'popular', '[]'::jsonb, 4, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Nachos', 'Crispy nachos loaded with your choice of Chicken, Lamb or Vegetable topping', 18, null, null, '[]'::jsonb, 5, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Hot Chips', 'Seasoned hot chips', 6, 'Small $6 / Large $8', null, '[]'::jsonb, 6, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Chips & Nuggets', 'Crispy chips served with 6 golden nuggets', 12, null, null, '[]'::jsonb, 7, true
from menu_categories where slug = 'snacks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Pasta Salad', 'Elbow pasta tossed with garden veggies, herbs and zesty café-style dressing', 8, null, null, '["vegetarian"]'::jsonb, 1, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Greek Salad', 'Crunchy cucumbers, juicy tomatoes and leafy greens with your choice of dressing', 8, null, null, '["vegetarian"]'::jsonb, 2, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Russian Salad', 'Creamy mix of potatoes, peas, carrots, apples and mayonnaise, served chilled', 8, null, null, '["vegetarian"]'::jsonb, 3, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Bean Salad', 'Hearty bowl of mixed beans, crisp veggies and a light tangy drizzle', 8, null, null, '["vegetarian"]'::jsonb, 4, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Creamy Potato Salad', 'Creamy, fresh and perfectly seasoned potato goodness', 8, null, null, '["vegetarian"]'::jsonb, 5, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Egg Salad', 'Fresh boiled eggs mixed with creamy mayo, herbs and crisp veggies', 8, null, null, '["vegetarian"]'::jsonb, 6, true
from menu_categories where slug = 'salad-bar';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Biryani Rice', 'Fragrant spiced biryani rice', 6, null, null, '[]'::jsonb, 1, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Mandi Rice', 'Aromatic slow-cooked mandi rice', 8, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Potato Chips', 'House-seasoned potato chips', 6, null, null, '[]'::jsonb, 3, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Garlic Bread', '2 pieces of toasted garlic bread', 4, null, null, '["vegetarian"]'::jsonb, 4, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Bread', 'House bread', 3, null, null, '["vegetarian"]'::jsonb, 5, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Sauces', 'Garlic Mayo, Jalapeño, Ranch, BBQ, Chilli, Peri Peri, Thousand Island or Aioli', 3, null, null, '[]'::jsonb, 6, true
from menu_categories where slug = 'sides';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Whole Lamb Leg Roast', 'Whole lamb leg roast with mandi rice, salad and bread — serves a generous portion', 150, null, 'chef-special', '[]'::jsonb, 1, true
from menu_categories where slug = 'lamb-roast';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Whole Lamb or Goat Roast (Group)', 'Whole lamb or goat roast for 10–15 people with choice of mandi or biryani rice, salad and 4 breads', 650, null, null, '[]'::jsonb, 2, true
from menu_categories where slug = 'lamb-roast';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Khoya Kulfi', 'Homemade rich and creamy khoya kulfi', 6, null, null, '["vegetarian","gluten-free"]'::jsonb, 1, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Pistachio Kulfi', 'Homemade creamy kulfi infused with crushed pistachios', 7, null, 'popular', '["vegetarian","gluten-free"]'::jsonb, 2, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Mango Kulfi', 'Homemade creamy kulfi bursting with fresh mango flavour', 7, null, null, '["vegetarian","gluten-free"]'::jsonb, 3, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Rabri Falooda with Kulfi', 'Rich falooda with sweetened vermicelli, rose syrup and kulfi — a classic South Asian dessert', 10, null, 'chef-special', '["vegetarian"]'::jsonb, 4, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Gulab Jamun', '2 pieces of soft, syrup-soaked gulab jamun', 6, null, null, '["vegetarian"]'::jsonb, 5, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Gajar Halwa', 'Slow-cooked carrot halwa with ghee, cardamom and nuts — a timeless dessert', 8, null, null, '["vegetarian","gluten-free"]'::jsonb, 6, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Gajar Halwa with Gulab Jamun', 'The best of both — carrot halwa served with gulab jamun', 10, null, null, '["vegetarian"]'::jsonb, 7, true
from menu_categories where slug = 'desserts';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Almond', 'Creamy & nutty almond shake', 10, null, null, '["vegetarian"]'::jsonb, 1, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Blueberry', 'Creamy & fruity blueberry shake', 10, null, null, '["vegetarian"]'::jsonb, 2, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Coffee', 'Bold & creamy coffee shake', 10, null, null, '["vegetarian"]'::jsonb, 3, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Fig', 'Creamy & fruity fig shake', 10, null, null, '["vegetarian"]'::jsonb, 4, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'KitKat', 'Creamy & crispy KitKat shake', 10, null, null, '["vegetarian"]'::jsonb, 5, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Oreo', 'Creamy crushed Oreo shake', 10, null, null, '["vegetarian"]'::jsonb, 6, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Vanilla', 'Classic creamy vanilla shake', 10, null, null, '["vegetarian"]'::jsonb, 7, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Pistachio', 'Creamy & nutty pistachio shake', 10, null, null, '["vegetarian"]'::jsonb, 8, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Strawberry', 'Creamy & fruity strawberry shake', 10, null, null, '["vegetarian"]'::jsonb, 9, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Majoon', 'A rich date-based shake with nuts & dried fruits', 12, null, 'popular', '["vegetarian"]'::jsonb, 10, true
from menu_categories where slug = 'milkshakes';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Sugarcane Juice', 'Naturally sweet juice extracted from fresh sugarcane, served chilled', 10, null, null, '["vegan","gluten-free"]'::jsonb, 1, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Apple Juice', 'Refreshingly sweet juice made from crisp, freshly pressed apples', 10, null, null, '["vegan","gluten-free"]'::jsonb, 2, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Carrot Juice', 'Vibrant and naturally sweet carrot juice, packed with freshness', 10, null, null, '["vegan","gluten-free"]'::jsonb, 3, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Celery Juice', 'Light and detoxifying juice with a mild, earthy flavour', 10, null, null, '["vegan","gluten-free"]'::jsonb, 4, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Go Green Juice', 'A nutritious green blend of leafy vegetables & fruits for a revitalising boost', 10, null, null, '["vegan","gluten-free"]'::jsonb, 5, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Orange Juice', 'Bright & citrusy juice made from sun-ripened oranges, packed with vitamin C', 10, null, null, '["vegan","gluten-free"]'::jsonb, 6, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Beetroot Juice', 'Earthy & slightly sweet juice from beetroots, rich in nutrients and antioxidants', 10, null, null, '["vegan","gluten-free"]'::jsonb, 7, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Watermelon Juice', 'Hydrating juice with a subtly sweet flavour from ripe, juicy watermelon', 10, null, null, '["vegan","gluten-free"]'::jsonb, 8, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Mixed Fruit Juice', 'A delicious assortment of seasonal fruits blended into a refreshing and colourful juice', 12, null, null, '["vegan","gluten-free"]'::jsonb, 9, true
from menu_categories where slug = 'juices';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Karak Chai', 'Strong, spiced tea brewed with milk — full of flavour', 5, null, 'popular', '["vegetarian","gluten-free"]'::jsonb, 1, true
from menu_categories where slug = 'hot-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Doodh Pati Chai', 'Traditional all-milk tea simmered with tea leaves and cardamom', 6, null, null, '["vegetarian","gluten-free"]'::jsonb, 2, true
from menu_categories where slug = 'hot-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Kashmiri Chai', 'Fragrant pink tea made with special Kashmiri green tea, milk and cardamom', 7, null, 'chef-special', '["vegetarian","gluten-free"]'::jsonb, 3, true
from menu_categories where slug = 'hot-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Can of Drink 375ml', 'Coke, Coke Zero, Sprite or Fanta', 4, null, null, '["vegan"]'::jsonb, 1, true
from menu_categories where slug = 'soft-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Bottle 600ml', 'Coke, Coke Zero, Sprite or Fanta', 5, null, null, '["vegan"]'::jsonb, 2, true
from menu_categories where slug = 'soft-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Lemon Lime Bitters', 'Classic lemon lime bitters', 5, null, null, '["vegan"]'::jsonb, 3, true
from menu_categories where slug = 'soft-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Ginger Beer', 'Refreshing ginger beer', 5, null, null, '["vegan"]'::jsonb, 4, true
from menu_categories where slug = 'soft-drinks';

insert into menu_items (category_id, name, description, price, price_display, badge, dietary, display_order, is_available)
select id, 'Spring Water 600ml', 'Still spring water', 3, null, null, '["vegan","gluten-free"]'::jsonb, 5, true
from menu_categories where slug = 'soft-drinks';

-- Homepage "Signature Dishes" curation
update menu_items set is_featured = true, image_url = '/lamb-mandi.jpeg'
where name = 'Lamb Mandi — 1 Serve' and category_id = (select id from menu_categories where slug = 'mandi');

update menu_items set is_featured = true, image_url = '/chicken-steak.jpeg'
where name = 'Chicken Steak' and category_id = (select id from menu_categories where slug = 'steaks');

update menu_items set is_featured = true, image_url = '/desi-paratha-roll.jpeg'
where name = 'Desi Paratha Roll — Chicken Tikka' and category_id = (select id from menu_categories where slug = 'wraps');

update menu_items set is_featured = true
where name = 'Tasty Chicken Tikka' and category_id = (select id from menu_categories where slug = 'rotiza');

