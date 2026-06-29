/** Curated learning resources for new watch modders. Hand-picked, well-known
 *  starting points — not an exhaustive list. */

export type ResourceKind = "guide" | "video" | "community";

export type Resource = {
  title: string;
  source: string;
  url: string;
  kind: ResourceKind;
  blurb: string;
  /** Shown with a star — the best single starting point per section. */
  pick?: boolean;
};

export type ResourceSection = {
  id: string;
  label: string;
  intro: string;
  items: Resource[];
};

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "start-here",
    label: "Start here",
    intro:
      "If you've never opened a watch before, read these first. They cover the whole arc — what you're buying, why it fits, and what tools you need.",
    items: [
      {
        title: "The Beginner's Guide to Modding a Seiko",
        source: "WatchGecko",
        url: "https://www.watchgecko.com/journal/the-ultimate-beginners-guide-to-modding-a-seiko-watch",
        kind: "guide",
        blurb:
          "End-to-end primer: tools, parts vocabulary, common Seiko platforms, and the order of operations on a first build.",
        pick: true,
      },
      {
        title: "Watch Modding 101 — Tools & First Build",
        source: "Namoki Mods",
        url: "https://namokimods.com/blogs/watchmodblog",
        kind: "guide",
        blurb:
          "Vendor blog with build logs, part compatibility notes, and tool recommendations from one of the largest mod parts suppliers.",
      },
      {
        title: "Crystaltimes Tutorials",
        source: "Crystaltimes",
        url: "https://www.crystaltimes.net/pages/tutorial",
        kind: "guide",
        blurb:
          "Step-by-step crystal swaps, bezel insert installs, and case-back work — the fiddly bits explained with photos.",
      },
    ],
  },
  {
    id: "youtube",
    label: "YouTube — watch & learn",
    intro:
      "Modding is a hands-on craft. Watching someone do it once is worth more than reading three articles.",
    items: [
      {
        title: "Long Island Watch — Watch & Learn",
        source: "YouTube",
        url: "https://www.youtube.com/@LongIslandWatch",
        kind: "video",
        blurb:
          "Marc Frankel's huge library covers NH35 swaps, regulation, dial/hand work, and Seiko platform basics. The default first watch.",
        pick: true,
      },
      {
        title: "Wristwatch Revival",
        source: "YouTube",
        url: "https://www.youtube.com/@WristwatchRevival",
        kind: "video",
        blurb:
          "Marshall's restoration series. Not pure modding, but the best way to understand how a movement actually works.",
      },
      {
        title: "Just One More Watch",
        source: "YouTube",
        url: "https://www.youtube.com/@JustOneMoreWatch",
        kind: "video",
        blurb:
          "Reviews of affordable mod-friendly watches and parts — useful for sanity-checking case and donor choices.",
      },
      {
        title: "Nick Shabazz",
        source: "YouTube",
        url: "https://www.youtube.com/@NickShabazz",
        kind: "video",
        blurb:
          "Plain-spoken reviews and teardowns. Strong on what makes a watch worth modding vs. leaving alone.",
      },
    ],
  },
  {
    id: "deep-dives",
    label: "Deep dives & references",
    intro:
      "Bookmark these for when you hit a specific question — movement specs, dial foot positions, lume application.",
    items: [
      {
        title: "Seiko NH35 / NH36 Technical Guide",
        source: "Watch Repair Channel",
        url: "https://www.youtube.com/watch?v=QnIlzIz0LyA",
        kind: "video",
        blurb:
          "Calibre overview, regulation, and common service points for the NH35 — the movement under most mod builds.",
      },
      {
        title: "How to Apply Lume",
        source: "Esslinger",
        url: "https://www.esslinger.com/how-to-apply-watch-lume/",
        kind: "guide",
        blurb:
          "Mixing ratios, brush technique, drying times. The single skill that most separates an OK build from a great one.",
      },
      {
        title: "Hodinkee — Reference Points",
        source: "Hodinkee",
        url: "https://www.hodinkee.com/articles",
        kind: "guide",
        blurb:
          "Design history for the watches you're probably homaging. Useful for getting proportions and dial colors right.",
      },
    ],
  },
  {
    id: "community",
    label: "Communities — ask for help",
    intro:
      "When a part won't seat or a hand won't align, post a photo. Modders are surprisingly generous with answers.",
    items: [
      {
        title: "r/SeikoMods",
        source: "Reddit",
        url: "https://www.reddit.com/r/SeikoMods/",
        kind: "community",
        blurb:
          "The biggest mod community. Build galleries, parts sourcing threads, and troubleshooting help.",
        pick: true,
      },
      {
        title: "r/Watchmodding",
        source: "Reddit",
        url: "https://www.reddit.com/r/Watchmodding/",
        kind: "community",
        blurb:
          "Broader scope than r/SeikoMods — Miyota, ETA, and vintage donor projects show up here too.",
      },
      {
        title: "WatchUSeek Modding Forum",
        source: "WatchUSeek",
        url: "https://www.watchuseek.com/forums/affordable-watches.18/",
        kind: "community",
        blurb:
          "Old-school forum with deep archived threads. Search before you post — your question is likely already answered.",
      },
    ],
  },
];
