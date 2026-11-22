/* ============ shared helpers ============ */
const S = window.SITE || {};
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const paras = t => esc(t).split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
const params = new URLSearchParams(location.search);
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};
const parseDay = d => new Date(d.length === 10 ? d + "T12:00:00" : d);
const fmtDay = d => parseDay(d).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
const fmtTime = d => d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
const fmtWhen = d => new Date(d).toLocaleString(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
const who = a => a === "me" ? S.me : a === "you" ? S.you : a;
const rnd = (a, b) => a + Math.random() * (b - a);

function toast(msg) {
  const t = Object.assign(document.createElement("div"), { className: "toast", textContent: msg });
  document.body.append(t);
  setTimeout(() => t.remove(), 2400);
}

function parts(ms) {
  ms = Math.max(0, ms);
  return { days: Math.floor(ms / 864e5), hours: Math.floor(ms / 36e5) % 24, mins: Math.floor(ms / 6e4) % 60, secs: Math.floor(ms / 1e3) % 60 };
}
function countdown(el, target, doneText = "It's time! 💛") {
  const tick = () => {
    const ms = new Date(target) - Date.now();
    if (ms <= 0) { el.innerHTML = `<p class="hand center">${doneText}</p>`; return clearInterval(id); }
    const p = parts(ms);
    el.innerHTML = Object.entries(p).map(([k, v]) => `<div class="unit"><b>${v}</b><small>${k}</small></div>`).join("");
  };
  const id = setInterval(tick, 1000); tick();
}

/* ============ layout: nav, footer, floating leaves ============ */
function layout() {
  const page = document.body.dataset.page;
  const links = [["index", "Home"], ["journey", "Journey"], ["gallery", "Photos"], ["writings", "Writings"], ["play", "Play"]];
  document.body.insertAdjacentHTML("afterbegin", `
    <nav class="nav"><div class="wrap">
      <a class="logo" href="index.html">${esc(S.me)} <span>♥</span> ${esc(S.you)}</a>
      <ul>${links.map(([h, l]) => `<li><a class="link ${page === h ? "active" : ""}" href="${h}.html">${l}</a></li>`).join("")}</ul>
    </div></nav>`);
  const days = Math.floor((Date.now() - parseDay(S.togetherSince)) / 864e5);
  document.body.insertAdjacentHTML("beforeend", `
    <footer><div class="hand">${esc(S.motto || "")}</div>
    <div>together for <b>${days.toLocaleString()}</b> days & counting</div></footer>`);
  floaties(document.body.dataset.floaties || "🍂🍁💛🧡🍂");
}

function floaties(chars, n = 14) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = Object.assign(document.createElement("div"), { className: "floaties" });
  const list = [...chars];
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.textContent = list[i % list.length];
    s.style.cssText = `left:${rnd(0, 100)}vw;font-size:${rnd(14, 30)}px;animation-duration:${rnd(14, 28)}s;animation-delay:${-rnd(0, 28)}s;--dx:${rnd(-80, 80)}px`;
    box.append(s);
  }
  document.body.prepend(box);
}

function confetti(chars = "💛🧡🍂🥧✨💕") {
  const c = Object.assign(document.createElement("canvas"), { style: "position:fixed;inset:0;pointer-events:none;z-index:150" });
  c.width = innerWidth; c.height = innerHeight; document.body.append(c);
  const ctx = c.getContext("2d"), list = [...chars];
  const ps = Array.from({ length: 140 }, () => ({
    x: c.width / 2 + rnd(-80, 80), y: c.height * .55, vx: rnd(-9, 9), vy: rnd(-17, -6),
    r: rnd(0, 6), vr: rnd(-.2, .2), s: rnd(18, 34), ch: list[Math.floor(rnd(0, list.length))],
  }));
  let f = 0;
  (function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += .35; p.vx *= .99; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.font = `${p.s}px serif`; ctx.fillText(p.ch, 0, 0); ctx.restore();
    });
    if (++f < 220) requestAnimationFrame(draw); else c.remove();
  })();
}

/* ============ lightbox ============ */
function lightbox() {
  const lb = Object.assign(document.createElement("div"), { className: "lightbox", innerHTML: "<div><img alt=''><p></p></div>" });
  lb.onclick = () => lb.classList.remove("on");
  document.body.append(lb);
  document.addEventListener("click", e => {
    const p = e.target.closest(".polaroid[data-src]");
    if (!p) return;
    $("img", lb).src = p.dataset.src; $("p", lb).textContent = p.dataset.cap || "";
    lb.classList.add("on");
  });
  addEventListener("keydown", e => e.key === "Escape" && lb.classList.remove("on"));
}
function polaroid(src, cap = "", emoji = "📷") {
  const r = rnd(-4, 4).toFixed(1);
  return `<div class="polaroid" style="--r:${r}deg" data-src="${esc(src)}" data-cap="${esc(cap)}">
    <img src="${esc(src)}" alt="${esc(cap)}" loading="lazy" onerror="this.outerHTML='<div class=ph>${emoji}</div>'">
    <div class="cap">${esc(cap)}</div></div>`;
}

/* ============ pages ============ */
const pages = {};

pages.index = () => {
  const invites = [...(window.INVITES || [])].sort((a, b) => new Date(a.start) - new Date(b.start));
  const now = Date.now();
  const upcoming = invites.filter(i => new Date(i.start).getTime() + (i.durationMinutes || 180) * 6e4 > now);
  const past = invites.filter(i => !upcoming.includes(i));
  const next = upcoming[0];
  const card = i => `<a class="card date-card" href="invite.html?id=${encodeURIComponent(i.id)}">
      <div class="emoji">${i.emoji || "💌"}</div><h3>${esc(i.title)}</h3>
      <p class="muted">${esc(i.tagline || "")}</p><span class="pill">${fmtWhen(i.start)}</span></a>`;
  $("#app").innerHTML = `
    <section class="hero wrap">
      <div class="big-heart">💛</div>
      <h1>${esc(S.me)} & ${esc(S.you)}</h1>
      <p class="hand">${esc(S.motto || "")}</p>
      ${next ? `<p class="muted" style="margin-top:2rem">Next date: <b>${esc(next.title)}</b> in…</p><div class="counter" id="cd"></div>
      <div class="btns"><a class="btn" href="invite.html?id=${encodeURIComponent(next.id)}">Open the invite 💌</a></div>` : ""}
    </section>
    <section class="wrap"><h2 class="center">Upcoming dates</h2>
      ${upcoming.length ? `<div class="grid">${upcoming.map(card).join("")}</div>` : `<p class="center muted">Nothing planned yet… plan one? 👀</p>`}
    </section>
    ${past.length ? `<section class="wrap"><h2 class="center">Dates we've had</h2><div class="grid">${past.reverse().map(card).join("")}</div></section>` : ""}
    <section class="wrap"><div class="grid">
      <a class="card date-card" href="journey.html"><div class="emoji">🗺️</div><h3>Our Journey</h3><p class="muted">Every moment, start to now.</p></a>
      <a class="card date-card" href="gallery.html"><div class="emoji">📸</div><h3>Photos</h3><p class="muted">Screenshots, selfies & blurry favourites.</p></a>
      <a class="card date-card" href="writings.html"><div class="emoji">✍️</div><h3>Writings</h3><p class="muted">Letters & late-night thoughts.</p></a>
      <a class="card date-card" href="play.html"><div class="emoji">🎲</div><h3>Play</h3><p class="muted">Card decks & games for two.</p></a>
    </div></section>`;
  if (next) countdown($("#cd"), next.start);
};

/* ---------- invite ---------- */
pages.invite = () => {
  const list = window.INVITES || [];
  const inv = list.find(i => i.id === params.get("id")) || list[0];
  if (!inv) return ($("#app").innerHTML = `<p class="center">No invite found 🥲</p>`);
  document.title = `${inv.title} 💌`;
  const key = `invite:${inv.id}`;
  const state = store.get(key, {});
  const save = () => store.set(key, state);
  const at = (mins = 0) => new Date(new Date(inv.start).getTime() + mins * 6e4);

  $("#app").innerHTML = `
    <div class="stage ${state.opened ? "hidden" : ""}" id="envStage">
      <div class="envelope-wrap" id="env">
        <p class="hand">psst… a letter for ${esc(S.you)}</p>
        <div class="envelope"><div class="flap"></div><div class="pocket"></div><div class="peek">${inv.emoji || "💌"}</div><div class="seal">💛</div></div>
        <p class="muted">tap to open</p>
      </div>
    </div>
    <section class="narrow ${state.opened ? "" : "hidden"}" id="letterSec">
      <article class="letter">
        <p class="hand" style="font-size:2rem;margin:0 0 1rem">${inv.emoji || ""} ${esc(inv.title)}</p>
        <div class="body">${paras(inv.letter || "")}</div>
        <div class="sign">— yours, ${esc(S.me)}</div>
      </article>
      <div class="question" id="question"></div>
    </section>
    <div class="wrap details ${state.yes ? "" : "hidden"}" id="details" style="padding-bottom:3rem"></div>`;

  $("#env").onclick = () => {
    $(".envelope").classList.add("open");
    setTimeout(() => {
      state.opened = true; save();
      $("#envStage").classList.add("hidden");
      $("#letterSec").classList.remove("hidden");
      scrollTo(0, 0);
    }, 1300);
  };

  const renderQuestion = () => {
    const q = $("#question");
    if (state.yes) { q.innerHTML = `<div class="yes-stamp">IT'S A DATE</div><p class="hand">see you there 💛 details below</p>`; return; }
    q.innerHTML = `<h2>${esc(inv.question || "Will you be my date?")}</h2>
      <div class="btns"><button class="btn" id="yesBtn">Yes! 💛</button><button class="btn ghost" id="noBtn">No</button></div>`;
    const pleas = ["are you sure? 🥺", "think again!", "there's pie 🥧", "pretty please?", "the button is shy", "nope, try yes", "🥹🥹🥹"];
    let n = 0, scale = 1;
    const dodge = e => {
      e.preventDefault();
      const b = $("#noBtn");
      b.textContent = pleas[n++ % pleas.length];
      b.style.transform = `translate(${rnd(-140, 140)}px, ${rnd(-90, 60)}px)`;
      scale = Math.min(scale + .15, 2.2);
      $("#yesBtn").style.transform = `scale(${scale})`;
    };
    $("#noBtn").addEventListener("mouseenter", dodge);
    $("#noBtn").addEventListener("click", dodge);
    $("#yesBtn").onclick = () => {
      state.yes = true; save(); confetti(); renderQuestion(); renderDetails();
      $("#details").classList.remove("hidden");
      setTimeout(() => $("#details").scrollIntoView({ behavior: "smooth" }), 600);
    };
  };

  const renderDetails = () => {
    const watch = inv.watch || [];
    $("#details").innerHTML = `
      <div class="card center fade-in">
        <h3 style="justify-content:center">📅 When</h3>
        <div class="when-big">${fmtWhen(inv.start)}</div>
        <p class="muted">(already converted to your time zone)</p>
        <div class="counter" id="inviteCd"></div>
        <div class="btns">
          <button class="btn" id="icsBtn">Add to calendar 🗓️</button>
          <a class="btn ghost" id="gcal" target="_blank" rel="noopener">Google Calendar</a>
        </div>
        ${inv.dressCode ? `<p style="margin-top:1.2rem"><span class="pill">Dress code</span> ${esc(inv.dressCode)}</p>` : ""}
      </div>

      ${inv.food ? `<div class="card fade-in"><h3>🍽️ ${esc(inv.food.title || "The food deal")}</h3>
        ${inv.food.intro ? `<p>${esc(inv.food.intro)}</p>` : ""}
        <ul class="food-rules">${(inv.food.rules || []).map(r => `<li>${esc(r)}</li>`).join("")}</ul>
      </div>` : ""}

      ${watch.length ? `<div class="card fade-in"><h3>🍿 ${watch.length > 1 ? "Pick what we watch" : "Now showing"}</h3>
        <div class="watch-options">${watch.map((w, i) => `<button class="watch-opt ${state.pick === i || watch.length === 1 ? "picked" : ""}" data-i="${i}">
          <div class="e">${w.emoji || "🎬"}</div><b>${esc(w.title)}</b><small class="muted">${esc(w.note || "")}</small></button>`).join("")}</div></div>` : ""}

      ${inv.schedule?.length ? `<div class="card fade-in"><h3>🗒️ The plan</h3><p class="muted">(in your time zone)</p>
        <ul class="timeline-mini">${inv.schedule.map(s => `<li><span class="t">${fmtTime(at(s.at))}</span><span>${s.emoji || ""} ${esc(s.what)}</span></li>`).join("")}</ul></div>` : ""}

      <div class="card center fade-in"><h3 style="justify-content:center">💬 After dinner: Couple Questions</h3>
        <p class="muted">We each get 5 random questions on our own screens, then take turns asking.</p>
        <div class="btns"><a class="btn sage" href="play.html#couple">Open the question cards</a></div></div>

      <div class="card center fade-in"><h3 style="justify-content:center">💌 Send your RSVP</h3>
        <p class="muted" id="rsvpText"></p><div class="btns" id="rsvpBtns"></div></div>`;

    countdown($("#inviteCd"), inv.start, "It's date time! 💛");

    // calendar
    const start = new Date(inv.start), end = new Date(start.getTime() + (inv.durationMinutes || 180) * 6e4);
    const ics = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const desc = `${inv.tagline || ""}\nInvite: ${location.href.split("#")[0]}`;
    $("#gcal").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(inv.title)}&dates=${ics(start)}/${ics(end)}&details=${encodeURIComponent(desc)}`;
    $("#icsBtn").onclick = () => {
      const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//us//edate//EN", "BEGIN:VEVENT", `UID:${inv.id}@us`, `DTSTAMP:${ics(new Date())}`,
        `DTSTART:${ics(start)}`, `DTEND:${ics(end)}`, `SUMMARY:${inv.title}`, `DESCRIPTION:${desc.replace(/\n/g, "\\n")}`,
        "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY", "DESCRIPTION:E-date soon!", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([body], { type: "text/calendar" })), download: `${inv.id}.ics` });
      a.click();
    };

    // watch picker
    $$(".watch-opt").forEach(b => b.onclick = () => {
      if (watch.length < 2) return;
      state.pick = +b.dataset.i; save();
      $$(".watch-opt").forEach(x => x.classList.toggle("picked", x === b));
      renderRsvp();
    });

    renderRsvp();
  };

  const renderRsvp = () => {
    const watch = inv.watch || [];
    const pick = watch.length > 1 ? watch[state.pick] : watch[0];
    const msg = `YES! 💛 I'll be your date for "${inv.title}" on ${fmtWhen(inv.start)}.${pick ? ` Movie pick: ${pick.title} ${pick.emoji || ""}.` : ""}  Can't wait 🥰`;
    $("#rsvpText").textContent = `"${msg}"` + (watch.length > 1 && !pick ? "  👆 pick a movie first!" : "");
    $("#rsvpBtns").innerHTML = (S.rsvpPhone ? `<a class="btn" href="sms:${esc(S.rsvpPhone)}?&body=${encodeURIComponent(msg)}">Text my RSVP 💬</a>` : "")
      + `<button class="btn ghost" id="copyRsvp">Copy reply</button>`;
    $("#copyRsvp").onclick = () => navigator.clipboard.writeText(msg).then(() => toast("Copied! Paste it to me 💛"));
  };

  renderQuestion();
  if (state.yes) renderDetails();
};

/* ---------- journey ---------- */
pages.journey = () => {
  const items = [...(window.JOURNEY || [])].sort((a, b) => parseDay(a.date) - parseDay(b.date));
  $("#app").innerHTML = `
    <section class="hero narrow"><h1>Our Journey</h1><p class="hand">from "hi" to here</p></section>
    ${items.length ? "" : `<div class="card center narrow"><div style="font-size:3rem">🌱</div><h3>Our story starts here</h3>
      <p class="muted">Moments get added in <b>data/journey.js</b>.</p></div>`}
    <section class="wrap ${items.length ? "timeline" : ""}">${items.map(m => `
      <div class="moment fade-in">
        <div class="dot">${m.emoji || "💛"}</div>
        <div class="card">
          <div class="date">${fmtDay(m.date)}</div>
          <h3>${esc(m.title)}</h3>
          ${m.place ? `<span class="pill">📍 ${esc(m.place)}</span>` : ""}
          <div style="margin-top:.8rem">${paras(m.text || "")}</div>
          ${m.photos?.length ? `<div class="photos">${m.photos.map(p => polaroid(p, "", m.emoji)).join("")}</div>` : ""}
        </div>
      </div>`).join("")}</section>`;
  lightbox();
};

/* ---------- gallery ---------- */
pages.gallery = () => {
  const photos = (window.JOURNEY || []).flatMap(m => (m.photos || []).map(p => ({ src: p, cap: m.title, emoji: m.emoji, date: m.date })))
    .sort((a, b) => parseDay(b.date) - parseDay(a.date));
  $("#app").innerHTML = `
    <section class="hero narrow"><h1>Photos</h1><p class="hand">proof we're cute</p></section>
    <section class="wrap">${photos.length ? `<div class="gallery">${photos.map(p => polaroid(p.src, p.cap, p.emoji)).join("")}</div>`
      : `<div class="card center narrow"><div style="font-size:3rem">📸</div><h3>No photos yet</h3>
         <p class="muted">Upload pictures to the <b>photos/</b> folder on GitHub, then list them on a moment in <b>data/journey.js</b>.</p></div>`}</section>`;
  lightbox();
};

/* ---------- writings ---------- */
pages.writings = () => {
  const posts = [...(window.WRITINGS || [])].sort((a, b) => parseDay(b.date) - parseDay(a.date));
  $("#app").innerHTML = `
    <section class="hero narrow"><h1>Writings</h1><p class="hand">things we couldn't fit in a text</p></section>
    <section class="narrow">${posts.map((p, i) => `
      <article class="card post fade-in ${i === 0 ? "open" : ""}">
        <header><div><h3>${p.mood || "💌"} ${esc(p.title)}</h3>
          <div class="meta">by <b>${esc(who(p.author))}</b> · ${fmtDay(p.date)}</div></div><span class="toggle">+</span></header>
        <div class="content">${paras(p.body)}</div>
      </article>`).join("")}</section>`;
  $$(".post header").forEach(h => h.onclick = () => h.parentElement.classList.toggle("open"));
};

/* ---------- play ---------- */
pages.play = () => {
  const decks = window.DECKS || [];
  let deck = decks.find(d => d.id === params.get("deck")) || decks[0], order = [], pos = -1;
  $("#app").innerHTML = `
    <section class="hero narrow"><h1>Play</h1><p class="hand">cards, games & tiny arguments</p></section>
    <section class="wrap" id="couple">
      <h2 class="center">💬 Couple Questions</h2>
      <p class="center muted">You each get your own 5 random questions. Take turns asking each other!</p>
      <div class="dots" id="qDots"></div>
      <div class="flip" id="qFlip"><div class="inner"><div class="face front" id="qFront"></div><div class="face back" id="qBack"></div></div></div>
      <div class="btns"><button class="btn" id="qNext"></button><button class="btn ghost" id="qNew">New round 🔀</button></div>
    </section>
    <section class="wrap"><h2 class="center">More card decks</h2>
      <div class="deck-tabs" id="tabs"></div>
      <div class="flip" id="flip"><div class="inner"><div class="face front" id="front"></div><div class="face back" id="back"></div></div></div>
      <div class="btns"><button class="btn" id="draw">Draw a card</button><button class="btn ghost" id="coin">Who answers first? 🪙</button></div>
      <p class="center muted" id="count"></p>
    </section>
    <section class="wrap"><h2 class="center">Games to play together</h2>
      <div class="grid">${(window.GAMES || []).map(g => `<a class="card game-card" href="${esc(g.url)}" target="_blank" rel="noopener">
        <span class="e">${g.emoji}</span><div><b>${esc(g.name)}</b><br><small class="muted">${esc(g.note || "")}</small></div></a>`).join("")}</div>
    </section>`;
  const setDeck = d => {
    deck = d; order = d.cards.map((_, i) => i).sort(() => Math.random() - .5); pos = -1;
    $("#flip").style.setProperty("--deck", d.color);
    $("#flip").classList.remove("flipped");
    $("#front").textContent = `${d.emoji} ${d.name}`;
    $("#count").textContent = `${d.cards.length} cards`;
    $("#tabs").innerHTML = decks.map(x => `<button class="${x === d ? "on" : ""}" data-id="${x.id}">${x.emoji} ${esc(x.name)}</button>`).join("");
    $$("#tabs button").forEach(b => b.onclick = () => setDeck(decks.find(x => x.id === b.dataset.id)));
  };
  const draw = () => {
    const f = $("#flip");
    f.classList.remove("flipped");
    setTimeout(() => {
      pos = (pos + 1) % order.length;
      $("#back").textContent = deck.cards[order[pos]];
      $("#count").textContent = `card ${pos + 1} of ${order.length}`;
      f.classList.add("flipped");
    }, f.classList.contains("flipped") ? 350 : 0);
  };
  $("#draw").onclick = draw; $("#flip").onclick = draw;
  coupleGame();
  $("#coin").onclick = () => toast(`${Math.random() < .5 ? S.me : S.you} goes first! 🪙`);
  if (deck) setDeck(deck);
};

function coupleGame() {
  const CQ = window.COUPLE_QUESTIONS;
  if (!CQ) return $("#couple").remove();
  const all = CQ.categories.flatMap(c => c.cards.map(q => ({ q, c })));
  const n = Math.min(CQ.roundSize || 5, all.length);
  let round = [], pos = -1;
  const pickRound = () => {
    const pool = [...all];
    for (let i = pool.length - 1; i > 0; i--) { // fair shuffle with crypto randomness
      const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    round = pool.slice(0, n); pos = -1;
    $("#qFlip").classList.remove("flipped");
    $("#qFlip").style.setProperty("--deck", "#e07a7a");
    $("#qFront").textContent = "💬 tap to draw";
    paint();
  };
  const paint = () => {
    $("#qDots").innerHTML = round.map((_, i) => `<span class="${i <= pos ? "on" : ""}"></span>`).join("");
    $("#qNext").textContent = pos < 0 ? "First question 💛" : pos < n - 1 ? `Next (${pos + 2} of ${n})` : "Round done! 🎉";
    $("#qNext").disabled = pos >= n - 1;
  };
  const next = () => {
    if (pos >= n - 1) return;
    const f = $("#qFlip");
    const wasFlipped = f.classList.contains("flipped");
    f.classList.remove("flipped");
    setTimeout(() => {
      const { q, c } = round[++pos];
      f.style.setProperty("--deck", c.color);
      $("#qBack").innerHTML = `<div><span class="pill">${c.emoji} ${esc(c.name)}</span><p style="margin:.8rem 0 0">${esc(q)}</p></div>`;
      f.classList.add("flipped");
      paint();
      if (pos === n - 1) setTimeout(() => confetti("💛💬✨"), 700);
    }, wasFlipped ? 350 : 0);
  };
  $("#qNext").onclick = next; $("#qFlip").onclick = next; $("#qNew").onclick = pickRound;
  pickRound();
}

/* ============ boot ============ */
layout();
pages[document.body.dataset.page]?.();
