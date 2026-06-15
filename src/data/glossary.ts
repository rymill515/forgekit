export type GlossaryEntry = {
  term: string;
  definition: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "Movement",
    definition:
      "The mechanical engine. NH35/NH36 are the most common mod movements — affordable, reliable, and supported by virtually every aftermarket case and dial.",
  },
  {
    term: "Dial Feet",
    definition:
      "Tiny pins on the back of the dial that lock it to the movement. Feet spacing differs between NH35 and Miyota — a dial cut for NH35 won't sit flat on a Miyota 9015.",
  },
  {
    term: "Chapter Ring",
    definition:
      "The ring between the dial and the crystal that shows minute markers. Misalignment is the classic mod telltale — always rotate to true before final assembly.",
  },
  {
    term: "Lug Width",
    definition:
      "The space between the case lugs where the strap sits. Common widths: 18mm, 20mm, 22mm. Your strap and case must match.",
  },
  {
    term: "Bezel Insert",
    definition:
      "The ring with markings on top of the bezel. Aluminum is cheap and replaceable; ceramic is scratch-resistant and pricier.",
  },
  {
    term: "Crystal",
    definition:
      "The clear cover over the dial. Sapphire is the standard for mods — scratch-proof, often with anti-reflective coating. Diameter must match the case.",
  },
  {
    term: "AR Coating",
    definition:
      "Anti-reflective coating on the crystal. Underside AR is invisible; double-sided AR is glassier but scratches more easily.",
  },
  {
    term: "Hacking & Hand-winding",
    definition:
      "Hacking stops the seconds hand when the crown is pulled out (lets you set time precisely). Hand-winding lets you wind the mainspring manually. NH35 has both; older 7S26 has neither.",
  },
];

export const COMPATIBILITY_TIPS = [
  "Always pick the movement first — it dictates which dials and hands will fit.",
  "Lug width on your case must match the strap. 22mm is by far the most common in dive mods.",
  "Bezels are case-specific. An SKX bezel won't drop onto a Turtle case without machining.",
  "Crystals are sized to the case bore. Buy the crystal from the same vendor as the case when possible.",
  "Dial diameter matters as much as feet spacing — a 28.5mm dial in a 29mm opening looks wrong.",
];
