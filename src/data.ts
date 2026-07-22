import { Product, DeliveryZone } from './types';

export const CATEGORIES = [
  'All',
  'Fresh Produce',
  'Grocery Staples',
  'Bakery & Breakfast',
  'Meat & Seafood',
  'Drinks & Beverages',
  'Personal & Home Care'
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'ibadan-central',
    name: 'Ibadan Central',
    fee: 1500,
    description: 'Bodija, Ring Road, Dugbe, Agodi, Iyaganku, etc.',
    timeline: 'Same Day Delivery (within 2 - 4 hours)'
  },
  {
    id: 'ibadan-metro',
    name: 'Ibadan Metro North & South',
    fee: 2500,
    description: 'UI, Samonda, Akobo, Challenge, Oluyole, Jericho, etc.',
    timeline: 'Same Day Delivery (within 3 - 5 hours)'
  },
  {
    id: 'ibadan-outskirts',
    name: 'Ibadan Outskirts & Suburbs',
    fee: 3500,
    description: 'Moniya, Ojoo, Egbeda, Ido, Olodo, etc.',
    timeline: 'Next Day Delivery (within 24 hours)'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Fresh Abuja Yam Tuber',
    description: 'Large, starchy, freshly harvested organic Abuja yam tuber. Perfect for frying, boiling, or making pounded yam.',
    price: 4500,
    category: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    stock: 25,
    unit: '1 Tuber (approx. 2.5kg)',
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Yellow Ripe Plantains (Bunch)',
    description: 'Sweet, firm, and perfectly yellow ripe plantains. Excellent for dodo (fried plantain) or roasting (boli).',
    price: 2800,
    category: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1566393028639-d108a42c46a7?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    stock: 40,
    unit: '1 Bunch (5-7 pieces)',
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Plum Tomatoes (Basket)',
    description: 'Freshly harvested, bright red plum tomatoes (Eko/Hausa variety). Perfect for your everyday stews and sauces.',
    price: 6500,
    category: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
    rating: 4.5,
    stock: 15,
    unit: '1 Medium Basket',
    featured: false
  },
  {
    id: 'prod-4',
    name: "Mama's Pride Parboiled Rice (5kg)",
    description: 'Premium long-grain parboiled Nigerian rice. Stone-free, fast to cook, and non-sticky, perfect for party Jollof rice.',
    price: 9200,
    category: 'Grocery Staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    stock: 50,
    unit: '5kg bag',
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Golden Penny Spaghetti (500g)',
    description: 'Enriched long-grain pasta made from high-quality durum wheat. Non-sticky and cooks in just 10 minutes.',
    price: 950,
    category: 'Grocery Staples',
    image: 'https://images.unsplash.com/photo-1612966608997-300410bcb741?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    stock: 120,
    unit: '500g Pack',
    featured: false
  },
  {
    id: 'prod-6',
    name: 'Indomie Instant Noodles - Onion Chicken (Box)',
    description: 'A full carton of Nigeria\'s favorite instant noodles with a rich, aromatic onion-chicken flavor seasoning pack included.',
    price: 8500,
    category: 'Grocery Staples',
    image: 'https://images.unsplash.com/photo-1612966608997-300410bcb741?auto=format&fit=crop&q=80&w=600', // standard noodle/pasta style placeholder or clean box
    rating: 4.8,
    stock: 35,
    unit: 'Carton (40 x 70g)',
    featured: true
  },
  {
    id: 'prod-7',
    name: 'Premium Butter Sliced Bread',
    description: 'Freshly baked daily in our in-store bakery. Super soft, sweet, and enriched with premium butter and milk.',
    price: 1200,
    category: 'Bakery & Breakfast',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    stock: 60,
    unit: '1 Loaf (800g)',
    featured: true
  },
  {
    id: 'prod-8',
    name: 'Peak Full Cream Milk Powder (350g)',
    description: 'Rich, creamy, and instant full cream milk powder. Packaged in a convenient resealable pouch. Generation after generation.',
    price: 3600,
    category: 'Bakery & Breakfast',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    stock: 45,
    unit: '350g Refill Pouch',
    featured: false
  },
  {
    id: 'prod-9',
    name: 'Milo Chocolate Beverage Powder (400g)',
    description: 'Active-Go chocolate malt beverage. Provides essential nutrients to help release energy from foods.',
    price: 3200,
    category: 'Bakery & Breakfast',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    stock: 40,
    unit: '400g Tin',
    featured: false
  },
  {
    id: 'prod-10',
    name: 'Fresh Chicken Gizzard (1kg)',
    description: 'Well-cleaned, premium fresh chicken gizzards. Frozen fresh under hygienic conditions. Ready for boiling and frying.',
    price: 4800,
    category: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600',
    rating: 4.4,
    stock: 18,
    unit: '1kg Pack',
    featured: false
  },
  {
    id: 'prod-11',
    name: 'Frozen Chicken Drumsticks (1kg)',
    description: 'Juicy and tender chicken drumsticks. Processed cleanly, frozen immediately to retain freshness.',
    price: 5500,
    category: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    stock: 22,
    unit: '1kg Pack',
    featured: true
  },
  {
    id: 'prod-12',
    name: 'Fresh Catfish (Large)',
    description: 'Live catfish straight from our tanks, scaled and gutted professionally upon order. Highly popular for point-and-kill pepper soup.',
    price: 6000,
    category: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    stock: 12,
    unit: '1 Live Fish (approx. 1.5kg)',
    featured: true
  },
  {
    id: 'prod-13',
    name: 'Maltina Can Drink (6-Pack)',
    description: 'Nigeria\'s leading non-alcoholic malt drink. Smooth, nourishing, and rich in B-vitamins for active body vitality.',
    price: 2400,
    category: 'Drinks & Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    stock: 80,
    unit: '6 x 33cl Cans',
    featured: false
  },
  {
    id: 'prod-14',
    name: 'Chi Exotic Pineapple & Coconut (1L)',
    description: 'Indulge yourself with the tropical blend of pineapple and creamy coconut. Best served chilled.',
    price: 1500,
    category: 'Drinks & Beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    stock: 55,
    unit: '1 Litre Pack',
    featured: false
  },
  {
    id: 'prod-15',
    name: 'Sunlight 2-in-1 Detergent Spring (900g)',
    description: 'Combines the cleaning power of Sunlight with the sensory experience of a burst of spring freshness. Gentle on colors.',
    price: 2600,
    category: 'Personal & Home Care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    stock: 30,
    unit: '900g Pack',
    featured: false
  }
];
