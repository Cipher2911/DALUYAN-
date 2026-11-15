document.addEventListener('DOMContentLoaded', () => {
  
  /* -------------------------------------------------------------------
     1. MOBILE HAMBURGER MENU & STICKY NAVIGATION STATE
     ------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(forceClose = false) {
    const isCurrentlyOpen = !mobileMenu.classList.contains('hidden');
    const shouldClose = forceClose || isCurrentlyOpen;

    if (shouldClose) {
      mobileMenu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.remove('hidden');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Highlight active navigation link based on scroll position
  const sections = ['about', 'candidates', 'platforms', 'contacts'];
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;
    let currentSection = '';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos && (el.offsetTop + el.offsetHeight) > scrollPos) {
        currentSection = id;
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute('data-nav-link');
      if (target === currentSection) {
        link.classList.add('bg-[#7AC0BA]', 'text-[#000000]', 'shadow-sm');
        link.classList.remove('text-[#FFFFFF]');
      } else {
        link.classList.remove('bg-[#7AC0BA]', 'text-[#000000]', 'shadow-sm');
        link.classList.add('text-[#FFFFFF]');
      }
    });
  }, { passive: true });


  /* -------------------------------------------------------------------
     2. INTERACTIVE "PLEDGE YOUR VOTE" SUPPORTER COUNTER
     ------------------------------------------------------------------- */
  const pledgeBtn = document.getElementById('pledge-btn');
  const pledgeBtnText = document.getElementById('pledge-btn-text');
  const pledgeCountEl = document.getElementById('pledge-count');
  const pledgeProgressBar = document.getElementById('pledge-progress-bar');
  const pledgePercentLabel = document.getElementById('pledge-percent-label');
  const pledgeFeedback = document.getElementById('pledge-feedback');

  let pledgeCount = 1428;
  const pledgeGoal = 2000;
  let hasPledged = false;

  function spawnCelebrationParticles(originEl) {
    if (!originEl) return;
    const rect = originEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const colors = ['#149E92', '#7AC0BA', '#FFFFFF', '#2DD4BF', '#A7F3D0'];

    for (let i = 0; i < 18; i++) {
      const dot = document.createElement('span');
      dot.className = 'pledge-particle rounded-full';
      const size = Math.floor(Math.random() * 6) + 6;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = colors[i % colors.length];
      dot.style.left = `${centerX}px`;
      dot.style.top = `${centerY}px`;

      const angle = (Math.PI * 2 * i) / 18 + (Math.random() * 0.4);
      const velocity = 65 + Math.random() * 75;
      dot.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
      dot.style.setProperty('--ty', `${Math.sin(angle) * velocity - 35}px`);
      dot.style.setProperty('--rot', `${Math.floor(Math.random() * 360)}deg`);

      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 1000);
    }
  }

  function updatePledgeUI() {
    if (pledgeCountEl) pledgeCountEl.textContent = pledgeCount.toLocaleString();
    const pct = Math.min(100, ((pledgeCount / pledgeGoal) * 100)).toFixed(1);
    if (pledgeProgressBar) pledgeProgressBar.style.width = `${pct}%`;
    if (pledgePercentLabel) pledgePercentLabel.textContent = `${Math.round(pct)}% to Election Day Goal`;
  }

  function handleVotePledge(triggerEl = pledgeBtn) {
    if (!hasPledged) {
      hasPledged = true;
      pledgeCount += 1;
      updatePledgeUI();
      spawnCelebrationParticles(triggerEl);

      if (pledgeBtn) {
        pledgeBtn.classList.remove('bg-[#149E92]', 'text-[#FFFFFF]');
        pledgeBtn.classList.add('bg-[#7AC0BA]', 'text-[#000000]');
      }
      if (pledgeBtnText) pledgeBtnText.textContent = 'Vote Pledged! Thank You ✓';
      if (pledgeFeedback) pledgeFeedback.innerHTML = `<span class="text-[#7AC0BA] font-semibold">You’re pledge #${pledgeCount.toLocaleString()}!</span> Share the coalition with a classmate.`;
    } else {
      // Subtle visual pulse if clicked again
      spawnCelebrationParticles(triggerEl);
      if (pledgeFeedback) pledgeFeedback.innerHTML = `<span class="text-[#7AC0BA] font-semibold">Your pledge (#${pledgeCount.toLocaleString()}) is already counted!</span> Ready to volunteer below?`;
    }
  }

  if (pledgeBtn) {
    pledgeBtn.addEventListener('click', () => handleVotePledge(pledgeBtn));
  }

  /* -------------------------------------------------------------------
     3. CANDIDATE PROFILE & CREDENTIALS MODAL
     ------------------------------------------------------------------- */
  const candidateProfiles = {
    gueco: {
      name: 'Dom Gueco',
      tagline: 'Empowering a future of boundless innovation.',
      role: 'Daluyan Coalition 2026',
      tag: 'CATCH2T30 Batch Representative',
      image: 'candie1.jpeg',
      academicInfo: {
        collegeProgram: 'Bachelor of Science in Information Systems (BSIS)',
        highSchool: 'Parañaque Science High School Senior High School'
      },
      organizations: [
        {
          year: 'A.Y. 2025–2026',
          role: 'Associate Editor-in-Chief',
          org: 'The Momentum'
        },
        {
          year: 'A.Y. 2025–2026',
          role: 'Project Head',
          org: 'Literary Talks - ParSci'
        },
        {
          year: 'A.Y. 2024–2025',
          role: 'Opinion Editor',
          org: 'The Momentum'
        },
        {
          year: 'A.Y. 2020–2024',
          role: 'Editor-in-Chief',
          org: 'San Antonio Herald'
        }
      ],
      achievements: [
        { year: 'A.Y. 2025–2026', title: 'With High Honors, Parañaque Science High School' },
        { year: 'A.Y. 2025–2026', title: 'Outstanding Performance in Communication Arts - English' },
        { year: 'A.Y. 2025–2026', title: 'Outstanding Performance in Work Immersion' },
        { year: 'A.Y. 2025–2026', title: '1st Place, Science and Research Impromptu, National Science Quest (NSQ) 2025' },
        { year: 'A.Y. 2025–2026', title: '3rd Place, Ako Ay Pilipino Speech Competition, Inner Wheel Clubs of the Philippines Inc.' },
        { year: 'A.Y. 2025–2026', title: '1st Place, Editorial Writing (English), Division Schools Press Conference (DSPC) 2025' },
        { year: 'A.Y. 2025–2026', title: '1st Place, Editorial Writing (English), School-Based Press Conference 2025' },
        { year: 'A.Y. 2024–2025', title: '1st Place, Overall Best School Newspaper, The Momentum, DSPC 2025' },
        { year: 'A.Y. 2024–2025', title: '1st Place, Overall Best Editorial Page, The Momentum, DSPC 2025' },
        { year: 'A.Y. 2024–2025', title: '2nd Place, Editorial Writing (English), Division Schools Press Conference (DSPC) 2024' },
        { year: 'A.Y. 2024–2025', title: '1st Place, Editorial Writing (English), School-Based Press Conference 2024' },
        { year: 'A.Y. 2023–2024', title: 'Batch Valedictorian & With High Honors, San Antonio National High School Parañaque' },
        { year: 'A.Y. 2023–2024', title: 'Outstanding Performance in Communication Arts & Social Sciences' },
        { year: 'A.Y. 2023–2024', title: '2nd Place, Editorial Writing (English), Division Schools Press Conference (DSPC) 2023' },
        { year: 'A.Y. 2023–2024', title: 'Champion, Population Development Quiz, Parañaque City Festival of Talents' },
        { year: 'A.Y. 2023–2024', title: 'Champion, Oratorical Composition and Presentation, District Festival of Talents' },
        { year: 'A.Y. 2023–2024', title: 'Champion, Spoken Word Poetry, National Children\'s Month - Division Level' },
        { year: 'A.Y. 2023–2024', title: 'Champion in School-Based Science Extemporaneous Speech 2024' }
      ]
    },
    masangkay: {
      name: 'Lhei Masangkay',
      tagline: 'Building digitally empowered communities to ignite your potentials within.',
      role: 'Daluyan Coalition 2026',
      tag: 'CATCH2T30 Batch Legislator',
      image: 'candie2.jpeg',
      academicInfo: {
        collegeProgram: 'Bachelor of Science in Computer Science, Major in Software Technology (BSCS-ST)',
        highSchool: 'Far Eastern University Diliman Senior High School'
      },
      organizations: [
        {
          year: 'A.Y. 2025–2026',
          role: 'Creatives Staff',
          org: 'FEU-D STEM Organization'
        },
        {
          year: 'A.Y. 2025–2026',
          role: 'Member',
          org: 'FEU-D Cheer Team'
        }
      ],
      achievements: [
        { year: 'A.Y. 2025–2026', title: 'Academic Excellence - With Honors' },
        { year: 'A.Y. 2025–2026', title: 'Science Expo: Best Exhibit' },
        { year: 'A.Y. 2025–2026', title: 'Research Congress: Best Poster' },
        { year: 'A.Y. 2025–2026', title: 'Deportment Awardee' }
      ]
    }
  };

  const modal = document.getElementById('statement-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPanel = document.getElementById('modal-panel');
  const modalCandidateImg = document.getElementById('modal-candidate-img');
  const modalCandidateHeading = document.getElementById('modal-candidate-heading');
  const modalCandidateRole = document.getElementById('modal-candidate-role');
  const modalCandidateTag = document.getElementById('modal-candidate-tag');
  const modalAcademicInfo = document.getElementById('modal-academic-info');
  const modalOrgList = document.getElementById('modal-org-list');
  const modalAchievementsList = document.getElementById('modal-achievements-list');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalPlatformsLink = document.getElementById('modal-platforms-link');

  function openCandidateModal(candidateKey) {
    const data = candidateProfiles[candidateKey];
    if (!data || !modal) return;

    const modalCandidateTagline = document.getElementById('modal-candidate-tagline');

    modalCandidateImg.src = data.image;
    modalCandidateImg.alt = data.name;

    if (candidateKey === 'gueco') {
      modalCandidateImg.className = 'w-full h-full object-cover object-[center_120%] scale-[1.30] origin-center';
    } else {
      modalCandidateImg.className = 'w-full h-full object-cover object-[center_12%] scale-[1.30] origin-center';
    }

    modalCandidateHeading.textContent = data.name;
    if (modalCandidateTagline) modalCandidateTagline.textContent = data.tagline;
    modalCandidateRole.textContent = data.role;
    modalCandidateTag.textContent = data.tag;

    // 1. Render Academic Information
    modalAcademicInfo.innerHTML = `
      <div class="bg-[#0B0F0F] border border-[#149E92]/35 rounded-xl p-3">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#7AC0BA] mb-1">College Program</span>
        <span class="text-[#FFFFFF] font-semibold leading-snug block">${data.academicInfo.collegeProgram}</span>
      </div>
      <div class="bg-[#0B0F0F] border border-[#149E92]/35 rounded-xl p-3">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#7AC0BA] mb-1">High School</span>
        <span class="text-[#FFFFFF] font-semibold leading-snug block">${data.academicInfo.highSchool}</span>
      </div>
    `;

    // 2. Render Organizational Experiences
    modalOrgList.innerHTML = data.organizations
      .map(item => `
        <li class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-[#0B0F0F] border border-[#149E92]/30 rounded-xl px-3.5 py-2.5">
          <div>
            <span class="font-bold text-[#FFFFFF]">${item.role}</span>
            <span class="text-[#7AC0BA] font-semibold"> • ${item.org}</span>
          </div>
          <span class="text-xs font-bold text-[#7AC0BA]/90 shrink-0">${item.year}</span>
        </li>
      `)
      .join('');

    // 3. Render Academic Achievements & Recognitions
    modalAchievementsList.innerHTML = data.achievements
      .map(item => `
        <li class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-[#149E92] text-[#FFFFFF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
          <div class="flex-1">
            <span class="text-[#FFFFFF] font-medium">${item.title}</span>
            <span class="ml-1.5 text-xs font-semibold text-[#7AC0BA]">(${item.year})</span>
          </div>
        </li>
      `)
      .join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      modalBackdrop.classList.remove('opacity-0');
      modalPanel.classList.remove('opacity-0', 'scale-95');
      modalPanel.classList.add('opacity-100', 'scale-100');
    });
  }

  function closeCandidateModal() {
    if (!modal) return;
    modalBackdrop.classList.add('opacity-0');
    modalPanel.classList.remove('opacity-100', 'scale-100');
    modalPanel.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }, 220);
  }

  document.querySelectorAll('.open-statement-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openCandidateModal(btn.getAttribute('data-candidate'));
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCandidateModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeCandidateModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCandidateModal);
  if (modalPlatformsLink) modalPlatformsLink.addEventListener('click', closeCandidateModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeCandidateModal();
    }
  });

  /* -------------------------------------------------------------------
     4. INTERACTIVE PLATFORMS FILTERING
     ------------------------------------------------------------------- */
  const platformPolicies = [
    // GUECO PLATFORMS
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 01',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'IN SYNC',
      details:
        'IN SYNC is a dedicated student assistance and communication platform that connects CATCH2T30 directly with their batch government. Through an accessible messaging channel, students can raise academic, administrative, organizational, and student-life concerns, seek verified information, and receive guidance. A designated team will monitor inquiries, coordinate with appropriate university offices when necessary, and provide follow-ups to ensure that student concerns are acknowledged, tracked, and properly addressed.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 02',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'THE D-BUG',
      details:
        'THE D-BUG is a student-driven proposal platform designed to turn everyday concerns into practical solutions. Through a QR-accessible form, CATCH2T30 students can identify recurring problems and suggest improvements that directly benefit the batch. Submitted proposals will undergo evaluation based on impact, feasibility, and available resources, with selected ideas considered for pilot implementation. Regular progress updates will allow students to track how their suggestions develop into concrete initiatives.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 03',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'RADAR:126',
      details:
        'RADAR:126 is a centralized information network dedicated to keeping CATCH2T30 updated on academic announcements, important deadlines, scholarships, competitions, and student opportunities. It features three information channels: RADAR NOW for urgent announcements, RADAR DROP for opportunities and activities, and RADAR ROUTE for essential step-by-step guides. Through coordinated social media updates, block representatives, and weekly roundups, the platform ensures that verified and relevant information reaches more students.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 04',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'ONE LAST BYTE',
      details:
        'ONE LAST BYTE is a centralized academic resource hub designed to make studying more accessible, organized, and convenient for CCS students. Through a shared Google Drive repository, students can access reviewers, lecture summaries, practice exercises, video tutorials, recommended applications, and useful academic advice. With contributions from students and upperclassmen, the platform will provide organized learning materials and dedicated examination resources for midterms and finals, helping CATCH2T30 prepare with greater confidence.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 05',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'BEYOND THE BINARY',
      details:
        'BEYOND THE BINARY is a civic technology initiative that empowers CCS students to use their technological knowledge beyond the classroom. By developing accessible digital resources and practical community-oriented solutions, the platform addresses pressing concerns such as misinformation, online safety, digital exclusion, and technological literacy. Through student-led projects and potential partnerships with community organizations, it aims to transform technical skills into meaningful contributions to society, with one feasible project targeted each academic term.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 06',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'TECH A SEC',
      details:
        'TECH A SEC is a student-led podcast and digital discussion platform that brings technology, current affairs, and industry developments closer to CATCH2T30. Through monthly episodes, students can explore artificial intelligence, cybersecurity, emerging innovations, digital governance, and their wider societal implications. Featuring technology updates, critical discussions, and conversations with students and industry professionals, the platform encourages informed perspectives, meaningful dialogue, and greater awareness of the rapidly evolving computing world.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 07',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'ON THE DOT',
      details:
        'ON THE DOT is a student welfare and borrowing service designed to provide convenient access to everyday academic essentials. Students can borrow calculators, power banks, chargers, umbrellas, and other reusable necessities without having to purchase them. Through an organized digital reservation system, CATCH2T30 can check item availability, reserve equipment, request printing services, and arrange classroom delivery for an additional fee. The initiative aims to reduce unnecessary expenses and make essential resources more accessible.'
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 08',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'LIFE 2.0',
      details:
        'LIFE 2.0 is a project continuation initiative that gives student-developed technologies a purpose beyond academic requirements. Through a centralized repository of applications, websites, databases, and information systems, CCS students can explore existing projects and apply to further develop them with authorization from their original creators. By encouraging project adoption, continuous improvement, and collaboration across batches, the platform ensures that promising ideas are not abandoned after submission but given opportunities to grow into practical solutions.'
    },

    // MASANGKAY PLATFORMS
    {
      category: 'masangkay',
      categoryLabel: 'MASANGKAY • Legislative Bill 01',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'Ready, Set, Code',
      goal: 'Mandatory release of preparatory learning modules to bridge the knowledge gap between beginners and experienced students.',
      details: 'Establishes an act providing the technical readiness framework to ensure early academic access for the students of the College of Computer Studies. This bill requires the mandatory release of learning modules in preparation for upcoming courseworks to bridge the knowledge gap between beginners and experienced students.'
    },
    {
      category: 'masangkay',
      categoryLabel: 'MASANGKAY • Legislative Bill 02',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'Eye Care for You',
      goal: 'Free eye examinations for college scholars to check prescriptions, with a policy framework for future service expansion.',
      details: 'Establishes a health bill that provides for an optical care program for students of the College of Computer Studies who have been exposed to heavy screen time. This bill guarantees free eye examinations for college scholars to check prescriptions. It also outlines a policy framework for expansion of services once additional funding is available.'
    },
    {
      category: 'masangkay',
      categoryLabel: 'MASANGKAY • Legislative Bill 03',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'CCS BOOST!',
      goal: 'Application-based tool subscription slots allowing selected students to choose from an approved list of interactive platforms.',
      details: 'Establishes a digital resource grant providing a limited number of slots for tool subscriptions for the College of Computer Studies. The students are chosen through their applications and are given the choice to decide which subscription they prefer from an approved list of interactive platforms. This bill mandates access to premium features to support the learning of students, and maximizes the knowledge they can acquire.'
    },
    {
      category: 'masangkay',
      categoryLabel: 'MASANGKAY • Legislative Bill 04',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'Shadow Tech',
      goal: 'Pair frosh with CCS alumni mentors based on shared schedules and specialties in preparation for formal internships.',
      details: 'Establishes a policy act implementing a systematic program that allows frosh to pair with an alumnus from the College of Computer studies Participating alumni share their schedules and specialties through a channel, allowing frosh to select their mentor. This bill aims to let students experience real-world tech practices and shadow their mentors in preparation for future formal internships.'
    },
    {
      category: 'masangkay',
      categoryLabel: 'MASANGKAY • Legislative Bill 05',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'Campus Assistance and Relief in Emergencies (CARE)',
      goal: 'Direct third-party payments for urgent medical bills, stolen equipment, natural disasters, and unsafe living conditions.',
      details: 'Establishes a responsive system that provides funds to students experiencing emergency financial situations. This act applies to urgent medical bills, stolen equipment, unfortunate situations due to natural disasters, and safety with regards to unsafe living conditions. In order to prevent fraud, all funds shall be paid directly to the third-party service provider on behalf of the student (excluding specific personal issues with proof provided).'
    }
  ];

  const platformGrid = document.getElementById('platform-cards-grid');
  const platformTabs = document.querySelectorAll('.platform-tab');

  function renderPlatformCards(selectedCategory = 'gueco') {
    const filtered = platformPolicies.filter(item => item.category === selectedCategory);

    const guecoDocumentIcon = `
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2.5h8.5L19.5 7.5V20a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 20V4A1.5 1.5 0 0 1 6 2.5z" />
        <path d="M14.5 2.5V6.5a1 1 0 0 0 1 1h4" />
        <line x1="8" y1="6.5" x2="11.5" y2="6.5" />
        <line x1="8" y1="9.5" x2="16" y2="9.5" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="14.5" x2="16" y2="14.5" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="19.5" x2="16" y2="19.5" />
      </svg>
    `;

    const masangkayScrollIcon = `
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.5 5H2.5a1.5 1.5 0 0 1 0-3h12A2.5 2.5 0 0 1 17 4.5v1" />
        <path d="M4.5 2c1 0 1.5 1.2 1.5 3v14.5A2.5 2.5 0 0 0 8.5 22h11a2 2 0 0 0 2-2v-1H9v1a2 2 0 0 1-2 2" />
        <path d="M17.5 11.5V19" />
        <line x1="8.5" y1="6.5" x2="12" y2="6.5" />
        <line x1="8.5" y1="9" x2="14.5" y2="9" />
        <line x1="8.5" y1="11.5" x2="13.5" y2="11.5" />
        <line x1="8.5" y1="14" x2="12.5" y2="14" />
        <line x1="13.5" y1="17" x2="15.5" y2="17" />
        <path d="M12.5 15.5l2-3c1.8-2.8 4.6-4.8 7.5-5.5-.6 3.1-2.5 5.8-5.3 7.3l-2.7 1.2" />
        <path d="M14.3 13.7l4.7-4.2" />
      </svg>
    `;

    platformGrid.classList.add('items-start');

    platformGrid.innerHTML = filtered.map((policy, index) => `
      <article class="platform-card bg-[#0B0F0F] hover:bg-[#111717] rounded-3xl border border-[#149E92]/45 hover:border-[#7AC0BA] shadow-civic hover:shadow-civic-lg transition-all duration-300 overflow-hidden">
        
        <!-- Clickable Title Header -->
        <button
          type="button"
          aria-expanded="false"
          aria-controls="policy-details-${index}"
          class="platform-toggle-btn w-full text-left p-7 sm:p-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7AC0BA]"
        >
          <div>
            <div class="mb-3">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${policy.badgeColor}">
                ${policy.categoryLabel}
              </span>
            </div>
            <h3 class="font-ttlakes text-xl sm:text-2xl font-extrabold tracking-wide text-[#FFFFFF]">
              ${policy.title}
            </h3>
          </div>

          <!-- Chevron Toggle Indicator -->
          <div class="w-10 h-10 rounded-xl bg-[#111717] border border-[#149E92]/40 flex items-center justify-center text-[#7AC0BA] shrink-0 transition-transform duration-300 toggle-chevron">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </button>

        <!-- Collapsible Full Details (Hidden Initially) -->
        <div id="policy-details-${index}" class="platform-details hidden px-7 pb-7 sm:px-8 sm:pb-8 pt-0">
          <div class="bg-[#111717] border border-[#7AC0BA]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-[#149E92]/25 text-[#7AC0BA] flex items-center justify-center shrink-0 mt-0.5">
              ${policy.category === 'gueco' ? guecoDocumentIcon : masangkayScrollIcon}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[#D4E4E2] text-sm sm:text-base leading-relaxed">
                ${policy.details}
              </p>
            </div>
          </div>
        </div>

      </article>
    `).join('');

    // Attach click listeners to toggle full details on each card
    const toggleButtons = platformGrid.querySelectorAll('.platform-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.platform-card');
        const detailsPanel = card.querySelector('.platform-details');
        const chevron = btn.querySelector('.toggle-chevron');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', String(!isExpanded));
        detailsPanel.classList.toggle('hidden');

        if (!isExpanded) {
          chevron.classList.add('rotate-180', 'bg-[#149E92]', 'text-[#FFFFFF]');
          card.classList.add('border-[#7AC0BA]', 'bg-[#111717]');
        } else {
          chevron.classList.remove('rotate-180', 'bg-[#149E92]', 'text-[#FFFFFF]');
          card.classList.remove('border-[#7AC0BA]', 'bg-[#111717]');
        }
      });
    });
  }

  const activeTabClasses = ['bg-[#149E92]', 'text-[#FFFFFF]', 'border-[#7AC0BA]', 'shadow-md'];
  const inactiveTabClasses = [
    'bg-[#0B0F0F]',
    'text-[#D4E4E2]',
    'border-[#149E92]/45',
    'hover:bg-[#111717]',
    'hover:text-[#7AC0BA]',
    'hover:border-[#7AC0BA]/60'
  ];

  platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      platformTabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove(...activeTabClasses);
        t.classList.add(...inactiveTabClasses);
      });

      tab.setAttribute('aria-selected', 'true');
      tab.classList.remove(...inactiveTabClasses);
      tab.classList.add(...activeTabClasses);

      renderPlatformCards(category);
    });
  });

  // Initial render defaults to GUECO
  renderPlatformCards('gueco');
  /* -------------------------------------------------------------------
     5. CONTACT & VOLUNTEER FORM VALIDATION + INSTANT CONFIRMATION
     ------------------------------------------------------------------- */
  const contactForm = document.getElementById('campaign-contact-form');
  const fullNameInput = document.getElementById('full-name');
  const campusEmailInput = document.getElementById('campus-email');
  const gradYearInput = document.getElementById('grad-year');
  const messageInput = document.getElementById('campaign-message');

  const errorFullName = document.getElementById('error-full-name');
  const errorCampusEmail = document.getElementById('error-campus-email');
  const errorGradYear = document.getElementById('error-grad-year');
  const errorMessage = document.getElementById('error-message');

  const successBanner = document.getElementById('form-success-banner');
  const submittedNameDisplay = document.getElementById('submitted-name-display');
  const submittedSummaryDisplay = document.getElementById('submitted-summary-display');
  const resetFormBtn = document.getElementById('reset-form-btn');

  function setFieldError(inputEl, errorEl, hasError) {
    if (hasError) {
      inputEl.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
      inputEl.classList.remove('border-[#149E92]/50');
      errorEl.classList.remove('hidden');
    } else {
      inputEl.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
      inputEl.classList.add('border-[#149E92]/50');
      errorEl.classList.add('hidden');
    }
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = fullNameInput.value.trim();
    const emailVal = campusEmailInput.value.trim();
    const gradVal = gradYearInput.value.trim();
    const msgVal = messageInput.value.trim();

    const isNameValid = nameVal.length >= 2;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    const isGradValid = gradVal !== '';
    const isMsgValid = msgVal.length >= 10;

    setFieldError(fullNameInput, errorFullName, !isNameValid);
    setFieldError(campusEmailInput, errorCampusEmail, !isEmailValid);
    setFieldError(gradYearInput, errorGradYear, !isGradValid);
    setFieldError(messageInput, errorMessage, !isMsgValid);

    if (!isNameValid || !isEmailValid || !isGradValid || !isMsgValid) {
      return;
    }

    // Gather checked interest boxes
    const checkedInterests = Array.from(
      contactForm.querySelectorAll('input[name="interests"]:checked')
    ).map(cb => cb.value);

    const interestText = checkedInterests.length > 0
      ? ` regarding ${checkedInterests.join(', ')}`
      : '';

    submittedNameDisplay.textContent = nameVal;
    submittedSummaryDisplay.textContent = `We’ve logged your submission (${gradVal})${interestText} and sent a confirmation receipt to ${emailVal}.`;

    contactForm.classList.add('hidden');
    successBanner.classList.remove('hidden');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  resetFormBtn.addEventListener('click', () => {
    contactForm.reset();
    successBanner.classList.add('hidden');
    contactForm.classList.remove('hidden');
  });


  /* -------------------------------------------------------------------
     6. COPY CAMPAIGN EMAIL UTILITY (IFRAME-SAFE CLIPBOARD FALLBACK)
     ------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const campaignEmailText = document.getElementById('campaign-email-text');

  copyEmailBtn.addEventListener('click', () => {
    const email = campaignEmailText.textContent.trim();
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      copyEmailBtn.textContent = 'Copied ✓';
      copyEmailBtn.classList.add('bg-[#7AC0BA]', 'text-[#000000]', 'border-[#7AC0BA]');
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
        copyEmailBtn.classList.remove('bg-[#7AC0BA]', 'text-[#000000]', 'border-[#7AC0BA]');
      }, 2000);
    } catch (err) {
      copyEmailBtn.textContent = 'hello@elevatecoalition.edu';
    }
    document.body.removeChild(tempInput);
  });

});