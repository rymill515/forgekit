export type Category =
  | "movement"
  | "case"
  | "dial"
  | "hands"
  | "bezel"
  | "crystal"
  | "strap";

export type CategoryMeta = {
  id: Category;
  label: string;
  helper: string;
  placeholder: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "movement",
    label: "Movement",
    helper: "The engine. Pick this first — most other parts must match its feet.",
    placeholder: "Choose a movement",
  },
  {
    id: "case",
    label: "Case",
    helper: "Defines size, lug width, and movement compatibility.",
    placeholder: "Choose a case",
  },
  {
    id: "dial",
    label: "Dial",
    helper: "The face. Must match your movement's dial feet spacing.",
    placeholder: "Choose a dial",
  },
  {
    id: "hands",
    label: "Hands",
    helper: "Hour, minute, second. Must match movement post sizes.",
    placeholder: "Choose hands",
  },
  {
    id: "bezel",
    label: "Bezel & Insert",
    helper: "Rotating ring around the crystal. Case-specific.",
    placeholder: "Choose a bezel",
  },
  {
    id: "crystal",
    label: "Crystal",
    helper: "Sapphire, mineral, acrylic. Case-specific diameter.",
    placeholder: "Choose a crystal",
  },
  {
    id: "strap",
    label: "Strap / Bracelet",
    helper: "Match your lug width.",
    placeholder: "Choose a strap",
  },
];
