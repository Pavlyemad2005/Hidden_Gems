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
  bgGradient: string;
  sceneSvg: React.ReactNode;
  highlights: string[];
  itinerary: { step: string; title: string; desc: string }[];
  included: string[];
}

// --- Official Catalog Data ---
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
    bgGradient: "linear-gradient(180deg, #382A1C 0%, #8A5B30 55%, #D49B4B 100%)",
    highlights: [
      "Custom character illustration templates & guided drawing steps",
      "All professional coloring supplies, sketchbooks, and stickers",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="90" cy="55" r="1.8" fill="#F8F5EE" /><circle cx="150" cy="35" r="1.4" fill="#F8F5EE" />
        <circle cx="220" cy="65" r="2" fill="#DFC99E" /><circle cx="330" cy="45" r="1.6" fill="#F8F5EE" />
        <path d="M140,240 Q180,180 220,240" fill="none" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.85" />
        <circle cx="180" cy="160" r="30" fill="none" stroke="#DFC99E" strokeWidth="2.5" opacity="0.9" />
        <path d="M165,155 Q180,170 195,155" fill="none" stroke="#F8F5EE" strokeWidth="2" opacity="0.85" />
      </svg>
    ),
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
    bgGradient: "linear-gradient(180deg, #1C2C38 0%, #305B78 55%, #6CA0C2 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="200" cy="150" r="70" fill="none" stroke="#F8F5EE" strokeWidth="3" opacity="0.85" />
        <circle cx="200" cy="150" r="58" fill="none" stroke="#DFC99E" strokeWidth="1.5" opacity="0.7" />
        <path d="M150,180 Q180,130 200,160 T250,140" fill="none" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.8" />
      </svg>
    ),
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
    bgGradient: "linear-gradient(180deg, #301E28 0%, #733E5E 55%, #B86B98 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="200" cy="150" r="60" fill="none" stroke="#DFC99E" strokeWidth="2" strokeDasharray="8 6" opacity="0.85" />
        <circle cx="160" cy="120" r="7" fill="#F8F5EE" /><circle cx="200" cy="90" r="7" fill="#DFC99E" />
        <circle cx="240" cy="120" r="7" fill="#F8F5EE" /><circle cx="255" cy="165" r="7" fill="#DFC99E" />
        <circle cx="225" cy="205" r="7" fill="#F8F5EE" /><circle cx="175" cy="205" r="7" fill="#DFC99E" />
      </svg>
    ),
  },
  {
    id: "character-career",
    category: "workshops",
    categoryLabel: "Workshop",
    tag: "Workshop · Growth & Learning",
    title: "Character Building & Career Coaching",
    subtitle: "Empowering young minds and uncovering inner potential",
    description:
      "Interactive developmental workshops centered on communication, confidence, leadership skills, emotional intelligence, and discovering natural strengths and future career pathways.",
    duration: "Half-Day / Full-Day Sessions",
    location: "Schools / Academies / Retreats",
    targetAudience: "Students, Schools & Youth",
    bgGradient: "linear-gradient(180deg, #1C2E20 0%, #3B5F44 55%, #7BA485 100%)",
    highlights: [
      "Fun gamified leadership and problem-solving challenges",
      "Public speaking, active listening, and team synergy exercises",
      "Career interest mapping & mentorship discussions",
      "Participation certificates and personal action roadmap",
    ],
    itinerary: [
      {
        step: "Module 1",
        title: "Self-Discovery & Strengths",
        desc: "Interactive self-assessment games identifying core passions and values.",
      },
      {
        step: "Module 2",
        title: "Team Dynamics & Communication",
        desc: "Real-world group problem solving and team trust building.",
      },
      {
        step: "Module 3",
        title: "Future Horizons & Mentorship",
        desc: "Exploring career paths, setting milestones, and Q&A with mentors.",
      },
    ],
    included: [
      "Custom workbooks & assessment tools",
      "Certified developmental coaches and facilitators",
      "Certificates of completion",
    ],
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <polygon points="200,90 230,170 170,170" fill="none" stroke="#DFC99E" strokeWidth="2" opacity="0.8" />
        <circle cx="200" cy="70" r="14" fill="#F8F5EE" opacity="0.85" />
        <line x1="200" y1="170" x2="200" y2="230" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.8" />
      </svg>
    ),
  },

  // ================= DAY TRIPS =================
  {
    id: "mario-ropes",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · High Adrenaline",
    title: "Mario Ropes Challenge & Adventure",
    subtitle: "Ropes courses, ziplines, and high-altitude courage",
    description:
      "An exhilarating outdoor challenge at the cliffside ropes park. Navigate suspension bridges, high-wire obstacles, wall climbing, and zip lining with full certified safety gear and professional coaches.",
    duration: "Full Day",
    location: "Mokattam / Saint Simon Clifftops, Cairo",
    targetAudience: "Schools, Families & Corporate Teams",
    bgGradient: "linear-gradient(180deg, #262116 0%, #635032 55%, #B3925B 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <line x1="50" y1="120" x2="350" y2="120" stroke="#DFC99E" strokeWidth="3" opacity="0.8" />
        <line x1="100" y1="120" x2="100" y2="230" stroke="#F8F5EE" strokeWidth="2" opacity="0.6" />
        <line x1="200" y1="120" x2="200" y2="230" stroke="#F8F5EE" strokeWidth="2" opacity="0.6" />
        <line x1="300" y1="120" x2="300" y2="230" stroke="#F8F5EE" strokeWidth="2" opacity="0.6" />
        <circle cx="180" cy="110" r="10" fill="#DFC99E" />
      </svg>
    ),
  },
  {
    id: "dragon-island",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Active Fun",
    title: "Dragon Island Adventure",
    subtitle: "Inflatable water courses, obstacle games, and non-stop energy",
    description:
      "A thrilling action-packed day trip featuring giant obstacle courses, inflatable challenges, foam parties, and fun group competitions in a safe, fully supervised park environment.",
    duration: "Full Day",
    location: "Le Lac Du Caire / 6th of October",
    targetAudience: "Schools, Youth & Family Fun",
    bgGradient: "linear-gradient(180deg, #182E26 0%, #306654 55%, #59A389 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <path d="M50,220 Q120,130 200,190 T350,170" fill="none" stroke="#DFC99E" strokeWidth="3" opacity="0.8" />
        <polygon points="120,150 140,110 160,150" fill="#F8F5EE" opacity="0.8" />
        <polygon points="240,160 260,120 280,160" fill="#F8F5EE" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "kayak-nile",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Water Sport",
    title: "Nile Kayak & Sunset Paddle",
    subtitle: "Glide through the calm waters of the Nile at golden hour",
    description:
      "Experience Cairo from a breathtaking new angle. Paddle in double or single kayaks along scenic river islands, learn kayaking strokes from champions, and enjoy breakfast or sunset drinks on the water.",
    duration: "Half Day (Morning / Sunset)",
    location: "Zamalek / Maadi Nile Banks",
    targetAudience: "Couples, Friends & Groups",
    bgGradient: "linear-gradient(180deg, #102B30 0%, #205E66 55%, #4AA6B0 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <path d="M0,200 Q100,180 200,200 T400,200" fill="none" stroke="#F8F5EE" strokeWidth="2" opacity="0.6" />
        <ellipse cx="200" cy="220" rx="90" ry="12" fill="#DFC99E" opacity="0.85" />
        <line x1="140" y1="190" x2="260" y2="240" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.9" />
        <circle cx="200" cy="195" r="12" fill="#F8F5EE" />
      </svg>
    ),
  },
  {
    id: "fayoum-daytrip",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Oasis Nature",
    title: "Fayoum Magic Lake & Waterfalls",
    subtitle: "Wadi El Rayan waterfalls, sandboarding, and Tunis pottery village",
    description:
      "A complete desert oasis escape just 90 minutes from Cairo. Visit Egypt's only natural waterfalls, sandboard on soft dunes around Magic Lake, and enjoy lunch at a scenic lakefront Bedouin lodge.",
    duration: "Full Day (7 AM – 9 PM)",
    location: "Fayoum & Wadi El Rayan",
    targetAudience: "Families, Friends & Schools",
    bgGradient: "linear-gradient(180deg, #2D2214 0%, #7A5328 55%, #CFA158 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <path d="M0,220 C70,180 140,240 220,200 C300,170 350,220 400,190 L400,300 L0,300Z" fill="#1E1409" opacity="0.75" />
        <path d="M120,180 L120,260 M140,175 L140,260" stroke="#DFC99E" strokeWidth="2" opacity="0.8" />
        <circle cx="310" cy="65" r="22" fill="#F8F5EE" opacity="0.85" />
      </svg>
    ),
  },
  {
    id: "museum-tour",
    category: "day-trips",
    categoryLabel: "Day Trip",
    tag: "Day Trip · Cultural Discovery",
    title: "Heritage & Grand Museum Tour",
    subtitle: "Unraveling the wonders of ancient Egypt with master historians",
    description:
      "A private guided exploration of Egypt's greatest historical treasures (NMEC / Grand Egyptian Museum / Tahrir Museum) curated with engaging storytelling for all generations.",
    duration: "Half / Full Day",
    location: "Cairo & Giza",
    targetAudience: "Schools, Families & Cultural Explorers",
    bgGradient: "linear-gradient(180deg, #241A10 0%, #684824 55%, #B58A4A 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <polygon points="120,240 200,120 280,240" fill="none" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.85" />
        <polygon points="160,240 200,170 240,240" fill="none" stroke="#DFC99E" strokeWidth="2" opacity="0.7" />
      </svg>
    ),
  },

  // ================= OVERNIGHT ADVENTURES =================
  {
    id: "siwa-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 3 Days / 2 Nights",
    title: "Siwa Oasis Deep Immersion",
    subtitle: "Salt lakes, golden dunes, and starlit desert silence",
    description:
      "Egypt's most mystical oasis. Float effortlessly in crystalline turquoise salt pools, cross the Great Sand Sea in 4x4 safaris, and spend desert nights around warm Bedouin fires beneath millions of stars.",
    duration: "3 Days / 2 Nights",
    location: "Siwa Oasis, Western Desert",
    targetAudience: "Adventure Seekers, Couples & Groups",
    bgGradient: "linear-gradient(180deg, #2D2113 0%, #8A5726 55%, #D99C48 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="320" cy="55" r="26" fill="#F8F5EE" opacity="0.9" />
        <path d="M0,230 C70,200 130,240 200,215 C270,190 330,225 400,205 L400,300 L0,300 Z" fill="#2B1E10" opacity="0.6" />
        <path d="M0,255 C80,225 160,260 240,240 C300,225 350,245 400,235 L400,300 L0,300 Z" fill="#1E1409" opacity="0.75" />
      </svg>
    ),
  },
  {
    id: "dahab-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 4 Days / 3 Nights",
    title: "Dahab & Blue Lagoon Coastal Camp",
    subtitle: "Diving, marine sanctuaries, and slow mornings by turquoise water",
    description:
      "Unplug completely in South Sinai. Enjoy seaside mornings, world-class coral reef snorkeling at the Blue Hole and Ras Abu Galum, boat rides to the Blue Lagoon, and stargazing from beach campfires.",
    duration: "4 Days / 3 Nights",
    location: "Dahab & Ras Abu Galum, South Sinai",
    targetAudience: "Youth, Families & Adventure Groups",
    bgGradient: "linear-gradient(180deg, #0A2E2C 0%, #154D49 55%, #3A968D 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="330" cy="50" r="24" fill="#F8F5EE" opacity="0.8" />
        <path d="M0,200 Q50,180 100,200 T200,200 T300,200 T400,200" stroke="#DFC99E" strokeWidth="2.5" fill="none" opacity="0.8" />
        <path d="M0,230 Q50,210 100,230 T200,230 T300,230 T400,230" stroke="#F8F5EE" strokeWidth="2" fill="none" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "aswan-overnight",
    category: "overnight",
    categoryLabel: "Overnight Trip",
    tag: "Overnight · 4 Days / 3 Nights",
    title: "Aswan & Nile Nubian Voyage",
    subtitle: "A slow sailing voyage through timeless temples and colorful islands",
    description:
      "Sail on traditional wooden feluccas along the Nile, walk among towering columns at Philae Temple, and immerse in rich, warm Nubian heritage in Gharb Soheil.",
    duration: "4 Days / 3 Nights",
    location: "Aswan & Upper Egypt",
    targetAudience: "Cultural Travelers & Families",
    bgGradient: "linear-gradient(180deg, #241A0B 0%, #755928 55%, #B8893F 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
        <path d="M260,240 L340,240 L320,260 L250,260Z" fill="#F8F5EE" opacity="0.85" />
        <path d="M300,240 L300,195 L325,225Z" fill="#DFC99E" opacity="0.8" />
        <circle cx="100" cy="80" r="22" fill="#F8F5EE" opacity="0.75" />
      </svg>
    ),
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
    bgGradient: "linear-gradient(180deg, #1A2E26 0%, #356654 55%, #62A68F 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="120" cy="140" r="40" fill="none" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.8" />
        <circle cx="280" cy="120" r="30" fill="none" stroke="#DFC99E" strokeWidth="2.5" opacity="0.8" />
        <polygon points="450,220 500,120 550,220" fill="none" stroke="#F8F5EE" strokeWidth="2" opacity="0.75" />
      </svg>
    ),
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
    bgGradient: "linear-gradient(180deg, #302016 0%, #75442A 55%, #BA734C 100%)",
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
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="300" cy="130" r="28" fill="#F8F5EE" opacity="0.85" />
        <circle cx="370" cy="160" r="18" fill="#DFC99E" opacity="0.9" />
        <path d="M260,250 C260,190 340,190 340,250" fill="none" stroke="#F8F5EE" strokeWidth="2.5" opacity="0.8" />
        <path d="M350,250 C350,210 400,210 400,250" fill="none" stroke="#DFC99E" strokeWidth="2.5" opacity="0.85" />
      </svg>
    ),
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
    bgGradient: "linear-gradient(180deg, #1C241B 0%, #3B4D39 55%, #6E8A6A 100%)",
    highlights: [
      "Customized team synergy games & strategy simulations",
      "Mindfulness, wellness, and stress-relief outdoor sessions",
      "Starlit campfire reflection circles & live acoustic music",
      "Bespoke retreat venue with private dining and comfortable rooms",
    ],
    itinerary: [
      {
        step: "Day 1",
        title: "Synergy & Outdoor Challenges",
        desc: "Trust walks, team building ropes, problem solving, and sunset reflection.",
      },
      {
        step: "Evening",
        title: "Gala Dinner & Campfire",
        desc: "Celebratory banquet, teacher appreciation awards, and live music.",
      },
    ],
    included: [
      "Exclusive retreat venue booking and accommodations",
      "Expert team building facilitators and organizers",
      "Full catering, coffee breaks, and audio-visual setups",
    ],
    sceneSvg: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="xMidYMax slice">
        <circle cx="200" cy="180" r="14" fill="#F8F5EE" /><circle cx="280" cy="180" r="14" fill="#DFC99E" />
        <circle cx="360" cy="180" r="14" fill="#F8F5EE" /><circle cx="440" cy="180" r="14" fill="#DFC99E" />
        <path d="M160,260 L480,260" stroke="#F8F5EE" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
  },
];

// --- Simple Clean Inline Icons ---
const Icons = {
  Sparkle: () => <span>✦</span>,
  Calendar: () => (
    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
    </svg>
  ),
  MapPin: () => (
    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" />
      <circle cx="12" cy="10" r="3" strokeWidth="2" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-[#C5A059] inline-block flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
      <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function HomePage() {
  // State
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalGem, setActiveModalGem] = useState<GemItem | null>(null);

  // Form State (100% English)
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formType, setFormType] = useState("Event (Back to school, Sports day, Camp)");
  const [formGuests, setFormGuests] = useState("School Class / Small Group (10 - 25)");
  const [formNotes, setFormNotes] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Filter items
  const filteredGems = useMemo(() => {
    return GEMS_DATA.filter((gem) => {
      const matchesCat =
        selectedCategory === "all" ||
        gem.category === selectedCategory ||
        (selectedCategory === "day-trips" && gem.category === "day-trips") ||
        (selectedCategory === "overnight" && gem.category === "overnight");

      const matchesSearch =
        gem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Form Submit (Formatted in English to WhatsApp 01278886151)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const message =
      `*New Booking / Inquiry - Hidden Gems Egypt*\n\n` +
      `👤 *Name / Organization:* ${formName.trim()}\n` +
      `📞 *Phone / WhatsApp:* ${formPhone.trim()}\n` +
      `🚪 *Experience / Service:* ${formType}\n` +
      `👥 *Estimated Group Size:* ${formGuests}\n` +
      (formNotes.trim() ? `📝 *Notes & Preferred Dates:* ${formNotes.trim()}\n\n` : "\n") +
      `_Sent from Hidden Gems Website_`;

    const waUrl = `https://wa.me/${HIDDEN_GEMS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");

    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
  };

  // Direct WhatsApp for a specific Gem (in English)
  const handleDirectGemBook = (gem: GemItem) => {
    const message =
      `*Hello Hidden Gems!*\n\n` +
      `I would like to inquire about the following experience:\n\n` +
      `🌟 *Experience:* ${gem.title}\n` +
      `📍 *Location:* ${gem.location}\n` +
      `⏳ *Duration:* ${gem.duration}\n` +
      `🎯 *Category:* ${gem.categoryLabel}\n\n` +
      `Please share available dates, customized schedules, and booking details!`;

    const waUrl = `https://wa.me/${HIDDEN_GEMS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
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
              className="bg-[#2C3E2D] hover:bg-[#1D2A1E] text-[#FAF5EF] px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-md hover:shadow-xl border border-[#C5A059]/40 flex items-center gap-2 group"
            >
              <span>Explore All Experiences</span>
              <Icons.ArrowRight />
            </a>
            <a
              href="#contact"
              className="bg-[#FAF6F0] hover:bg-white text-[#2C3E2D] px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-sm hover:shadow-md border border-[#2C3E2D]/20"
            >
              Plan a Custom Event
            </a>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE TICKER ================= */}
      <div className="border-y border-[#C5A059]/25 bg-[#F3ECE1] py-4 overflow-hidden shadow-xs">
        <div className="animate-marquee items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4 text-xs sm:text-sm font-serif-luxury uppercase tracking-[0.2em] text-[#2C3E2D] font-semibold">
              <span>Color Your Own Character</span>
              <span className="text-[#C5A059]">✦</span>
              <span>Dragon Island &amp; Mario Ropes</span>
              <span className="text-[#C5A059]">✦</span>
              <span>Mirror Painting</span>
              <span className="text-[#C5A059]">✦</span>
              <span>Fayoum, Siwa &amp; Dahab</span>
              <span className="text-[#C5A059]">✦</span>
              <span>Father &amp; Child Days</span>
              <span className="text-[#C5A059]">✦</span>
              <span>Teachers Team Building</span>
              <span className="text-[#C5A059]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PHILOSOPHY / THE THREE DOORS OVERVIEW ================= */}
      <section id="philosophy" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <p className="font-serif-luxury italic text-[#C5A059] text-xl mb-3">Our Core Philosophy</p>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.08em] text-[#2C3E2D] font-medium leading-tight">
          &ldquo;Every person has a hidden gem within them. Every experience is an opportunity to discover it.&rdquo;
        </h2>
        <div className="w-16 h-[2px] bg-[#C5A059] mx-auto my-6"></div>

        <p className="text-[#4A5A48] text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
          We discover places through events and trips. During our trips and events, we visit hidden gems.
        </p>
      </section>

      {/* ================= THREE DOORS ARCH CARDS ================= */}
      <section id="doors" className="py-20 px-6 bg-[#F3ECE1] my-6 rounded-3xl max-w-7xl mx-auto shadow-xs">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="font-serif-luxury italic text-[#C5A059] text-lg mb-2">What we create</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#2C3E2D]">
            Three Doors
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto my-6"></div>
          <p className="text-sm sm:text-base text-[#4A5A48] font-light">
            Every door unlocks a specialized set of curated experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <li>Back to School Festivals</li>
                <li>End of Year Celebrations</li>
                <li>Father &amp; Child Bonding Days</li>
                <li>Mother &amp; Child Bonding Days</li>
                <li>Sports Days &amp; Active Tournaments</li>
                <li>Overnight Camps</li>
                <li>Teachers &amp; Corporate Team Building</li>
              </ul>
              <div className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#5E715C] group-hover:text-[#2C3E2D] transition-colors">
                <span>View Events</span>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>

          {/* Door 2: TRIPS (Sky Blue / Sand) */}
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
                <li>Fayoum Waterfalls &amp; Magic Lake</li>
                <li>Siwa Oasis Desert Safari</li>
                <li>Aswan &amp; Nile Felucca Sailing</li>
                <li>Dahab &amp; Blue Hole Lagoon</li>
                <li>Port Said &amp; Ismailia Heritage</li>
                <li>Sokhna Seaside Day Use</li>
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
                <li>Character Building Challenges</li>
                <li>Career Coaching &amp; Strengths Discovery</li>
                <li>Painting &amp; Color Theory</li>
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
            Tap any card to view the complete schedule, what&apos;s included, and inquire directly with our team.
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
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between cursor-pointer border border-[#C5A059]/25 hover:-translate-y-2 bg-[#2B2B26] text-[#FAF5EF]"
                style={{ minHeight: "360px" }}
              >
                {/* Background Artwork */}
                <div className="absolute inset-0 z-0" style={{ background: gem.bgGradient }}></div>

                {/* SVG Landscape Art */}
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                  {gem.sceneSvg}
                </div>

                {/* Gradient Vignette overlay for text readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1C18] via-[#1A1C18]/60 to-transparent"></div>

                {/* Top Badge Row */}
                <div className="relative z-20 p-6 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] bg-black/40 backdrop-blur-md text-[#DFC99E] border border-[#DFC99E]/30">
                    {gem.categoryLabel}
                  </span>
                  <span className="text-xs text-[#FAF5EF]/90 font-light flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Icons.Calendar />
                    <span>{gem.duration}</span>
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-20 p-6 pt-0">
                  <p className="text-xs font-serif-luxury italic text-[#DFC99E] mb-1">{gem.location}</p>
                  <h3 className="font-serif-luxury text-2xl uppercase tracking-[0.08em] font-semibold text-[#FAF5EF] mb-2 leading-tight group-hover:text-[#DFC99E] transition-colors">
                    {gem.title}
                  </h3>
                  <p className="text-xs text-[#FAF5EF]/80 font-light leading-relaxed line-clamp-2 mb-4">
                    {gem.subtitle}
                  </p>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <span className="text-[11px] text-[#DFC99E] font-medium tracking-wide">
                      {gem.targetAudience || "Customizable"}
                    </span>

                    <button className="px-4 py-2 rounded-full bg-[#DFC99E] hover:bg-[#FAF5EF] text-[#2C3E2D] text-[11px] font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer">
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

      {/* ================= MODAL: DETAILS & INQUIRY POPUP (ALL ENGLISH) ================= */}
      {activeModalGem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FAF5EF] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-[#C5A059]/40 max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Artwork */}
            <div
              className="relative h-48 sm:h-56 p-6 flex flex-col justify-between text-[#FAF5EF] overflow-hidden flex-shrink-0"
              style={{ background: activeModalGem.bgGradient }}
            >
              <div className="absolute inset-0 opacity-70">{activeModalGem.sceneSvg}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C18] via-[#1A1C18]/40 to-transparent"></div>

              {/* Close button */}
              <button
                onClick={() => setActiveModalGem(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 text-[#FAF5EF] hover:bg-black/80 flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
              >
                <Icons.Close />
              </button>

              <div className="relative z-20">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-black/50 backdrop-blur-md text-[#DFC99E] border border-[#DFC99E]/30">
                  {activeModalGem.tag}
                </span>
              </div>

              <div className="relative z-20">
                <h2 className="font-serif-luxury text-2xl sm:text-4xl uppercase tracking-[0.08em] font-semibold text-[#FAF5EF]">
                  {activeModalGem.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#DFC99E] font-light flex items-center gap-2 mt-1">
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
                    <div key={idx} className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#C5A059]/20">
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
                      <option value="Day Trip (Dragon Island, Mario Ropes, Kayaking, Fayoum)">Day Trips (Dragon Island, Mario Ropes, Fayoum)</option>
                      <option value="Overnight Trip (Siwa, Dahab, Aswan, Nweibaa)">Overnight Adventures (Siwa, Dahab, Aswan, Nweibaa)</option>
                      <option value="Workshop (Color Character, Mirror Painting, Crafts)">Workshops (Color Character, Mirror Painting, Crafts)</option>
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