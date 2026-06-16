import type { Category } from "./categories";

/** Powertrain family for movement parts. Lets users build quartz or
 *  meca-quartz watches alongside automatics on the same SKX/NH35 platform. */
export type MovementType = "automatic" | "quartz" | "meca-quartz";

export const MOVEMENT_TYPE_META: Record<
  MovementType,
  { label: string; blurb: string }
> = {
  automatic: {
    label: "Automatic",
    blurb: "Self-winding mechanical. Smooth sweep, no battery.",
  },
  quartz: {
    label: "Quartz",
    blurb: "Battery-powered. Highly accurate, low-maintenance.",
  },
  "meca-quartz": {
    label: "Meca-quartz",
    blurb: "Quartz timekeeping with a mechanical chronograph module.",
  },
};

export type Part = {
  id: string;
  category: Category;
  name: string;
  brand: string;
  priceUsd: number;
  priceRange: [number, number];
  description: string;
  vendorName?: string;
  vendorUrl?: string;
  /** Tags this part offers (e.g. 'nh35-feet', 'lug-20mm', 'case-srpd'). */
  compatibility?: string[];
  /** Tags this part needs from other selected parts. */
  requires?: string[];
  /** Powertrain family — set on movement parts only. */
  movementType?: MovementType;
};

const mid = (lo: number, hi: number) => Math.round(((lo + hi) / 2) * 100) / 100;

export const PARTS: Part[] = [
  // ── Movements ──────────────────────────────────────────────
  {
    id: "mv-nh35a",
    category: "movement",
    name: "NH35A",
    brand: "Seiko",
    movementType: "automatic",
    priceUsd: mid(18, 22),
    priceRange: [18, 22],
    description:
      "Most popular mod movement. Hacking, hand-winding. Fits most NH35-compatible cases.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["nh35-movement"],
    requires: ["nh35-feet"],
  },
  {
    id: "mv-nh36a",
    category: "movement",
    name: "NH36A",
    brand: "Seiko",
    movementType: "automatic",
    priceUsd: mid(22, 28),
    priceRange: [22, 28],
    description:
      "NH35 with day/date. Same footprint. Use for builds needing both complications.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["nh35-movement"],
    requires: ["nh35-feet"],
  },
  {
    id: "mv-miyota-9015",
    category: "movement",
    name: "Miyota 9015",
    brand: "Miyota",
    movementType: "automatic",
    priceUsd: mid(55, 75),
    priceRange: [55, 75],
    description:
      "Higher beat rate (28,800 bph). Smoother sweep. Fits Miyota 9015 cases.",
    vendorName: "Otto Frei",
    vendorUrl: "https://www.ofrei.com",
    compatibility: ["miyota-9015-movement"],
    requires: ["miyota-9015-feet"],
  },
  {
    id: "mv-nh38a",
    category: "movement",
    name: "NH38A",
    brand: "Seiko",
    movementType: "automatic",
    priceUsd: mid(28, 35),
    priceRange: [28, 35],
    description: "No date variant. Clean dial option for no-date builds.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["nh35-movement"],
    requires: ["nh35-feet"],
  },
  {
    id: "mv-vh31",
    category: "movement",
    name: "VH31",
    brand: "Seiko",
    movementType: "quartz",
    priceUsd: mid(15, 22),
    priceRange: [15, 22],
    description:
      "Sweeping-seconds quartz — looks mechanical, ticks like a quartz. True NH35 drop-in: same feet, hands, and case footprint. No winding, battery-accurate.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    // Marketed as an NH35 drop-in, so it works with the same dials/hands/cases.
    compatibility: ["nh35-movement"],
    requires: ["nh35-feet"],
  },
  {
    id: "mv-vk63",
    category: "movement",
    name: "VK63",
    brand: "Seiko (TMI)",
    movementType: "meca-quartz",
    priceUsd: mid(40, 55),
    priceRange: [40, 55],
    description:
      "Meca-quartz chronograph (60-min counter + small seconds). Quartz timekeeping, mechanical snap-back chrono hand. Pair with a chronograph dial + pusher case.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["vk-chrono-movement"],
    requires: ["nh35-feet", "pusher-case"],
  },
  {
    id: "mv-vk64",
    category: "movement",
    name: "VK64",
    brand: "Seiko (TMI)",
    movementType: "meca-quartz",
    priceUsd: mid(42, 58),
    priceRange: [42, 58],
    description:
      "Meca-quartz chronograph with 3-6-9 subdial layout. Snappy chrono reset, quartz accuracy. Needs a chronograph dial + pushers.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["vk-chrono-movement"],
    requires: ["nh35-feet", "pusher-case"],
  },

  // ── Cases ──────────────────────────────────────────────────
  {
    id: "case-skx-srpd",
    category: "case",
    name: "SKX/SRPD Diver Case",
    brand: "Generic",
    priceUsd: mid(40, 60),
    priceRange: [40, 60],
    description:
      "Classic 42mm dive case. NH35-compatible. 22mm lug. Fits standard SKX bezels.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["nh35-feet", "lug-22mm", "case-srpd", "crystal-31.5mm"],
  },
  {
    id: "case-turtle",
    category: "case",
    name: "Turtle Case (SRP777)",
    brand: "Generic",
    priceUsd: mid(45, 65),
    priceRange: [45, 65],
    description:
      "Cushion case. NH35. 44.3mm. Wide lug. Iconic diver silhouette.",
    vendorName: "Crystaltimes",
    vendorUrl: "https://www.crystaltimes.net",
    compatibility: ["nh35-feet", "lug-22mm", "case-turtle", "crystal-31.5mm"],
  },
  {
    id: "case-explorer",
    category: "case",
    name: "Explorer-style Round Case",
    brand: "Generic",
    priceUsd: mid(35, 55),
    priceRange: [35, 55],
    description: "NH35. 39mm. Clean sports-dress crossover. Versatile.",
    vendorName: "Secondhand Mods",
    vendorUrl: "https://secondhandmods.com",
    compatibility: ["nh35-feet", "lug-20mm", "case-explorer", "crystal-30mm"],
  },
  {
    id: "case-chrono-panda",
    category: "case",
    name: "Chronograph Pusher Case 40mm",
    brand: "Generic",
    priceUsd: mid(55, 80),
    priceRange: [55, 80],
    description:
      "Two-pusher chronograph case for VK63/VK64 meca-quartz builds. 40mm, 20mm lug. Drilled for chrono pushers.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: [
      "nh35-feet",
      "pusher-case",
      "lug-20mm",
      "case-chrono",
      "crystal-30mm",
    ],
  },

  // ── Dials ──────────────────────────────────────────────────
  {
    id: "dial-waffle",
    category: "dial",
    name: "Waffle Dial",
    brand: "Custom",
    priceUsd: mid(12, 25),
    priceRange: [12, 25],
    description:
      "Textured sunray pattern. Comes in black, blue, silver. NH35 feet.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    compatibility: ["nh35-feet"],
    requires: ["nh35-movement"],
  },
  {
    id: "dial-sandwich",
    category: "dial",
    name: "Sandwich Dial",
    brand: "Custom",
    priceUsd: mid(18, 35),
    priceRange: [18, 35],
    description:
      "Layered construction. Deep lume effect. Typically NH35 compatible.",
    vendorName: "DLW Watches",
    vendorUrl: "https://dlwwatches.com",
    compatibility: ["nh35-feet"],
    requires: ["nh35-movement"],
  },
  {
    id: "dial-meteorite",
    category: "dial",
    name: "Meteorite Dial",
    brand: "Custom",
    priceUsd: mid(30, 60),
    priceRange: [30, 60],
    description:
      "Real Gibeon meteorite slice. Statement piece. Check feet spacing.",
    vendorName: "Secondhand Watches",
    vendorUrl: "https://secondhandwatches.com",
    compatibility: ["nh35-feet"],
    requires: ["nh35-movement"],
  },
  {
    id: "dial-chrono-panda",
    category: "dial",
    name: "Panda Chronograph Dial",
    brand: "Custom",
    priceUsd: mid(28, 50),
    priceRange: [28, 50],
    description:
      "White dial with black subdials — the classic panda chrono look. Cut for VK63/VK64 subdial layout.",
    vendorName: "DLW Watches",
    vendorUrl: "https://dlwwatches.com",
    compatibility: ["nh35-feet"],
    requires: ["vk-chrono-movement"],
  },
  {
    id: "dial-chrono-reverse-panda",
    category: "dial",
    name: "Reverse Panda Chrono Dial",
    brand: "Custom",
    priceUsd: mid(28, 50),
    priceRange: [28, 50],
    description:
      "Black dial with white subdials. Bold motorsport contrast. VK63/VK64 subdial spacing.",
    vendorName: "DLW Watches",
    vendorUrl: "https://dlwwatches.com",
    compatibility: ["nh35-feet"],
    requires: ["vk-chrono-movement"],
  },

  // ── Hands ──────────────────────────────────────────────────
  {
    id: "hands-mercedes",
    category: "hands",
    name: "Mercedes Hands Set",
    brand: "Custom",
    priceUsd: mid(10, 18),
    priceRange: [10, 18],
    description: "Classic dive hand set. NH35 post sizes. Lumed.",
    vendorName: "Secondhand Watches",
    vendorUrl: "https://secondhandwatches.com",
    requires: ["nh35-movement"],
  },
  {
    id: "hands-snowflake",
    category: "hands",
    name: "Snowflake Hands",
    brand: "Custom",
    priceUsd: mid(12, 22),
    priceRange: [12, 22],
    description:
      "Tudor-inspired snowflake set. NH35 compatible. Strong lume.",
    vendorName: "DLW Watches",
    vendorUrl: "https://dlwwatches.com",
    requires: ["nh35-movement"],
  },
  {
    id: "hands-plongeur",
    category: "hands",
    name: "Plongeur Hands",
    brand: "Custom",
    priceUsd: mid(10, 16),
    priceRange: [10, 16],
    description: "Long minute hand for fast time reads. NH35 posts.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    requires: ["nh35-movement"],
  },
  {
    id: "hands-chrono-set",
    category: "hands",
    name: "Chronograph Hand Set",
    brand: "Custom",
    priceUsd: mid(15, 28),
    priceRange: [15, 28],
    description:
      "Full meca-quartz hand set: hour, minute, central chrono seconds, plus subdial hands. Sized for VK63/VK64 posts.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    requires: ["vk-chrono-movement"],
  },

  // ── Bezel & Insert ─────────────────────────────────────────
  {
    id: "bezel-srpd-ceramic",
    category: "bezel",
    name: "SRPD Ceramic Insert",
    brand: "Custom",
    priceUsd: mid(20, 35),
    priceRange: [20, 35],
    description: "Ceramic dive bezel insert for SRPD/SKX cases.",
    vendorName: "Crystaltimes",
    vendorUrl: "https://www.crystaltimes.net",
    requires: ["case-srpd"],
  },
  {
    id: "bezel-turtle-coin",
    category: "bezel",
    name: "Turtle Coin-Edge Bezel",
    brand: "Custom",
    priceUsd: mid(18, 30),
    priceRange: [18, 30],
    description: "Coin-edge bezel for Turtle cases. Steel finish.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    requires: ["case-turtle"],
  },
  {
    id: "bezel-explorer-smooth",
    category: "bezel",
    name: "Smooth Polished Bezel",
    brand: "Custom",
    priceUsd: mid(12, 20),
    priceRange: [12, 20],
    description: "Slim polished bezel for Explorer-style cases.",
    vendorName: "Secondhand Mods",
    vendorUrl: "https://secondhandmods.com",
    requires: ["case-explorer"],
  },
  {
    id: "bezel-tachymeter",
    category: "bezel",
    name: "Tachymeter Bezel",
    brand: "Custom",
    priceUsd: mid(15, 28),
    priceRange: [15, 28],
    description:
      "Fixed tachymeter bezel for the chronograph pusher case. Steel or black options.",
    vendorName: "Namoki",
    vendorUrl: "https://namokimods.com",
    requires: ["case-chrono"],
  },

  // ── Crystal ────────────────────────────────────────────────
  {
    id: "crystal-dd-sapphire-315",
    category: "crystal",
    name: "Double-Dome Sapphire 31.5mm",
    brand: "Crystaltimes",
    priceUsd: mid(25, 45),
    priceRange: [25, 45],
    description: "Double-dome sapphire with blue AR. Fits SKX/Turtle/SRPD.",
    vendorName: "Crystaltimes",
    vendorUrl: "https://www.crystaltimes.net",
    requires: ["crystal-31.5mm"],
  },
  {
    id: "crystal-flat-sapphire-30",
    category: "crystal",
    name: "Flat Sapphire 30mm",
    brand: "Crystaltimes",
    priceUsd: mid(18, 30),
    priceRange: [18, 30],
    description: "Flat sapphire with underside AR. Fits Explorer-style cases.",
    vendorName: "Crystaltimes",
    vendorUrl: "https://www.crystaltimes.net",
    requires: ["crystal-30mm"],
  },

  // ── Strap / Bracelet ───────────────────────────────────────
  {
    id: "strap-oyster-22",
    category: "strap",
    name: "Oyster Bracelet 22mm",
    brand: "Strapcode",
    priceUsd: mid(55, 90),
    priceRange: [55, 90],
    description: "Solid-link oyster with screw pins. 22mm lug.",
    vendorName: "Strapcode",
    vendorUrl: "https://www.strapcode.com",
    requires: ["lug-22mm"],
  },
  {
    id: "strap-tropic-22",
    category: "strap",
    name: "Tropic Rubber 22mm",
    brand: "Generic",
    priceUsd: mid(15, 30),
    priceRange: [15, 30],
    description: "FKM rubber tropic-pattern dive strap. 22mm lug.",
    vendorName: "Barton",
    vendorUrl: "https://bartonwatchbands.com",
    requires: ["lug-22mm"],
  },
  {
    id: "strap-leather-20",
    category: "strap",
    name: "Horween Leather 20mm",
    brand: "Generic",
    priceUsd: mid(25, 50),
    priceRange: [25, 50],
    description: "Quick-release leather strap. 20mm lug.",
    vendorName: "Barton",
    vendorUrl: "https://bartonwatchbands.com",
    requires: ["lug-20mm"],
  },
];

export function partsByCategory(category: Category) {
  return PARTS.filter((p) => p.category === category);
}

export function partById(id: string | undefined | null) {
  if (!id) return undefined;
  return PARTS.find((p) => p.id === id);
}
