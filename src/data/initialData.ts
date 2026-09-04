import { Package, Theme, Category, Booking, AddOn, PromoCode } from '../types';

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Package',
    description: 'Perfect for intimate family gatherings and small celebration parties.',
    full_description: 'Our Basic Package provides everything you need to host a warm, vibrant, and fun birthday party for close friends and family. Complete with high-quality balloon setups, background banners, and clear sound music system.',
    price: 150,
    max_guests: 15,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
    popular: false,
    category: 'Kids Birthday Party',
    includes: [
      'Basic Decorations',
      'Balloons Setup',
      'Birthday Banner',
      'Music System',
      'Basic Seating & Tables'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    description: 'Our most popular choice with customized theme decorations and delicious treats!',
    full_description: 'Step up your party game with customized theme styling, a handcrafted delicious birthday cake, curated party games, and a dedicated photo spot to capture timeless memories.',
    price: 350,
    max_guests: 30,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    popular: true,
    category: 'Kids Birthday Party',
    includes: [
      'Theme Decorations',
      'Customized Birthday Cake',
      'Snacks and Refreshing Drinks',
      'Pro Music System & Playlist',
      'Party Games & Coordinator',
      'Photography Photo Corner'
    ]
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Package',
    description: 'An all-inclusive grand celebration with live entertainment, catering & pro photography.',
    full_description: 'Experience pure magic with our Luxury Birthday Package. Includes bespoke immersive styling, live party entertainment, full food & beverage catering, pro photographer coverage, and a luxury multi-tier customized cake.',
    price: 600,
    max_guests: 50,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
    popular: false,
    category: 'Adult Birthday Party',
    includes: [
      'Premium Custom Decorations',
      'Fully Customized Party Theme',
      'Professional Photography & Editing',
      'Live Entertainment & Performer',
      'Deluxe Food and Drinks Catering',
      'Premium Multi-tier Designer Cake',
      'Interactive Party Games & Host'
    ]
  }
];

export const INITIAL_THEMES: Theme[] = [
  {
    id: 'theme-unicorn',
    name: 'Unicorn Theme',
    description: 'Magical pastel colors, glittery horns, rainbow balloons, and fairytale decor.',
    image: '/theme_unicorn.jpg',
    tag: 'Magical & Pastel'
  },
  {
    id: 'theme-superhero',
    name: 'Superhero Theme',
    description: 'Action-packed comic book aesthetics, bold hero emblems, and city skyline backdrops.',
    image: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?auto=format&fit=crop&q=80&w=600',
    tag: 'Action & Adventure'
  },
  {
    id: 'theme-princess',
    name: 'Princess Theme',
    description: 'Royal tiaras, elegant drapery, pink & gold accents, and fairy-godmother touches.',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=600',
    tag: 'Royal & Elegant'
  },
  {
    id: 'theme-dinosaur',
    name: 'Dinosaur Theme',
    description: 'Jurassic jungle vines, dino footprints, lush greenery, and exciting safari vibes.',
    image: '/theme_dinosaur.jpg',
    tag: 'Jungle & Safari'
  },
  {
    id: 'theme-rainbow',
    name: 'Rainbow Theme',
    description: 'Burst of vivid colors, rainbow arch balloon installations, and happy cheerful energy.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=600',
    tag: 'Bright & Vibrant'
  },
  {
    id: 'theme-space',
    name: 'Space Theme',
    description: 'Cosmic galaxy lights, starry backdrops, rocket ships, and glowing planet props.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    tag: 'Cosmic & Sci-Fi'
  },
  {
    id: 'theme-floral',
    name: 'Floral Theme',
    description: 'Blooming flower arches, garden party aesthetics, soft pastels, and organic greenery.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=600',
    tag: 'Chic & Natural'
  },
  {
    id: 'theme-blackgold',
    name: 'Black and Gold Theme',
    description: 'Sophisticated luxury, shimmering metallic gold balloons, black satin, and night glamour.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    tag: 'Luxury & Elegant'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-kids',
    name: 'Kids Birthday Party',
    slug: 'kids',
    description: 'Fun, active, and colorful parties tailored for young explorers and dreamers aged 3-12.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
    tag: 'Ages 3-12'
  },
  {
    id: 'cat-teen',
    name: 'Teen Birthday Party',
    slug: 'teen',
    description: 'Trendy music, photo booths, glow lights, and cool chill vibes designed for teenagers.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    tag: 'Ages 13-19'
  },
  {
    id: 'cat-adult',
    name: 'Adult Birthday Party',
    slug: 'adult',
    description: 'Elegant cocktail setups, milestone birthday decor, DJ sound, and gourmet catering.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    tag: 'Milestones & VIP'
  },
  {
    id: 'cat-first',
    name: 'First Birthday Celebration',
    slug: 'first-birthday',
    description: 'Gentle pastel aesthetic, smash cake photography spots, and safe soft-play setups.',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=600',
    tag: 'Turning 1!'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-8901',
    user_id: 'usr-1',
    package_id: 'pkg-premium',
    package_name: 'Premium Package',
    theme_id: 'theme-unicorn',
    theme_name: 'Unicorn Theme',
    birthday_person_name: 'Sophia Miller',
    customer_name: 'Emma Miller',
    email: 'emma.miller@example.com',
    phone: '+1 (555) 234-5678',
    event_date: '2026-09-15',
    guests: 25,
    selected_addons: ['addon-cake', 'addon-arch'],
    addons_price: 90,
    promo_code: 'POP2026',
    discount_amount: 66,
    special_request: 'Please make sure cake is gluten-free. Requesting pink and purple balloon arch.',
    status: 'Confirmed',
    estimated_price: 374,
    created_at: '2026-08-28T14:32:00Z'
  },
  {
    id: 'BK-8902',
    user_id: 'usr-1',
    package_id: 'pkg-luxury',
    package_name: 'Luxury Package',
    theme_id: 'theme-blackgold',
    theme_name: 'Black and Gold Theme',
    birthday_person_name: 'Alexander Ross',
    customer_name: 'David Ross',
    email: 'david.ross@example.com',
    phone: '+1 (555) 987-6543',
    event_date: '2026-09-22',
    guests: 45,
    special_request: 'Require live saxophonist performance and champagne fountain table setup.',
    status: 'Pending',
    estimated_price: 600,
    created_at: '2026-09-01T09:15:00Z'
  },
  {
    id: 'BK-8899',
    user_id: 'usr-1',
    package_id: 'pkg-basic',
    package_name: 'Basic Package',
    theme_id: 'theme-dinosaur',
    theme_name: 'Dinosaur Theme',
    birthday_person_name: 'Liam Vance',
    customer_name: 'Sarah Vance',
    email: 'sarah.vance@example.com',
    phone: '+1 (555) 345-6789',
    event_date: '2026-08-20',
    guests: 12,
    special_request: 'Extra dinosaur banners if possible.',
    status: 'Cancelled',
    estimated_price: 150,
    created_at: '2026-08-10T11:00:00Z'
  }
];

export const INITIAL_ADDONS: AddOn[] = [
  {
    id: 'addon-cake',
    name: 'Custom Birthday Cake',
    description: '2-tier handcrafted designer birthday cake in your choice of flavor.',
    price: 50,
    icon: 'Cake'
  },
  {
    id: 'addon-arch',
    name: 'Balloon Arch & Garland',
    description: 'Grand organic balloon arch entrance matching your party colors.',
    price: 40,
    icon: 'Sparkles'
  },
  {
    id: 'addon-magician',
    name: 'Live Magician Performance',
    description: '45-minute interactive comedy magic show for kids and family.',
    price: 120,
    icon: 'Wand2'
  },
  {
    id: 'addon-photobooth',
    name: 'Photo Booth with Instant Prints',
    description: 'Unlimited fun photo prints with themed props & digital gallery.',
    price: 80,
    icon: 'Camera'
  },
  {
    id: 'addon-snacks',
    name: 'Snack & Refreshment Bar',
    description: 'Popcorn station, cotton candy machine, and fresh fruit juices.',
    price: 60,
    icon: 'Utensils'
  },
  {
    id: 'addon-dj',
    name: 'Pro DJ & Disco Lighting',
    description: 'Professional DJ, party music playlist, moving lights & fog machine.',
    price: 100,
    icon: 'Music'
  }
];

export const AVAILABLE_PROMO_CODES: PromoCode[] = [
  {
    code: 'POP2026',
    discountType: 'percentage',
    discountValue: 15,
    description: '15% OFF Special Promotional Discount'
  },
  {
    code: 'PARTY10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% OFF Welcome Coupon'
  },
  {
    code: 'BIRTHDAY20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% OFF Birthday Special Offer'
  },
  {
    code: 'SAVE50',
    discountType: 'fixed',
    discountValue: 50,
    description: '€50 Instant Flat Discount'
  }
];

