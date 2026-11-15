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
     3. CANDIDATE PROFILE & LEADERSHIP STATEMENT MODAL
     ------------------------------------------------------------------- */
  const candidateStatements = {
    gueco: {
      name: 'Dom Gueco',
      role: 'Daluyan Coalition 2026 • Representative',
      tag: 'Batch Representative',
      image: 'candie1.jpeg',
      paragraphs: [
        'As your CATCH2T30 Representative under Daluyan Coalition, my goal is to ensure that no ID126 CCS student is left navigating college life alone—bridging the gap between student concerns, verified information, and concrete action.',
        'Through structured communication channels, centralized academic resources, and student-led innovation initiatives, we aim to build a batch community that is responsive, transparent, and genuinely accessible to everyone.'
      ],
      priorities: [
        'Direct & accountable student assistance through IN SYNC and RADAR 126.',
        'Centralized academic reviewers, equipment borrowing, and project continuity via ONE LAST BYTE, ON THE DOT, and LIFE 2.0.',
        'Socially responsible tech advocacy through THE D-BUG, BEYOND THE BINARY, and TECH A SEC.'
      ]
    },
    masangkay: {
      name: 'Lhei Masangkay',
      role: 'Daluyan Coalition 2026 • Representative',
      tag: 'Legislative Agenda Lead',
      image: 'candie2.jpeg',
      paragraphs: [
        'As your CATCH2T30 Representative, I am committed to turning everyday CCS student needs into clear, enforceable legislative policies that protect student welfare and expand equal academic opportunities.',
        'From preparatory coding modules and screen-time eye care to alumni mentorship and emergency student relief, every bill in our Legislative Agenda is designed to deliver practical support across our batch.'
      ],
      priorities: [
        'Academic readiness and digital access through Ready, Set, Code and CCS BOOST!.',
        'Student health and emergency protection via Eye Care for You and CARE.',
        'Early career exposure and guidance through Shadow Tech alumni mentorship.'
      ]
    }
  };

  const modal = document.getElementById('statement-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPanel = document.getElementById('modal-panel');
  const modalCandidateImg = document.getElementById('modal-candidate-img');
  const modalCandidateName = document.getElementById('modal-candidate-name');
  const modalCandidateHeading = document.getElementById('modal-candidate-heading');
  const modalCandidateRole = document.getElementById('modal-candidate-role');
  const modalCandidateTag = document.getElementById('modal-candidate-tag');
  const modalStatementBody = document.getElementById('modal-statement-body');
  const modalPrioritiesList = document.getElementById('modal-priorities-list');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const modalPlatformsLink = document.getElementById('modal-platforms-link');

  function openCandidateModal(candidateKey) {
    const data = candidateStatements[candidateKey];
    if (!data || !modal) return;

    modalCandidateImg.src = data.image;
    modalCandidateImg.alt = data.name;
    modalCandidateHeading.textContent = data.name;
    modalCandidateRole.textContent = data.role;
    modalCandidateTag.textContent = data.tag;

    modalStatementBody.innerHTML = data.paragraphs
      .map(p => `<p>${p}</p>`)
      .join('');

    modalPrioritiesList.innerHTML = data.priorities
      .map(item => `
        <li class="flex items-start gap-2.5">
          <span class="w-5 h-5 rounded-full bg-[#149E92] text-[#FFFFFF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
          <span>${item}</span>
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
      objective:
        'Establish a direct, accessible, and accountable communication system where CCS ID126 students can raise concerns, receive verified information, and get updates on matters that require representation—ensuring concerns are properly acknowledged, monitored, and referred rather than overlooked or left unresolved.',
      implementation: [
        'Establish a dedicated private assistance channel through Telegram and an approved alternative contact method, publishing service hours, submission guidelines, response targets, and institutional referral contacts.',
        'Assign rotating committee members to monitor incoming inquiries during published service hours, with at least one designated officer and a backup checking and acknowledging messages.',
        'Categorize concerns into (1) academic, (2) administrative, (3) organizational, and (4) student-life matters, assigning each to a responsible officer in a restricted-access tracker.',
        'Address general inquiries and refer concerns requiring institutional action to appropriate university offices or authorized representatives, coordinating follow-ups when necessary.'
      ],
      resources: [
        'Telegram private assistance account & approved alternative contact channel',
        'Google Sheets restricted case tracker',
        'Assigned case coordinator and rotating backup officers',
        'Verified university office and referral directory',
        'Standardized response, escalation, privacy, data retention, and sensitive-case guidelines',
        'Published service hours and response targets'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 02',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'THE D-BUG',
      objective:
        'Establish a structured and transparent avenue for CCS ID126 students to identify recurring academic, organizational, and student-life concerns and propose practical solutions—transforming suggestions into evaluated, actionable improvements through feasibility screening, consultation, and small-scale pilot implementation.',
      implementation: [
        'Launch a QR-accessible Google Form allowing students to submit a specific problem, proposed solution, and intended beneficiaries, kept open monthly with a published cutoff per review cycle.',
        'Post end-of-month updates showing approved proposal summaries and progress (Under Review, For Consultation, Approved for Pilot, In Progress, or Completed/Deferred) with identifying details removed unless authorized.',
        'Assign an evaluation board to consolidate duplicates and assess proposals based on (1) student impact, (2) practicality, (3) manpower, (4) cost, (5) existing initiatives, and (6) required approvals.',
        'Shortlist up to three feasible proposals monthly, assign a project head, and select one for pilot implementation when resources, demand, and approvals permit (targeting at least one completed pilot per academic term).'
      ],
      resources: [
        'Google Forms, Google Sheets, QR codes, and existing DLSU Workspace student accounts',
        'Designated project coordinator and student volunteers',
        'Standardized evaluation rubric & Canva for monthly progress updates',
        'Coordination with relevant university offices and recognized organizations'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 03',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'RADAR 126',
      objective:
        'Establish a centralized and coordinated information dissemination network ensuring CCS ID126 students receive timely, accurate, and relevant updates on academic announcements, scholarships, organizational opportunities, university events, student activities, and important deadlines across multiple platforms and block representatives.',
      implementation: [
        'Create a coordinated information system across (1) Facebook, (2) Instagram, and (3) Telegram using official CATCH2T30 pages (subject to approval), adapting formats while keeping information consistent.',
        'Assign a communications committee to regularly monitor official DLSU announcements, university offices, recognized student organizations, and verified opportunity providers.',
        'Organize announcements into three channels: RADAR NOW (urgent academic advisories, admin announcements, approaching deadlines), RADAR DROP (scholarships, competitions, applications, CCS events), and RADAR ROUTE (concise what/where/when/how-to guides and official links).',
        'Develop a standardized publication schedule featuring a weekly roundup of deadlines and opportunities alongside timely alerts for urgent matters.'
      ],
      resources: [
        'Facebook and Instagram accounts, Telegram announcement channel, and existing block group chats',
        'Designated course representatives and contact directory',
        'Communications committee members & Google Sheets editorial calendar/tracker',
        'Official DLSU, CCS, and recognized organization information sources',
        'Canva, standardized announcement templates, and source-verification/correction guidelines'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 04',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'ONE LAST BYTE',
      objective:
        'Create a centralized academic resource directory where CCS ID126 students can easily access reviewers, study materials, useful applications, tutorials, and practical academic advice—making academic preparation more accessible, particularly during midterms and finals.',
      implementation: [
        'Create a centralized Google Drive repository organized by (1) program, (2) course, and (3) resource category containing student-contributed and online reviewers, lecture summaries, practice exercises, and supplementary materials.',
        'Include a dedicated section for recommended academic applications, study tools, video tutorials, productivity resources, and practical advice from upperclassmen.',
        'Compile reviewers, practice materials, study guides, and preparation checklists into organized midterm and final examination folders updated ahead of major assessment periods.',
        'Establish a Google Form for voluntary contributions from students and upperclassmen, with a designated committee organizing submissions, creating original materials, and ensuring academic integrity.'
      ],
      resources: [
        'Google Drive, Google Forms, Google Sheets (resource tracking), QR codes, and existing DLSU Workspace accounts',
        'Student-contributed reviewers, academic materials, and recommended online learning tools',
        'Volunteer student/upperclassman contributors and designated repository coordinators',
        'Coordination with recognized CCS academic organizations (such as LSCS, Peer Tutors Society, and the USG)',
        'Resource verification and academic integrity guidelines'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 05',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'BEYOND THE BINARY',
      objective:
        'Promote socially responsible CCS ID126 students by connecting their technological knowledge and creativity with real challenges affecting Filipino communities—demonstrating how accessible digital tools, tech literacy, and practical resources can address misinformation, digital exclusion, online safety, and limited tech access.',
      implementation: [
        'Establish a term-based civic technology initiative selecting one relevant national or community concern per academic term focused on digital literacy, misinformation, online safety, or accessibility.',
        'Develop beginner-friendly digital literacy materials covering essential digital skills, online safety, privacy protection, and responsible internet use, distributing outputs online or via community partners.',
        'Select and implement one feasible project per academic term overseen by a small batch government project team handling research, development, verification, publication, and impact evaluation.'
      ],
      resources: [
        'Google Drive (educational materials & documentation), Canva, and Google Slides',
        'Official CATCH2T30 social media platforms',
        'Designated batch government project team and optional student contributors',
        'Credible research sources and recognized organizations or community partners',
        'Basic content verification, accessibility guidelines, and required partnership approvals'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 06',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'TECH A SEC',
      objective:
        'Establish a student-led podcast and digital media initiative connecting CCS ID126 students to developments in technology, national affairs, and the global computing industry—making AI, cybersecurity, digital governance, and emerging innovations accessible through engaging discussions.',
      implementation: [
        'Produce one recorded episode per month across accessible platforms (Facebook, YouTube, and Spotify where feasible), starting with short-form ~10-minute discussions.',
        'Organize episodes into three recurring segments: (A) OFF THE GRID (national/international tech, AI, cybersecurity, and computing breakthroughs), (B) THE BACKEND (social, ethical, economic, and political implications of tech), and (C) OPEN MIC (conversations with CCS students, upperclassmen, or industry professionals).',
        'Assign a media team for topic research, scripting, recording, and editing, sourcing topics via student suggestions and publishing short episode highlights as Reels.'
      ],
      resources: [
        'Official CATCH2T30 Facebook, YouTube, and Spotify distribution channels',
        'Google Forms (topic suggestions & feedback) and Google Docs/Sheets (scripts & production schedule)',
        'Canva, CapCut, smartphones, microphones, and available recording spaces',
        'Designated podcast production team, volunteer student hosts, and invited resource speakers',
        'Credible national and international news and technology sources'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 07',
      badgeColor: 'bg-[#149E92]/25 text-[#7AC0BA] border border-[#7AC0BA]/30',
      title: 'ON THE DOT',
      objective:
        'Establish a centralized student welfare service providing CCS ID126 students with convenient access to essential academic equipment and everyday necessities through an organized borrowing and classroom delivery system—reducing unnecessary expenses and academic disruptions.',
      implementation: [
        'Operate a batch-managed borrowing and student assistance service offering school supplies, calculators, power banks, chargers, cables, adapters, umbrellas, rain boots, and other reusable essentials.',
        'Build a centralized digital reservation system via Google Forms and Sheets so students can check item availability, request printing services, reserve equipment, and book classroom delivery slots (with an additional fee).',
        'Organize scheduled classroom deliveries and item returns through designated batch personnel during published service hours, scaling slots based on demand.',
        'Monitor inventory, borrowing transactions, and service performance centrally, publishing updated availability and schedules on official CATCH2T30 channels.'
      ],
      resources: [
        'Google Forms (reservations & printing), Google Sheets (inventory & tracking), Google Drive (printing files), and QR catalog',
        'Official CATCH2T30 communication platforms',
        'Calculators, power banks, chargers, cables, adapters, umbrellas, rain boots, and reusable essentials',
        'Designated inventory coordinator, delivery personnel, secure storage, and return points',
        'Standardized borrowing/accountability guidelines, initial inventory budget/donations, and university approvals'
      ]
    },
    {
      category: 'gueco',
      categoryLabel: 'GUECO • Platform 08',
      badgeColor: 'bg-[#7AC0BA]/20 text-[#7AC0BA] border border-[#7AC0BA]/35',
      title: 'LIFE 2.0',
      objective:
        'Establish a centralized repository of CCS-developed applications, websites, databases, and information systems that students and succeeding batches can access and continue with prior creator authorization—preventing promising academic and independent projects from being abandoned.',
      implementation: [
        'Coordinate with CCS faculty advisers, capstone advisers, and student organizations at term-end to collect project descriptions, demos, source files, setup instructions, known limitations, and written rights-holder authorization.',
        'Maintain a centralized project catalog categorized by mobile apps, websites, databases, and information systems—displaying purpose, screenshots, completed features, unresolved errors, suggested improvements, and required software.',
        'Open project adoption applications during the first two weeks of each term; students submit a one-page proposal evaluated within one week based on feasibility, relevance, resources, and permissions.',
        'Grant approved developers file access and previous notes, requiring three milestones, bi-weekly progress updates, a shared development log, and referrals to volunteer technical mentors.',
        'Require end-of-term system demonstrations, revised source files, setup instructions, and contributor permissions before publishing updated projects and exploring campus/community pilot deployment.'
      ],
      resources: [
        'Centralized project website/catalog and restricted cloud storage for project files and documentation',
        'Project evaluation and coordination committee & volunteer technical mentors from CCS organizations',
        'Project submission/adoption guidelines, written creator authorization, and contributor agreements',
        'Standardized project documentation and development logs',
        'Coordination with faculty advisers, capstone coordinators, potential beneficiaries, and institutional approvers'
      ]
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

    // Note: Added `items-start` to grid so expanding one card doesn't stretch its neighbor's empty space
    platformGrid.classList.add('items-start');

    platformGrid.innerHTML = filtered.map((policy, index) => {
      const bodyMarkup = policy.category === 'gueco'
        ? `
          <div class="space-y-5 text-sm sm:text-base leading-relaxed">
            <div>
              <h4 class="font-adriana text-xs font-bold uppercase tracking-wider text-[#7AC0BA] mb-1.5">
                Objective
              </h4>
              <p class="text-[#D4E4E2]">${policy.objective}</p>
            </div>

            <div class="pt-4 border-t border-[#149E92]/30">
              <h4 class="font-adriana text-xs font-bold uppercase tracking-wider text-[#7AC0BA] mb-2">
                Implementation
              </h4>
              <ol class="list-decimal pl-5 space-y-2 text-[#D4E4E2]">
                ${policy.implementation.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>

            <div class="pt-4 border-t border-[#149E92]/30">
              <h4 class="font-adriana text-xs font-bold uppercase tracking-wider text-[#7AC0BA] mb-2">
                Resources Needed
              </h4>
              <ul class="list-disc pl-5 space-y-1.5 text-[#D4E4E2]">
                ${policy.resources.map(res => `<li>${res}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
        : `
          <div>
            <p class="text-[#D4E4E2] text-sm sm:text-base leading-relaxed">
              ${policy.details}
            </p>
          </div>
        `;

      return `
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
                ${bodyMarkup}
              </div>
            </div>
          </div>

        </article>
      `;
    }).join('');

    // Attach click listeners to toggle full details on each card
    const toggleButtons = platformGrid.querySelectorAll('.platform-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.platform-card');
        const detailsPanel = card.querySelector('.platform-details');
        const chevron = btn.querySelector('.toggle-chevron');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Toggle visibility & accessibility state
        btn.setAttribute('aria-expanded', String(!isExpanded));
        detailsPanel.classList.toggle('hidden');

        // Rotate chevron & highlight active card border
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