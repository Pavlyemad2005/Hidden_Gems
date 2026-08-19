"use client";

import React, { useState, useMemo } from "react";

// Official WhatsApp number
const HIDDEN_GEMS_WHATSAPP_NUMBER = "201278886151";

// --- Types ---
type CategoryType = "all" | "day-trips" | "overnight" | "events" | "workshops";

interface GemItem {
  id: string;
  category: "day-trips" | "overnight" | "events" | "workshops";
  categoryLabel: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  location: string;
  targetAudience?: string;
  image: string;
  highlights: string[];
  itinerary: { step: string; title: string; desc: string }[];
  included: string[];
}

// --- Official Catalog Data (100% Authentic Photos from Posters) ---
const GEMS_DATA: GemItem[] = [
  // ================= WORKSHOPS =================
  {
    id: "color-your-character",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Creative Arts",
    title: "Color Your Own Character",
    subtitle: "Bring your imagination to life",
    description:
      "A vibrant hands-on character illustration session where participants design, color, and bring their unique characters to life using markers, colored pencils, and custom craft accessories. Perfect for kids, teens, and youth groups.",
    duration: "2 - 3 Hours",
    location: "Studio / School / Private Venue",
    targetAudience: "Kids, Families & Youth Camps",
    image: "/photos/color-character.png",
    highlights: [
      "Custom character illustration templates & guided drawing steps",
      "All professional coloring supplies, sketchbooks, and markers",
      "Take-home framed character artwork",
      "Fun storytelling and creative sharing circle",
    ],
    itinerary: [
      {
        step: "Part 1",
        title: "Imagination & Sketching",
        desc: "Brainstorming character superpowers, personality traits, and outline sketches.",
      },
      {
        step: "Part 2",
        title: "Coloring & Shading Techniques",
        desc: "Learning color harmony, gradient blending, and detailed background art.",
      },
      {
        step: "Part 3",
        title: "Masterpiece Showcase",
        desc: "Framing the final character creation and celebratory group photos.",
      },
    ],
    included: [
      "Full premium art supplies & custom illustration sheets",
      "Professional art instructor & creative facilitators",
      "Protective aprons and take-home gift frames",
    ],
  },
  {
    id: "mirror-painting",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Aesthetic Craft",
    title: "Mirror Painting",
    subtitle: "Create your own unique reflection",
    description:
      "Transform decorative glass mirrors into artistic statements using acrylics, glass paints, coastal wave textures, and floral accents. A deeply relaxing and creative aesthetic session.",
    duration: "2.5 Hours",
    location: "Garden / Rooftop / Private Venue",
    targetAudience: "Teens, Adults, Mother & Child",
    image: "/photos/mirror-painting.png",
    highlights: [
      "Custom framed aesthetic round and arch mirrors",
      "Specialized glass paints, foam brushes, and textured paste",
      "Coastal wave, floral, and celestial painting techniques",
      "Ready-to-hang aesthetic mirror to take home",
    ],
    itinerary: [
      {
        step: "Step 1",
        title: "Concept & Stenciling",
        desc: "Choosing design themes — ocean waves, botanical vines, or celestial stars.",
      },
      {
        step: "Step 2",
        title: "Layering & Texturing",
        desc: "Applying textured paste and vibrant glass-safe acrylic pigments.",
      },
      {
        step: "Step 3",
        title: "Finishing & Sealant",
        desc: "Applying protective gloss coat and custom hanging packaging.",
      },
    ],
    included: [
      "Individual high-quality framed mirrors for each guest",
      "All paints, textured mediums, and embellishments",
      "Protective packaging box for safe transport home",
    ],
  },
  {
    id: "arts-and-crafts",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Hands-on Making",
    title: "Arts & Crafts & Beading",
    subtitle: "Make, create, and take your masterpiece home",
    description:
      "An inspiring hands-on creative session featuring custom inspirational letter beading, personalized jewelry, pottery sculpting, and mixed-media crafting designed to spark joyful expression.",
    duration: "2 - 3 Hours",
    location: "Flexible / Indoor & Outdoor",
    targetAudience: "All Ages & Team Events",
    image: "/photos/arts-crafts.png",
    highlights: [
      "Inspirational custom word bracelets, charms, and necklaces",
      "Clay sculpting and decorative pottery modeling",
      "Wide selection of gold beads, pearls, crystals, and letter stones",
      "Complete set of custom crafted items to take home",
    ],
    itinerary: [
      {
        step: "Session 1",
        title: "Design Inspiration & Materials Selection",
        desc: "Choosing affirmative words, charms, and bead palettes.",
      },
      {
        step: "Session 2",
        title: "Crafting & Assembly",
        desc: "Precision beading, knotting techniques, and jewelry making.",
      },
      {
        step: "Session 3",
        title: "Personalized Packaging",
        desc: "Gift pouch packaging with handwritten dedication cards.",
      },
    ],
    included: [
      "All beads, cords, charms, and crafting tools",
      "Instructor guidance & creative support",
      "Bespoke jewelry gift pouches",
    ],
  },
  {
    id: "character-building",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Personal Growth",
    title: "Character Building",
    subtitle: "Empowering confidence, leadership, and emotional strength",
    description:
      "Interactive developmental workshops focused on leadership skills, team communication, resilience, active empathy, and discovering inner potential through engaging group simulations and challenges.",
    duration: "2 - 4 Hours / Half-Day",
    location: "Schools / Academies / Retreats",
    targetAudience: "Students, Schools & Youth Camps",
    image: "/photos/character-building.png",
    highlights: [
      "Gamified team leadership and problem-solving simulations",
      "Public speaking, active listening, and peer collaboration exercises",
      "Emotional intelligence and self-confidence building",
      "Participation certificates and personal action roadmap",
    ],
    itinerary: [
      {
        step: "Part 1",
        title: "Self-Discovery & Values",
        desc: "Interactive exercises identifying personal strengths and core character values.",
      },
      {
        step: "Part 2",
        title: "Team Trust & Resilience",
        desc: "Cooperative group challenges overcoming obstacles together.",
      },
      {
        step: "Part 3",
        title: "Empowerment Circle",
        desc: "Reflective sharing, affirmations, and actionable growth commitments.",
      },
    ],
    included: [
      "Custom leadership activity kits and workbooks",
      "Certified youth developmental facilitators",
      "Certificates of achievement",
    ],
  },
  {
    id: "career-coaching",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Future Pathways",
    title: "Career Coaching",
    subtitle: "Uncovering natural talents and navigating future career paths",
    description:
      "Guided career discovery and mentorship sessions for students and young adults. Identify personal passions, explore modern career options, practice professional skills, and build a clear future roadmap.",
    duration: "2 - 3 Hours / Full-Day Sessions",
    location: "Schools / Universities / Private Studios",
    targetAudience: "High School & University Students, Young Adults",
    image: "/photos/career-coaching.png",
    highlights: [
      "Personality & career aptitude assessment tools",
      "Exploration of modern industry sectors and future jobs",
      "Resume building, interview skills, and professional etiquette",
      "1-on-1 mentorship Q&A and personalized roadmap",
    ],
    itinerary: [
      {
        step: "Session 1",
        title: "Aptitude & Passion Mapping",
        desc: "Assessing natural skills, personality types, and career affinities.",
      },
      {
        step: "Session 2",
        title: "Industry Deep Dive",
        desc: "Exploring emerging career sectors, tech, business, and creative fields.",
      },
      {
        step: "Session 3",
        title: "Action Plan & Mentorship",
        desc: "Crafting educational goals and direct Q&A with experienced mentors.",
      },
    ],
    included: [
      "Personalized career assessment profiles and guidebooks",
      "Experienced career coaches and industry mentors",
      "Future career milestone roadmap",
    ],
  },

  // ================= DAY TRIPS =================
  {
    id: "dragon-island",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Active Fun",
    title: "Dragon Island",
    subtitle: "Inflatable water courses, obstacle games, and non-stop energy",
    description:
      "A thrilling action-packed day trip featuring giant obstacle courses, inflatable challenges, foam parties, and fun group competitions in a safe, fully supervised park environment.",
    duration: "Full Day",
    location: "Dragon Park / Le Lac Du Caire",
    targetAudience: "Schools, Youth & Family Fun",
    image: "/photos/dragon-island.png",
    highlights: [
      "Giant dragon-themed obstacle circuits & climbing towers",
      "Team challenges, relay races, and color festivals",
      "Dedicated supervision by enthusiastic Hidden Gems hosts",
      "Full meal catering and music throughout the day",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Arrival & Dragon Challenge Kick-off",
        desc: "Team division, colored bandanas, and obstacle course races.",
      },
      {
        step: "Afternoon",
        title: "Games & Foam Festivities",
        desc: "Inflatable water slip & slides, tug-of-war, and lunch feast.",
      },
    ],
    included: [
      "Round-trip air-conditioned transport",
      "All park games and attraction entries",
      "Full lunch meal & unlimited water",
      "First aid and dedicated team leader supervision",
    ],
  },
  {
    id: "mario-ropes",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · High Adrenaline",
    title: "Mario Ropes",
    subtitle: "Ropes courses, ziplines, and high-altitude courage",
    description:
      "An exhilarating outdoor challenge at the cliffside ropes park. Navigate suspension bridges, high-wire obstacles, wall climbing, and zip lining with full certified safety gear and professional coaches.",
    duration: "Full Day",
    location: "Mokattam / Saint Simon Clifftops, Cairo",
    targetAudience: "Schools, Families & Corporate Teams",
    image: "/photos/mario-ropes.png",
    highlights: [
      "Multi-level high and low ropes obstacle courses",
      "Rock climbing wall and giant swing adrenaline rush",
      "Certified European safety harnesses and expert guides",
      "Scenic cliffside BBQ lunch and group team building games",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Safety Briefing & Low Ropes Warm-up",
        desc: "Gear fitting, safety rules, and agility icebreaker games.",
      },
      {
        step: "Midday",
        title: "High Ropes & Zipline Circuit",
        desc: "Overcoming aerial obstacles, suspension bridges, and cliff ziplines.",
      },
      {
        step: "Afternoon",
        title: "Team Lunch & Celebration",
        desc: "Fresh open-air lunch, photo captures, and awards ceremony.",
      },
    ],
    included: [
      "Private VIP round-trip transportation",
      "Full access to all ropes courses and ziplines",
      "Complete safety gear & certified instructors",
      "Lunch, snacks, and fresh refreshments",
    ],
  },
  {
    id: "kayak-nile",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Water Sport",
    title: "Kayak",
    subtitle: "Glide through the calm waters of the Nile at golden hour",
    description:
      "Experience Cairo from a breathtaking new angle. Paddle in double or single kayaks along scenic river islands, learn kayaking strokes from champions, and enjoy breakfast or sunset drinks on the water.",
    duration: "Half Day (Morning / Sunset)",
    location: "Zamalek / Maadi Nile Banks",
    targetAudience: "Couples, Friends & Groups",
    image: "/photos/kayak.png",
    highlights: [
      "Guided Nile kayaking tour around calm secluded river islands",
      "Safety briefing, life jackets, and rescue boat companion",
      "Sunset photo sessions from the center of the Nile",
      "Fresh breakfast or iced drinks by the private club dock",
    ],
    itinerary: [
      {
        step: "Step 1",
        title: "Dockside Warm-up & Safety",
        desc: "Fitting life jackets, paddle technique instruction, and boat pairing.",
      },
      {
        step: "Step 2",
        title: "The Island Circuit",
        desc: "Scenic paddling route through natural lotus channels and open water.",
      },
      {
        step: "Step 3",
        title: "Golden Hour Rest & Refreshments",
        desc: "Relaxing at dockside lounge with fresh smoothies and tea.",
      },
    ],
    included: [
      "Single/Double kayaks and lightweight carbon paddles",
      "Certified safety life vests & guide instructors",
      "Dockside breakfast or sunset drink",
    ],
  },
  {
    id: "museum-tour",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Cultural Discovery",
    title: "Museum",
    subtitle: "Unraveling the wonders of ancient Egypt with master historians",
    description:
      "A private guided exploration of Egypt's greatest historical treasures (NMEC / Grand Egyptian Museum / Tahrir Museum) curated with engaging storytelling for all generations.",
    duration: "Half / Full Day",
    location: "Grand Egyptian Museum & Giza",
    targetAudience: "Schools, Families & Cultural Explorers",
    image: "/photos/museum.png",
    highlights: [
      "Private Egyptologist historian guide tailored to the group",
      "Royal mummies hall and King Tutankhamun galleries",
      "Interactive scavenger hunt for kids and students",
      "Lunch at heritage palace restaurant",
    ],
    itinerary: [
      {
        step: "Part 1",
        title: "The Royal Treasures",
        desc: "Guided discovery through colossal statues and golden relics.",
      },
      {
        step: "Part 2",
        title: "Interactive Storytelling Walk",
        desc: "Decoding hieroglyphics and secrets of ancient engineering.",
      },
    ],
    included: [
      "All VIP fast-track museum entry tickets",
      "Private Egyptologist historian speaker",
      "Comfortable air-conditioned transport and lunch",
    ],
  },
  {
    id: "fayoum-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Oasis Nature",
    title: "Fayoum",
    subtitle: "Wadi El Rayan waterfalls, sandboarding, and Tunis pottery village",
    description:
      "A complete desert oasis escape just 90 minutes from Cairo. Visit Egypt's only natural waterfalls, sandboard on soft dunes around Magic Lake, and enjoy lunch at a scenic lakefront Bedouin lodge.",
    duration: "Full Day (7 AM – 9 PM)",
    location: "Fayoum & Wadi El Rayan",
    targetAudience: "Families, Friends & Schools",
    image: "/photos/fayoum.png",
    highlights: [
      "Wadi El Rayan waterfalls & wooden felucca boat ride",
      "Sandboarding on dunes overlooking Magic Lake",
      "4x4 desert safari across ancient fossil valleys",
      "Delicious Bedouin grilled lunch and Tunis pottery village tour",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Departure & Waterfalls",
        desc: "Scenic drive to Fayoum, visiting the waterfalls and morning lake sail.",
      },
      {
        step: "Midday",
        title: "Magic Lake Dunes & Sandboarding",
        desc: "4x4 safari, sandboarding thrills, and tea by the dunes.",
      },
      {
        step: "Evening",
        title: "Bedouin Feast & Tunis Village",
        desc: "Fresh BBQ dinner and handmade pottery shopping in Tunis village.",
      },
    ],
    included: [
      "Private VIP air-conditioned bus",
      "4x4 safari vehicles and sandboards",
      "All national park permits and boat ride",
      "Full Bedouin lunch meal and beverages",
    ],
  },
  {
    id: "alexandria-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Mediterranean Charm",
    title: "Alexandria",
    subtitle: "Historic Citadel, Stanley Bridge, and iconic Mediterranean seafood",
    description:
      "Breathe in the Mediterranean breeze on a rich day journey across the Pearl of the Mediterranean. Explore the Citadel of Qaitbay, Bibliotheca Alexandrina, Stanley Bridge, and authentic Greek/Alexandrian seaside dining.",
    duration: "Full Day (6:30 AM – 9:30 PM)",
    location: "Alexandria & Stanley Bay",
    targetAudience: "Families, Friends & Schools",
    image: "/photos/alexandria.png",
    highlights: [
      "Qaitbay Citadel & panoramic Mediterranean sea views",
      "Bibliotheca Alexandrina guided discovery",
      "Sunset photo walk over Stanley Bridge",
      "Fresh Alexandrian seafood banquet by the sea",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Coastal Drive & Citadel",
        desc: "Scenic highway travel, fortress tour, and seaside corniche walk.",
      },
      {
        step: "Afternoon",
        title: "Bibliotheca & Seafood Lunch",
        desc: "Library tour, world-famous fresh fish meal, and ice cream stroll.",
      },
      {
        step: "Sunset",
        title: "Stanley Bridge & Departure",
        desc: "Golden hour photo session by Stanley Bridge and return drive.",
      },
    ],
    included: [
      "VIP Private highway transportation",
      "All museum and citadel entry tickets",
      "Deluxe seafood lunch banquet",
    ],
  },
  {
    id: "sokhna-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Coastal Day Use",
    title: "Sokhna",
    subtitle: "Crystal Red Sea waters, private beach lounge & fresh sea breeze",
    description:
      "An effortless day escape just 60 minutes from New Cairo. Relax on private sandy beaches, swim in warm turquoise waters, and enjoy a day-use chalet or resort pass with fresh meals and water sports.",
    duration: "Full Day",
    location: "Ain Sokhna, Red Sea Coast",
    targetAudience: "Families, Friends & Corporate Teams",
    image: "/photos/sokhna.png",
    highlights: [
      "Private beachfront day-use access at premier coastal resort",
      "Swimming pool, sandy beach umbrellas, and sea relaxation",
      "Jet ski / banana boat water activity options",
      "Open buffet or fresh grilled seafood lunch",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Beach Arrival & Sunbathing",
        desc: "Resort check-in, morning swim, and beach loungers.",
      },
      {
        step: "Afternoon",
        title: "Lunch & Water Fun",
        desc: "Resort lunch feast, water games, and golden hour sunset.",
      },
    ],
    included: [
      "Round-trip air-conditioned transportation",
      "Full resort entrance and beach facilities",
      "Full lunch meal & fresh refreshments",
    ],
  },
  {
    id: "portsaid-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Canal Heritage",
    title: "Port Said",
    subtitle: "Iconic historic lighthouse, ferry crossings, and Mediterranean charm",
    description:
      "Discover the unique Franco-Egyptian architecture, the world-famous Suez Canal entry lighthouse, historical ferry cruises, and legendary Port Said street food and seafood.",
    duration: "Full Day",
    location: "Port Said & Port Fouad",
    targetAudience: "Cultural Explorers & Families",
    image: "/photos/portsaid.png",
    highlights: [
      "Historic Port Said Lighthouse & Suez Canal Promenade",
      "Free ferry boat crossing to Port Fouad and Salt Mountains",
      "Vintage 19th-century wooden architectural walking tour",
      "Authentic Port Said seafood and Cassata sweets",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Canal Promenade & Lighthouse",
        desc: "Arrive in Port Said, walk along the world shipping lane and historic lighthouse.",
      },
      {
        step: "Afternoon",
        title: "Port Fouad Ferry & Salt Mountains",
        desc: "Take the classic ferry to Port Fouad, photo stops at Salt Mountain, and lunch feast.",
      },
    ],
    included: [
      "Private VIP transportation",
      "Full guided historical city walk",
      "Specialty Port Said seafood lunch",
    ],
  },
  {
    id: "ismailia-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Garden City",
    title: "Ismailia",
    subtitle: "Lush gardens, Lake Timsah sailing, and historic colonial mansions",
    description:
      "Known as the City of Gardens, Ismailia offers tranquil lake shores along Lake Timsah, views of giant container ships crossing the Suez Canal, and serene green parks.",
    duration: "Full Day",
    location: "Ismailia & Lake Timsah",
    targetAudience: "Relaxation Seekers & Families",
    image: "/photos/ismailia.png",
    highlights: [
      "Boat tour on Lake Timsah overlooking the Suez Canal",
      "Walking tour of historic French colonial neighborhood",
      "Famous Ismailia mango orchards & fresh fruit tastings",
      "Lakefront club lunch with peaceful water vistas",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Arrival & French Quarter Walk",
        desc: "Exploring leafy avenues, Ferdinand de Lesseps house, and canal banks.",
      },
      {
        step: "Afternoon",
        title: "Lake Timsah Cruise & Lunch",
        desc: "Private boat sail on Lake Timsah, watch giant ships, and club lunch.",
      },
    ],
    included: [
      "Air-conditioned VIP transport",
      "Private boat cruise on the lake",
      "Deluxe lunch and seasonal fruit tastings",
    ],
  },

  // ================= OVERNIGHT ADVENTURES =================
  {
    id: "siwa-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 3 Days / 2 Nights",
    title: "Siwa",
    subtitle: "Salt lakes, golden dunes, and starlit desert silence",
    description:
      "Egypt's most mystical oasis. Float effortlessly in crystalline turquoise salt pools, cross the Great Sand Sea in 4x4 safaris, and spend desert nights around warm Bedouin fires beneath millions of stars.",
    duration: "3 Days / 2 Nights",
    location: "Siwa Oasis, Western Desert",
    targetAudience: "Adventure Seekers, Couples & Groups",
    image: "/photos/siwa.png",
    highlights: [
      "Floating in therapeutic turquoise salt lakes",
      "Sunset sandboarding & 4x4 safari across Great Sand Sea",
      "Traditional Bedouin dinner at campfire with live music",
      "Historical walk through Shali Fortress & Temple of the Oracle",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Arrival & Salt Lakes",
        desc: "Check-in to eco-lodge, sunset swim in turquoise salt springs, and traditional Siwan dinner.",
      },
      {
        step: "Day 2",
        title: "The Great Sand Sea Safari",
        desc: "4x4 dune bashing, hot spring soak at Bir Wahed, and starlit desert camp.",
      },
      {
        step: "Day 3",
        title: "Shali Fortress & Departure",
        desc: "Ancient clay ruins of Shali Fortress, local artisan olive & salt shops.",
      },
    ],
    included: [
      "Round-trip private VIP transport",
      "2 nights boutique eco-lodge accommodation",
      "All meals (Breakfast, Lunch, Bedouin dinners)",
      "4x4 desert safari & sandboarding gear",
    ],
  },
  {
    id: "dahab-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 4 Days / 3 Nights",
    title: "Dahab",
    subtitle: "Diving, marine sanctuaries, and slow mornings by turquoise water",
    description:
      "Unplug completely in South Sinai. Enjoy seaside mornings, world-class coral reef snorkeling at the Blue Hole and Ras Abu Galum, boat rides to the Blue Lagoon, and stargazing from beach campfires.",
    duration: "4 Days / 3 Nights",
    location: "Dahab & Ras Abu Galum, South Sinai",
    targetAudience: "Youth, Families & Adventure Groups",
    image: "/photos/dahab.png",
    highlights: [
      "Guided snorkeling and diving at Blue Hole & Three Pools",
      "Boat ride to secluded Ras Abu Galum lagoon & Blue Lagoon swim",
      "Wadi Ginai canyon hike & Bedouin mountain tea",
      "Evenings at iconic Dahab waterfront bohemian cafes",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Coastal Welcome",
        desc: "Arrive at sea-facing boutique hotel, sunset promenade walk, and fresh seafood dinner.",
      },
      {
        step: "Day 2",
        title: "Blue Hole & Lagoon",
        desc: "Coral reef snorkeling, boat to Blue Lagoon, and sunset stargazing.",
      },
      {
        step: "Day 3",
        title: "Canyon Hike & Bedouin Night",
        desc: "Desert canyon exploration and campfire dinner under the stars.",
      },
      {
        step: "Day 4",
        title: "Artisan Markets & Farewell",
        desc: "Morning swim, local silver and textile shops, and comfortable departure.",
      },
    ],
    included: [
      "VIP Private transportation round-trip",
      "3 nights sea-view boutique hotel stay with breakfast",
      "Boat trip & snorkeling gear included",
      "All national park fees and desert guides",
    ],
  },
  {
    id: "aswan-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 4 Days / 3 Nights",
    title: "Aswan",
    subtitle: "A slow sailing voyage through timeless temples and colorful islands",
    description:
      "Sail on traditional wooden feluccas along the Nile, walk among towering columns at Philae Temple, and immerse in rich, warm Nubian heritage in Gharb Soheil.",
    duration: "4 Days / 3 Nights",
    location: "Aswan & Upper Egypt",
    targetAudience: "Cultural Travelers & Families",
    image: "/photos/aswan.png",
    highlights: [
      "Private sunset felucca sailing with live Nubian music",
      "Island Temple of Isis at Philae & High Dam",
      "Staying in colorful Nubian heritage lodges on the Nile",
      "Botanical Island gardens walk & traditional Nubian feasts",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Gates of Aswan",
        desc: "Arrival, checking into riverfront Nubian lodge, and sunset felucca cruise.",
      },
      {
        step: "Day 2",
        title: "Philae Island Temple",
        desc: "Boat tour to Island Temple of Isis, Unfinished Obelisk, and evening souk stroll.",
      },
      {
        step: "Day 3",
        title: "Gharb Soheil & Nubian Culture",
        desc: "Visiting traditional Nubian village, henna art, local music, and dinner.",
      },
      {
        step: "Day 4",
        title: "Botanic Gardens & Departure",
        desc: "Morning sailing to Kitchener's Island and departure.",
      },
    ],
    included: [
      "Domestic train / transfer coordination",
      "3 nights boutique riverfront heritage accommodations",
      "Private Egyptologist historian guides",
      "All entrance fees and private boat excursions",
    ],
  },
  {
    id: "nweibaa-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 3 Days / 2 Nights",
    title: "Nweibaa",
    subtitle: "Majestic Sinai mountains meeting calm turquoise beach camps",
    description:
      "Escape to the untouched coastline of Nuweiba where golden Sinai mountain peaks touch tranquil Red Sea coves. Stay in authentic bamboo beach huts, stargaze, and explore Wishwashi canyon springs.",
    duration: "3 Days / 2 Nights",
    location: "Nweibaa & Ras Shaitan, Sinai",
    targetAudience: "Nature Lovers & Campers",
    image: "/photos/nweibaa.png",
    highlights: [
      "Beachfront bamboo bungalow camp experience",
      "4x4 safari hike to Wishwashi freshwater canyon oasis",
      "Campfire acoustic music and Bedouin zarb dinner",
      "Crystal-clear snorkeling right from the beach shore",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Sinai Welcome",
        desc: "Scenic mountain pass drive, check into beach camp, and sunset swim.",
      },
      {
        step: "Day 2",
        title: "Wishwashi Canyon & Coral Reefs",
        desc: "Off-road hike to natural freshwater pool, cliff jumps, and beach BBQ.",
      },
      {
        step: "Day 3",
        title: "Sunrise Meditation & Return",
        desc: "Calm morning by the water, breakfast, and comfortable return.",
      },
    ],
    included: [
      "Round-trip air-conditioned transport",
      "2 nights authentic beach camp accommodations",
      "All meals and Bedouin campfire dinners",
      "Canyon safari guides and permits",
    ],
  },
  {
    id: "sharm-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 3 Days / 2 Nights",
    title: "Sharm El Sheikh",
    subtitle: "World-class coral diving, luxury resorts & Ras Mohamed sanctuary",
    description:
      "Experience world-renowned luxury and vibrant coral biodiversity at the tip of South Sinai. Explore Ras Mohamed National Park, yacht excursions, and lively evening promenades.",
    duration: "3 Days / 2 Nights",
    location: "Sharm El Sheikh & Ras Mohamed",
    targetAudience: "Families, Youth & International Visitors",
    image: "/photos/sharm.png",
    highlights: [
      "VIP Yacht sailing trip to Ras Mohamed & White Island",
      "Snorkeling among rare coral reefs and sea turtles",
      "Luxury 5-star beachfront resort stay with all amenities",
      "Night walk across Soho Square and Naama Bay",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Resort Check-In & Farsha Lounge",
        desc: "Arrive at 5-star beachfront resort, sunset drinks at iconic cliffside cafe.",
      },
      {
        step: "Day 2",
        title: "Ras Mohamed Yacht Day",
        desc: "Full-day luxury yacht cruise, snorkeling sessions, and seafood buffet.",
      },
      {
        step: "Day 3",
        title: "Desert Quad Safari & Departure",
        desc: "Morning quad bike ride through Echo Valley and comfortable departure.",
      },
    ],
    included: [
      "Round-trip transfers",
      "2 nights 5-star luxury resort accommodation",
      "Full-day yacht cruise with lunch and snorkeling gear",
    ],
  },
  {
    id: "hurghada-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 3 Days / 2 Nights",
    title: "Hurghada",
    subtitle: "Caribbean-like white sand sandbars and vibrant marina evenings",
    description:
      "A sun-drenched coastal retreat featuring boat rides to Orange Bay & Giftun Island, dolphin watching excursions, desert quad biking, and dining by Hurghada Marina.",
    duration: "3 Days / 2 Nights",
    location: "Hurghada & Giftun Islands, Red Sea",
    targetAudience: "Families, Friends & Water Lovers",
    image: "/photos/hurghada.png",
    highlights: [
      "Private boat cruise to Orange Bay / Giftun Island sandbanks",
      "Snorkeling on pristine offshore coral reefs",
      "Marina boulevard evening walks and seaside dinners",
      "Desert sunset safari with Bedouin tea",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Arrival & Marina Evening",
        desc: "Resort check-in, pool relaxation, and dinner walk at Hurghada Marina.",
      },
      {
        step: "Day 2",
        title: "Giftun Island & Orange Bay",
        desc: "Speedboat ride to white sand island, crystal lagoon swimming, and lunch.",
      },
      {
        step: "Day 3",
        title: "Desert Safari & Departure",
        desc: "Morning quad bike desert adventure and comfortable journey back.",
      },
    ],
    included: [
      "Round-trip transportation",
      "2 nights resort accommodation",
      "Island boat tour with lunch and snorkeling equipment",
    ],
  },

  // ================= EVENTS =================
  {
    id: "back-to-school",
    category: "events",
    categoryLabel: "Event",
    tag: "Event · School Community",
    title: "Back to School Celebrations",
    subtitle: "High-energy welcoming festivals for students, teachers, and parents",
    description:
      "Custom-designed full-day festivals that kick off the academic year with fun inflatables, interactive stage shows, sports challenges, arts stations, and team bonding games.",
    duration: "Full Day / Half Day",
    location: "School Campuses / Sports Clubs",
    targetAudience: "Schools, Students & Families",
    image: "/photos/back-to-school.png",
    highlights: [
      "Custom stage production, sound systems, and fun MC animators",
      "Inflatable obstacle courses, foam zones, and carnival booths",
      "Art stations, face painting, and photo keepsake booths",
      "Full food court catering & beverage stations",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Grand Welcome & Stage Show",
        desc: "Music, character mascots, and inspiring welcome speeches.",
      },
      {
        step: "Midday",
        title: "Carnival Stations & Tournaments",
        desc: "Class vs class sports games, arts tents, and lunch.",
      },
      {
        step: "Afternoon",
        title: "Color Powder Festival & Concert",
        desc: "Joyful celebratory finale with prizes and group photo.",
      },
    ],
    included: [
      "Complete event planning, stage, lighting, and sound gear",
      "All carnival games, inflatables, and materials",
      "Safety managers, organizers, and medical support",
    ],
  },
  {
    id: "father-mother-child",
    category: "events",
    categoryLabel: "Event",
    tag: "Event · Family Bonding",
    title: "Father & Child / Mother & Child Days",
    subtitle: "Meaningful bonding adventures designed for cherished memories",
    description:
      "Heartwarming, curated bonding days featuring parent-child team challenges, cooperative arts and crafts, outdoor cooking, relay races, and keepsake gift making.",
    duration: "Full Day Experience",
    location: "Oasis Lodges / Nature Resorts",
    targetAudience: "Schools, Communities & Families",
    image: "/photos/family-bonding.png",
    highlights: [
      "Parent-child cooperative team challenges & fun relays",
      "Campfire cooking & outdoor marshmallow roasting",
      "Custom memory scrapbook & polaroid photo station",
      "Emotional sharing circle and dedicated keepsake awards",
    ],
    itinerary: [
      {
        step: "Morning",
        title: "Icebreakers & Partner Games",
        desc: "Fun cooperative challenges that require teamwork between parent and child.",
      },
      {
        step: "Afternoon",
        title: "Creative Crafting & BBQ",
        desc: "Hands-on woodcraft/pottery making and open-air family lunch.",
      },
    ],
    included: [
      "Private resort venue booking & activity zones",
      "All craft materials and keepsake frames",
      "Full family banquet meal and refreshments",
    ],
  },
  {
    id: "team-building-camps",
    category: "events",
    categoryLabel: "Event",
    tag: "Event · Corporate & Teachers",
    title: "Teachers & Corporate Team Building",
    subtitle: "Overnight camps and retreats that inspire synergy and re-energize",
    description:
      "Customized retreats for school faculties, educators, and corporate teams. Packed with experiential learning, outdoor problem-solving, stress-relief mindfulness, and inspiring campfire evenings.",
    duration: "1 to 2 Days (With Overnight Option)",
    location: "Fayoum / Sokhna / Wadi Degla",
    targetAudience: "Teachers, Educators & Companies",
    image: "/photos/team-building.png",
    highlights: [
      "Customized team synergy games & strategy simulations",
      "Mindfulness, wellness, and stress-relief outdoor sessions",
      "Starlit campfire reflection circles & live acoustic music",
      "Bespoke retreat venue with private dining and comfortable rooms",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Team Alignment & Outdoor Synergy",
        desc: "Facilitated team communication challenges and trust building.",
      },
      {
        step: "Evening",
        title: "Campfire Reflection & Live Music",
        desc: "Open-air BBQ dinner, team appreciation awards, and stargazing.",
      },
      {
        step: "Day 2",
        title: "Action Roadmap & Departure",
        desc: "Morning wellness stretch, team goal alignment, and wrap-up.",
      },
    ],
    included: [
      "Curated retreat venue & meeting facilities",
      "Certified organizational development facilitators",
      "Full catering (Gourmet meals, coffee breaks & snacks)",
    ],
  },
];

// --- SVG Icons Helper ---
const Icons = {
  Sparkle: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.235-.244-.588-.493-.508-.677-.517-.175-.009-.376-.009-.576-.009-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.14 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.576-.35zM12.04 21.785h-.002a9.78 9.78 0 0 1-4.992-1.373l-.358-.213-3.712.973.99-3.618-.233-.37a9.774 9.774 0 0 1-1.5-5.184c0-5.404 4.398-9.803 9.805-9.803 2.617 0 5.078 1.02 6.93 2.871a9.74 9.74 0 0 1 2.868 6.931c0 5.405-4.399 9.804-9.798 9.804z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-[#5E715C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export default function HiddenGemsOfficialPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalGem, setActiveModalGem] = useState<GemItem | null>(null);

  // Form State for Tailored Inquiry
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formType, setFormType] = useState("Events (Back to school, Sports day, Family)");
  const [formGuests, setFormGuests] = useState("Individual / Small Family (1 - 5)");
  const [formNotes, setFormNotes] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Filter gems based on category and search query
  const filteredGems = useMemo(() => {
    return GEMS_DATA.filter((gem) => {
      const matchCategory = selectedCategory === "all" || gem.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        gem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Form Submit -> Direct WhatsApp Link with pre-filled English message
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const message = `*🌟 New Experience Inquiry — Hidden Gems Website*
━━━━━━━━━━━━━━━━━━━━
👤 *Name / Organization:* ${formName.trim()}
📞 *Phone / WhatsApp:* ${formPhone.trim()}
🏷️ *Category of Interest:* ${formType}
👥 *Estimated Group Size:* ${formGuests}
📝 *Notes / Special Requests:* ${formNotes.trim() || "None specified"}
━━━━━━━━━━━━━━━━━━━━
_Sent via Hidden Gems Official Web Booking_`;

    const whatsappUrl = `https://wa.me/${HIDDEN_GEMS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setFormSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setFormSuccess(false);
    }, 800);
  };

  // Direct Gem Inquiry Handler (WhatsApp)
  const handleDirectGemBook = (gem: GemItem) => {
    const message = `*🌟 Inquiring About Experience:* ${gem.title}
━━━━━━━━━━━━━━━━━━━━
🏷️ *Category:* ${gem.categoryLabel}
📍 *Location:* ${gem.location}
⏳ *Duration:* ${gem.duration}
👥 *Target Group:* ${gem.targetAudience || "Customizable"}
━━━━━━━━━━━━━━━━━━━━
Hello Hidden Gems Team, I would like to inquire about available dates, customized program details, and booking for *${gem.title}*.`;

    const whatsappUrl = `https://wa.me/${HIDDEN_GEMS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#2B2D26]">
      {/* ================= STICKY HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 solid-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* Official Full Brand Logo on the top left */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Hidden Gems Official Logo"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-semibold text-[#3D4F3C]">
            <a href="#philosophy" className="hover:text-[#C5A059] transition-colors">
              Philosophy
            </a>
            <a href="#doors" className="hover:text-[#C5A059] transition-colors">
              Three Doors
            </a>
            <a
              href="#gems"
              onClick={() => setSelectedCategory("all")}
              className="hover:text-[#C5A059] transition-colors"
            >
              All Experiences
            </a>
            <a href="#contact" className="hover:text-[#C5A059] transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Floating Ambient Sparkles */}
        <div className="absolute top-[18%] left-[12%] text-[#C5A059] text-xl animate-twinkle pointer-events-none">
          <Icons.Sparkle />
        </div>
        <div className="absolute top-[28%] right-[14%] text-[#C5A059] text-sm animate-twinkle pointer-events-none" style={{ animationDelay: "1.2s" }}>
          <Icons.Sparkle />
        </div>
        <div className="absolute bottom-[24%] left-[18%] text-[#C5A059] text-base animate-twinkle pointer-events-none" style={{ animationDelay: "2.1s" }}>
          <Icons.Sparkle />
        </div>
        <div className="absolute bottom-[30%] right-[20%] text-[#C5A059] text-lg animate-twinkle pointer-events-none" style={{ animationDelay: "0.7s" }}>
          <Icons.Sparkle />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          {/* Main Hero Doorway Image (Image 1 provided by user) */}
          <div className="relative mb-6 group cursor-pointer" onClick={() => setSelectedCategory("all")}>
            <img
              src="/door.png"
              alt="Hidden Gems Official Doorway"
              className="w-52 sm:w-64 md:w-72 h-auto mx-auto transition-transform duration-700 group-hover:scale-105 object-contain"
            />
          </div>

          <p className="font-serif-luxury italic text-[#C5A059] text-lg sm:text-xl tracking-wide mb-3">
            Every door leads somewhere unforgettable
          </p>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.08em] text-[#2C3E2D] uppercase leading-[1.18] max-w-4xl mb-6">
            Discover More. <br className="hidden sm:block" />
            <span className="italic font-normal text-[#C5A059]">Experience</span> Better.
          </h1>

          <p className="text-[#4A5A48] text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-10">
            Every person has a hidden gem within them. Every experience is an opportunity to discover it. We design creative workshops, meaningful events, and thrilling trips across Egypt.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#gems"
              onClick={() => setSelectedCategory("all")}
              className="inline-flex items-center gap-2.5 bg-[#2C3E2D] hover:bg-[#1D2A1E] text-[#FAF5EF] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <span>Explore All Experiences</span>
              <Icons.ArrowRight />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-[#C5A059]/40 bg-white/70 hover:bg-white text-[#2C3E2D] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-105"
            >
              <span>Plan a Custom Event</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= PHILOSOPHY SECTION ================= */}
      <section id="philosophy" className="py-20 px-6 border-y border-[#C5A059]/20 bg-[#F3ECE1]/60">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif-luxury italic text-[#C5A059] text-xl mb-3">Our Core Belief</p>
          <blockquote className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#2C3E2D] font-normal leading-relaxed italic mb-6">
            &ldquo;Every person has a hidden gem within them. Every experience is an opportunity to discover it.&rdquo;
          </blockquote>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto my-6"></div>
          <p className="text-sm sm:text-base text-[#4A5A48] font-light leading-relaxed max-w-2xl mx-auto">
            We don&apos;t just organize trips and events — we craft thoughtful journeys that spark creativity, deepen bonds, and awaken the extraordinary inside every student, educator, team member, and explorer.
          </p>
        </div>
      </section>

      {/* ================= THREE DOORS SECTION ================= */}
      <section id="doors" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif-luxury italic text-[#C5A059] text-lg mb-2">Choose your pathway</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#2C3E2D]">
            Three Doors of Discovery
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto my-5"></div>
          <p className="text-sm sm:text-base text-[#4A5A48] font-light">
            Each door opens into a specialized world of curated moments tailored for schools, families, and organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Door 1: EVENTS (Sage Green) */}
          <div
            className="door-card-container cursor-pointer"
            onClick={() => {
              setSelectedCategory("events");
              const el = document.getElementById("gems");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="door-card-inner h-full min-h-[440px] rounded-t-[140px] rounded-b-2xl bg-[#FAF5EF] border-2 border-[#5E715C] p-8 flex flex-col items-center text-center shadow-md relative group">
              <div className="w-14 h-14 rounded-full bg-[#5E715C]/15 text-[#2C3E2D] flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="font-serif-luxury text-2xl uppercase tracking-[0.12em] text-[#2C3E2D] font-semibold my-2">
                Events
              </h3>
              <div className="w-10 h-[1px] bg-[#C5A059] my-2"></div>
              <ul className="text-xs text-[#4A5A48] font-light space-y-2 text-left w-full my-4 pl-4 list-disc marker:text-[#5E715C]">
                <li>Back to School Festivals &amp; Welcoming Days</li>
                <li>Father / Mother &amp; Child Bonding Adventures</li>
                <li>Teachers &amp; Corporate Team Building Camps</li>
                <li>Youth Sports Days &amp; Inflatable Tournaments</li>
                <li>End of Year Celebrations &amp; Graduations</li>
              </ul>
              <div className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#5E715C] group-hover:text-[#2C3E2D] transition-colors">
                <span>View Events</span>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>

          {/* Door 2: TRIPS (Ocean Blue) */}
          <div
            className="door-card-container cursor-pointer"
            onClick={() => {
              setSelectedCategory("day-trips");
              const el = document.getElementById("gems");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="door-card-inner h-full min-h-[440px] rounded-t-[140px] rounded-b-2xl bg-[#FAF5EF] border-2 border-[#3A7885] p-8 flex flex-col items-center text-center shadow-md relative group">
              <div className="w-14 h-14 rounded-full bg-[#3A7885]/15 text-[#2C3E2D] flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-110 transition-transform">
                🧳
              </div>
              <h3 className="font-serif-luxury text-2xl uppercase tracking-[0.12em] text-[#2C3E2D] font-semibold my-2">
                Trips
              </h3>
              <div className="w-10 h-[1px] bg-[#C5A059] my-2"></div>
              <ul className="text-xs text-[#4A5A48] font-light space-y-2 text-left w-full my-4 pl-4 list-disc marker:text-[#3A7885]">
                <li>Dragon Island &amp; Mario Ropes</li>
                <li>Fayoum Waterfalls &amp; Magic Lake</li>
                <li>Siwa Oasis Desert Safari</li>
                <li>Aswan &amp; Nile Felucca Sailing</li>
                <li>Dahab, Nuweiba &amp; Blue Hole</li>
                <li>Alexandria &amp; Sokhna Coastal Trips</li>
                <li>Hurghada &amp; Sharm El Sheikh</li>
              </ul>
              <div className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#3A7885] group-hover:text-[#2C3E2D] transition-colors">
                <span>View Trips</span>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>

          {/* Door 3: WORKSHOPS (Terracotta Rose) */}
          <div
            className="door-card-container cursor-pointer"
            onClick={() => {
              setSelectedCategory("workshops");
              const el = document.getElementById("gems");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="door-card-inner h-full min-h-[440px] rounded-t-[140px] rounded-b-2xl bg-[#FAF5EF] border-2 border-[#A8583B] p-8 flex flex-col items-center text-center shadow-md relative group">
              <div className="w-14 h-14 rounded-full bg-[#A8583B]/15 text-[#2C3E2D] flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-110 transition-transform">
                🎨
              </div>
              <h3 className="font-serif-luxury text-2xl uppercase tracking-[0.12em] text-[#2C3E2D] font-semibold my-2">
                Workshops
              </h3>
              <div className="w-10 h-[1px] bg-[#C5A059] my-2"></div>
              <ul className="text-xs text-[#4A5A48] font-light space-y-2 text-left w-full my-4 pl-4 list-disc marker:text-[#A8583B]">
                <li>Color Your Own Character</li>
                <li>Mirror Painting Art</li>
                <li>Arts &amp; Crafts &amp; Custom Beading</li>
                <li>Character Building &amp; Coaching</li>
                <li>Pottery &amp; Clay Modeling</li>
              </ul>
              <div className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#A8583B] group-hover:text-[#2C3E2D] transition-colors">
                <span>View Workshops</span>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ALL GEMS CATALOG ================= */}
      <section id="gems" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-serif-luxury italic text-[#C5A059] text-lg mb-2">Explore what we offer</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#2C3E2D]">
            Curated Experiences
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto my-5"></div>
          <p className="text-sm sm:text-base text-[#4A5A48] font-light">
            Tap any card to view the complete schedule, authentic photos, what&apos;s included, and inquire directly with our team.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#C5A059]/20">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: "All Experiences" },
                { key: "day-trips", label: "Day Trips" },
                { key: "overnight", label: "Overnight Adventures" },
                { key: "events", label: "Events" },
                { key: "workshops", label: "Workshops" },
              ] as { key: CategoryType; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                  selectedCategory === tab.key
                    ? "bg-[#2C3E2D] text-[#FAF5EF] shadow-md border border-[#C5A059]/40"
                    : "bg-[#F3ECE1] text-[#4A5A48] hover:bg-[#EBE5D8] border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search trips, workshops, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white border border-[#C5A059]/30 focus:border-[#C5A059] focus:outline-none text-[#2B2D26]"
            />
            <span className="absolute left-3.5 top-2.5 text-[#C5A059]">
              <Icons.Search />
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-2.5 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        {filteredGems.length === 0 ? (
          <div className="text-center py-20 bg-[#F3ECE1]/50 rounded-2xl border border-dashed border-[#C5A059]/40">
            <p className="font-serif-luxury text-2xl text-[#2C3E2D] mb-2">No matching experiences found</p>
            <p className="text-sm text-[#4A5A48]">Try clearing your search or picking another category.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#2C3E2D] text-[#FAF5EF] text-xs uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGems.map((gem) => (
              <div
                key={gem.id}
                onClick={() => setActiveModalGem(gem)}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer border border-[#C5A059]/25 hover:-translate-y-2 bg-[#1A1C18] text-[#FAF5EF]"
                style={{ minHeight: "380px" }}
              >
                {/* Real High-Resolution Photo Background with smooth zoom on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={gem.image}
                    alt={gem.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Elegant Dark Vignette Overlay for maximum text readability and luxury contrast */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#121410] via-[#1A1C18]/65 to-black/35 group-hover:via-[#1A1C18]/50 transition-colors duration-500"></div>

                {/* Top Badge Row */}
                <div className="relative z-20 p-6 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] bg-black/60 backdrop-blur-md text-[#DFC99E] border border-[#DFC99E]/40 shadow-sm">
                    {gem.categoryLabel}
                  </span>
                  <span className="text-xs text-[#FAF5EF] font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 shadow-sm">
                    <Icons.Calendar />
                    <span>{gem.duration}</span>
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-20 p-6 pt-0">
                  <p className="text-xs font-serif-luxury italic text-[#DFC99E] mb-1 flex items-center gap-1">
                    <Icons.MapPin />
                    <span>{gem.location}</span>
                  </p>
                  <h3 className="font-serif-luxury text-2xl uppercase tracking-[0.08em] font-semibold text-[#FAF5EF] mb-2 leading-tight group-hover:text-[#DFC99E] transition-colors drop-shadow-md">
                    {gem.title}
                  </h3>
                  <p className="text-xs text-[#FAF5EF]/90 font-light leading-relaxed line-clamp-2 mb-4 drop-shadow-sm">
                    {gem.subtitle}
                  </p>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[11px] text-[#DFC99E] font-medium tracking-wide">
                      {gem.targetAudience || "Customizable"}
                    </span>

                    <button className="px-4 py-2 rounded-full bg-[#DFC99E] hover:bg-[#FAF5EF] text-[#2C3E2D] text-[11px] font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 shadow-md cursor-pointer group-hover:scale-105">
                      <span>View &amp; Inquire</span>
                      <Icons.ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= MODAL: DETAILS & INQUIRY POPUP (WITH REAL PHOTO) ================= */}
      {activeModalGem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FAF5EF] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-[#C5A059]/40 max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Artwork with Real Photo */}
            <div className="relative h-56 sm:h-64 p-6 flex flex-col justify-between text-[#FAF5EF] overflow-hidden flex-shrink-0">
              <img
                src={activeModalGem.image}
                alt={activeModalGem.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151713] via-[#1A1C18]/60 to-black/40"></div>

              {/* Close button */}
              <button
                onClick={() => setActiveModalGem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-[#FAF5EF] hover:bg-black flex items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg"
              >
                <Icons.Close />
              </button>

              <div className="relative z-20">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/60 backdrop-blur-md text-[#DFC99E] border border-[#DFC99E]/40 shadow-sm">
                  {activeModalGem.tag}
                </span>
              </div>

              <div className="relative z-20">
                <h2 className="font-serif-luxury text-2xl sm:text-4xl uppercase tracking-[0.08em] font-semibold text-[#FAF5EF] drop-shadow-lg">
                  {activeModalGem.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#DFC99E] font-light flex items-center gap-2 mt-1 drop-shadow-sm">
                  <Icons.MapPin />
                  <span>{activeModalGem.location}</span>
                  <span>•</span>
                  <span>{activeModalGem.duration}</span>
                </p>
              </div>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#2B2D26]">
              {/* Description */}
              <div>
                <h4 className="font-serif-luxury text-lg uppercase tracking-wider text-[#2C3E2D] font-semibold mb-2">
                  About This Experience
                </h4>
                <p className="text-sm text-[#4A5A48] font-light leading-relaxed">
                  {activeModalGem.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-[#F3ECE1] p-5 rounded-2xl border border-[#C5A059]/30">
                <h4 className="font-serif-luxury text-base uppercase tracking-wider text-[#2C3E2D] font-semibold mb-3">
                  Highlights &amp; Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalGem.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4A5A48] font-light">
                      <Icons.Check />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h4 className="font-serif-luxury text-lg uppercase tracking-wider text-[#2C3E2D] font-semibold mb-3">
                  Schedule / Program Outline
                </h4>
                <div className="space-y-3">
                  {activeModalGem.itinerary.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#C5A059]/20 shadow-xs">
                      <span className="font-serif-luxury text-xs font-bold text-[#C5A059] uppercase min-w-[70px]">
                        {step.step}
                      </span>
                      <div>
                        <h5 className="text-xs font-semibold text-[#2C3E2D]">{step.title}</h5>
                        <p className="text-xs text-[#4A5A48] font-light mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <h4 className="font-serif-luxury text-base uppercase tracking-wider text-[#2C3E2D] font-semibold mb-2">
                  What We Provide
                </h4>
                <ul className="space-y-1.5 text-xs text-[#4A5A48] font-light">
                  {activeModalGem.included.map((inc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-[#F3ECE1] border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
              <div>
                <span className="text-xs text-[#4A5A48] font-medium block">
                  Customizable for individuals, schools &amp; private groups
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleDirectGemBook(activeModalGem)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#2C3E2D] hover:bg-[#1D2A1E] text-[#FAF5EF] px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-xl border border-[#C5A059]/40 cursor-pointer"
                >
                  <Icons.WhatsApp />
                  <span>Inquire &amp; Book via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTACT & TAILORED BOOKING FORM (100% ENGLISH) ================= */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#2C3E2D] text-[#FAF5EF] rounded-3xl p-8 sm:p-14 md:p-16 text-center shadow-2xl relative overflow-hidden border border-[#C5A059]/30">
          {/* Decorative background with pointer-events-none to prevent blocking input clicks */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

          <div className="relative z-10">
            <p className="font-serif-luxury italic text-[#DFC99E] text-xl mb-2">Every door leads somewhere unforgettable</p>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl uppercase tracking-[0.08em] font-normal text-[#FAF5EF] mb-4">
              Plan a Trip, Event, or Workshop
            </h2>
            <p className="text-sm sm:text-base text-[#FAF5EF]/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us about your upcoming school day, corporate retreat, or customized trip, and our team will craft the perfect experience.
            </p>

            {formSuccess ? (
              <div className="bg-[#FAF5EF] text-[#2C3E2D] p-8 rounded-2xl max-w-md mx-auto shadow-lg animate-in zoom-in-95">
                <div className="text-4xl mb-2">🎉</div>
                <h4 className="font-serif-luxury text-2xl uppercase tracking-wider font-semibold text-[#2C3E2D]">
                  Redirecting to WhatsApp...
                </h4>
                <p className="text-xs text-[#4A5A48] mt-2">
                  Your inquiry is ready and sending directly to our team at: 01278886151.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[12px] uppercase tracking-wider text-[#DFC99E] font-semibold block mb-2">
                      Your Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pavly Emad / School Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5EF] text-[#2B2D26] placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-wider text-[#DFC99E] font-semibold block mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01278886151"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5EF] text-[#2B2D26] placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[12px] uppercase tracking-wider text-[#DFC99E] font-semibold block mb-2">
                      Category of Interest
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5EF] text-[#2B2D26] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm font-medium cursor-pointer"
                    >
                      <option value="Events (Back to school, Sports day, Family)">Events (Back to school, Sports day, Camps)</option>
                      <option value="Day Trip (Dragon Island, Mario Ropes, Kayaking, Fayoum, Alexandria, Sokhna, Port Said, Ismailia)">Day Trips (Dragon Island, Mario Ropes, Fayoum, Alex...)</option>
                      <option value="Overnight Trip (Siwa, Dahab, Aswan, Nweibaa, Sharm, Hurghada)">Overnight Adventures (Siwa, Dahab, Aswan, Nuweiba...)</option>
                      <option value="Workshop (Color Character, Mirror Painting, Crafts & Beading)">Workshops (Color Character, Mirror Painting, Crafts)</option>
                      <option value="Teachers & Corporate Team Building">Teachers &amp; Corporate Team Building</option>
                      <option value="Custom Tailored Experience">Custom Tailored Experience</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-wider text-[#DFC99E] font-semibold block mb-2">
                      Estimated Group Size
                    </label>
                    <select
                      value={formGuests}
                      onChange={(e) => setFormGuests(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5EF] text-[#2B2D26] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm font-medium cursor-pointer"
                    >
                      <option value="Individual / Small Family (1 - 5)">Individual / Small Family (1 - 5)</option>
                      <option value="School Class / Small Group (10 - 25)">School Class / Small Group (10 - 25)</option>
                      <option value="Large School / Grade Level (30 - 100)">Large School / Grade Level (30 - 100)</option>
                      <option value="Corporate / Large Festival (100+)">Corporate / Large Festival (100+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[12px] uppercase tracking-wider text-[#DFC99E] font-semibold block mb-2">
                    Preferred Dates &amp; Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us any specific destination, timing, or special requests..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5EF] text-[#2B2D26] placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-sm font-medium"
                  ></textarea>
                </div>

                <div className="pt-3 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#DFC99E] text-[#2C3E2D] font-bold text-xs uppercase tracking-[0.16em] px-10 py-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <Icons.WhatsApp />
                    <span>Send Request via WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-white/60 mt-3">
                    Tapping send opens WhatsApp with your pre-filled inquiry directly to our team (01278886151).
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#FAF5EF] border-t border-[#C5A059]/20 pt-16 pb-12 px-6 text-center text-[#4A5A48]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Brand Logo (Official Logo on the bottom) */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.jpg"
              alt="Hidden Gems Official Logo"
              className="h-20 sm:h-24 w-auto object-contain"
            />
          </div>

          <p className="text-xs text-[#4A5A48] font-light max-w-sm mb-6">
            Curated trips, private events, and hands-on artisan workshops across Egypt and beyond.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.14em] font-semibold text-[#4A5A48] mb-8">
            <a href="#philosophy" className="hover:text-[#C5A059] transition-colors">Philosophy</a>
            <a href="#doors" className="hover:text-[#C5A059] transition-colors">Three Doors</a>
            <a
              href="#gems"
              onClick={() => setSelectedCategory("all")}
              className="hover:text-[#C5A059] transition-colors"
            >
              All Experiences
            </a>
            <a href="#contact" className="hover:text-[#C5A059] transition-colors">Contact</a>
          </div>

          <p className="text-[11px] text-stone-400 tracking-wider uppercase">
            © 2026 Hidden Gems — Events · Trips · Workshops. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}