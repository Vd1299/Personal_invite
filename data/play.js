/* ============================================================
   🎲 PLAY — conversation card decks + online games for two.
   ============================================================ */
window.DECKS = [
  {
    id: "gratitude",
    name: "Gratitude Jar",
    emoji: "🍂",
    color: "#e9893b",
    cards: [
      "What's one tiny thing I do that makes your day better?",
      "What moment this year are you most thankful for?",
      "Something about yourself you're proud of this year?",
      "Which memory of us do you replay the most?",
      "What's something you're thankful for that you've never said out loud?",
      "Who in your life are you grateful for, besides me? 😌",
      "What's a hard thing this year that taught you something good?",
      "What about our future are you most excited for?",
      "Thank me for one weirdly specific thing.",
      "What does 'home' feel like to you right now?",
    ],
  },
  {
    id: "wyr",
    name: "Would You Rather",
    emoji: "🤔",
    color: "#c8553d",
    cards: [
      "Would you rather only eat stuffing or only eat pie forever?",
      "Would you rather teleport to me once a week or live next door forever?",
      "Would you rather have a cabin in the woods or a flat by the sea together?",
      "Would you rather relive our first call or skip ahead to our first trip?",
      "Would you rather cook together badly or order in perfectly?",
      "Would you rather we adopt a cat or a dog first?",
      "Would you rather know my every thought for a day or have me know yours?",
      "Would you rather a surprise trip or a surprise party?",
      "Would you rather slow dance in the kitchen or the rain?",
      "Would you rather have a movie made about us or a song written about us?",
    ],
  },
  {
    id: "deep",
    name: "Deep Talk",
    emoji: "🌙",
    color: "#6b4a7a",
    cards: [
      "When did you first know you liked me?",
      "What's a dream you haven't told anyone yet?",
      "What do you need more of from me?",
      "What does a perfect ordinary day with me look like?",
      "What's something you want us to always keep doing?",
      "What fear are you working through right now?",
      "Where do you see us in five years?",
      "What song reminds you of us and why?",
    ],
  },
];

// Games you can play together while on a call
window.GAMES = [
  { id: "skribbl", name: "skribbl.io", emoji: "🎨", url: "https://skribbl.io/", note: "Draw & guess, make a private room" },
  { id: "papergames", name: "Paper Games", emoji: "⭕", url: "https://papergames.io/", note: "Tic-tac-toe, Connect 4, Battleship" },
  { id: "gartic", name: "Gartic Phone", emoji: "📞", url: "https://garticphone.com/", note: "Telephone + drawing chaos" },
  { id: "codenames", name: "Codenames", emoji: "🕵️", url: "https://codenames.game/", note: "Play the duet-ish way" },
  { id: "geoguessr", name: "Free GeoGuessr-likes", emoji: "🌍", url: "https://openguessr.com/", note: "Guess where in the world" },
];

/* ============================================================
   💬 COUPLE QUESTIONS — each person gets a random round of
   `roundSize` cards on their own phone/laptop. Add as many as you like.
   ============================================================ */
window.COUPLE_QUESTIONS = {
  roundSize: 5,
  categories: [
    {
      name: "How it started", emoji: "🌱", color: "#7d9870",
      cards: [
        "What was your very first impression of me?",
        "What's the first message or moment you remember between us?",
        "When did you realise you actually liked me?",
        "What almost stopped you from talking to me?",
        "What's something about me that surprised you early on?",
        "Which early conversation do you still think about?",
        "What did you tell your friends about me in the beginning?",
        "Was there a moment you knew this was different?",
        "What were you nervous about when we first started talking?",
        "If you could relive one day from our beginning, which one?",
      ],
    },
    {
      name: "Us right now", emoji: "💛", color: "#e9893b",
      cards: [
        "What's your favourite thing about us right now?",
        "What's a small thing I do that makes you feel loved?",
        "When do you feel closest to me, even from far away?",
        "What's our funniest inside joke, and how did it start?",
        "What's one thing you'd like us to do more often?",
        "What song feels like 'us' lately?",
        "What's something you've learned from me?",
        "What's your favourite way we spend time together?",
        "How would you describe our relationship in three words?",
        "What's something you've been wanting to tell me?",
      ],
    },
    {
      name: "Our future", emoji: "🔮", color: "#6b4a7a",
      cards: [
        "Where do you see us in five years?",
        "What's the first trip you want us to take together?",
        "What does our dream home look like?",
        "What's a tradition you want us to start?",
        "What are you most excited to do once we're in the same city?",
        "Cat, dog, or both, and what are we naming them?",
        "What does a perfect lazy Sunday together look like in the future?",
        "What's one goal you want us to chase together?",
        "How do you want to celebrate our next anniversary?",
        "What's something you want us to still be doing when we're 80?",
      ],
    },
    {
      name: "Deep talk", emoji: "🌙", color: "#4a2c3a",
      cards: [
        "What's a fear you're working through right now?",
        "What makes you feel most understood?",
        "What's a dream you've never said out loud?",
        "What do you need from me on your hardest days?",
        "What's something from your childhood that shaped who you are?",
        "What does love mean to you?",
        "What are you most proud of about yourself this year?",
        "When do you feel most like yourself?",
        "What's something you wish more people knew about you?",
        "What's one way I can support you better?",
      ],
    },
    {
      name: "Just for fun", emoji: "🎈", color: "#c8553d",
      cards: [
        "If we were a movie, what genre would it be and who plays us?",
        "What's the most 'me' thing I do?",
        "What's your go-to order if I surprised you with food?",
        "If we swapped lives for a day, what's the first thing you'd do?",
        "What would our couple name be?",
        "What's a weird habit of mine you secretly love?",
        "If we won the lottery tomorrow, what's our first purchase?",
        "Which fictional couple are we most like?",
        "What would our reality show be called?",
        "Describe me using only emojis 👀",
      ],
    },
  ],
};
