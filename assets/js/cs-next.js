const caseStudies = [
  {
    href: 'coastcast.html',
    img: 'images/CoastCastPortImage.png',
    alt: 'CoastCast',
    title: 'CoastCast',
    desc: 'Live weather from dunes to shoreline across Michigan.',
  },
  {
    href: 'quickstudy.html',
    img: 'images/PortQuickStudyIndexPic.png',
    alt: 'QuickStudy',
    title: 'QuickStudy',
    desc: 'Turn scans and PDFs into a study-ready flashcard deck using on-device AI.',
  },
  {
    href: 'take-flight.html',
    img: 'images/coverArt.png',
    alt: 'Take Flight',
    title: 'Take Flight',
    desc: 'A Belle Isle-inspired 5-in-1 survival game built in 6 weeks at the Apple Developer Academy.',
  },
  {
    href: 'commonsight.html',
    img: 'images/CommonSightDash1.png',
    alt: 'CommonSight',
    title: 'CommonSight',
    desc: 'AI-assisted civic reporting and story cards built to help communities document issues.',
  },
];

// The two always-featured studies (first two in the list above)
const featured = caseStudies.slice(0, 2);

(function () {
  const grid = document.getElementById('cs-next-grid');
  if (!grid) return;

  const current = window.location.pathname.split('/').pop();

  // Start with featured, drop current page if it appears
  let picks = featured.filter(s => s.href !== current);

  if (picks.length < 2) {
    // Current page is one of the featured — pick a random non-featured, non-current study
    const pool = caseStudies.filter(s => s.href !== current && !featured.some(f => f.href === s.href));
    const random = pool[Math.floor(Math.random() * pool.length)];
    if (random) picks.push(random);
  }

  grid.innerHTML = picks.map(s => `
    <a class="cs-next-card" href="${s.href}">
      <img src="${s.img}" alt="${s.alt}" />
      <div class="cs-next-copy">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
      <span class="cs-next-arrow">&rarr;</span>
    </a>
  `).join('');
})();
