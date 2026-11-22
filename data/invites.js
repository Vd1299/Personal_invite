/* ============================================================
   💌 INVITES — each object = one e-date invite.
   Share it with:  https://<user>.github.io/<repo>/invite.html?id=<id>
   `start` is ISO with a timezone offset; everyone sees it in their
   own local time. Plan items are "minutes after start", so they also
   show up in each person's own time zone.
   ============================================================ */
window.INVITES = [
  {
    id: "thanksgiving-2026",
    emoji: "🦃",
    title: "Our Thanksgiving E-Date",
    question: "Will you be my Thanksgiving e-date?",
    tagline: "Dinner, dessert, a movie & far too much gratitude",
    start: "2026-11-26T19:00:00-08:00", // 7 PM PST = 9 PM CST
    durationMinutes: 240,
    dressCode: "Cozy sweater, fuzzy socks, stretchy pants 🧦",

    letter: `My dearest Meow Meow ❤️,

This Thanksgiving I can't pass you the mashed potatoes in person, so I've planned the next best thing: a whole evening, just us.

We'll eat dinner together over video, watch something cosy, share dessert at intermission, and talk about everything we're thankful for. (Spoiler: it's you.)

Fuzzy socks are mandatory. Pie is encouraged.`,

    // 🍽️ Shown after they say yes: you each order the other's food
    food: {
      title: "The food deal",
      intro: "We each order dinner & dessert for the OTHER person on DoorDash. Surprise each other!",
      rules: [
        "Order 1 dinner + 1 dessert for the other person",
        "Schedule delivery to arrive right at our start time (see above)",
        "No spoilers! The other person finds out when it arrives 🤫",
        "Pick something you think they'll love; one wildcard item is allowed 😏",
        "We unbox it together on video, then rate it out of 10 ⭐",
      ],
    },

    // One option = "now showing". Several = partner picks one in the invite.
    watch: [
      { title: "Knives Out", emoji: "🔪", note: "thriller · cozy-sweater murder mystery" },
      { title: "When Harry Met Sally…", emoji: "💕", note: "rom-com · has Thanksgiving scenes!" },
      { title: "Planes, Trains and Automobiles", emoji: "🚂", note: "comedy · the Thanksgiving classic" },
    ],

    // `at` = minutes after start; shown in each viewer's own local time
    schedule: [
      { at: 0, what: "DoorDash arrives! Unbox each other's surprise on video", emoji: "🔔" },
      { at: 15, what: "Dinner together", emoji: "🍽️" },
      { at: 60, what: "Movie night", emoji: "🎬" },
      { at: 90, what: "Dessert break (intermission!)", emoji: "🥧" },
      { at: 180, what: "Gratitude cards & silly games", emoji: "🎲" },
    ],
  },
];
