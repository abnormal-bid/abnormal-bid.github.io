import type { Copy } from "./types.ts";

export const en: Copy = {
  htmlLang: "en",
  ogLocale: "en_US",
  dot: ".",
  space: " ",
  meta: {
    title: "Abnormal — Email service",
    description:
      "Abnormal email service: buy an @abnormal.bid mailbox online, set it up yourself with a redeem code, and read and send from webmail or any mail app. Domain mailboxes, team mailboxes and setup help are available on request.",
    socialTitle: "Abnormal — Good email, simple conversations.",
    socialDescription:
      "Buy and set up an @abnormal.bid mailbox yourself, then read and send from webmail or your mail app.",
  },
  skipLink: "Skip to main content",
  brandLabel: "Abnormal home",
  langToggle: { label: "中", aria: "切换到中文" },
  header: {
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    nav: [
      { anchor: "start", label: "Get started" },
      { anchor: "services", label: "Services" },
      { anchor: "how-it-works", label: "How it works" },
      { anchor: "faq", label: "FAQ" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    login: "Log in",
    buy: "Buy a mailbox",
    haveCode: "I have a code",
    loginWebmail: "Log in to webmail",
  },
  theme: {
    title: "Appearance",
    ariaTemplate: "Change theme, currently {label}",
    titleTemplate: "Theme: {label}",
    options: { system: "System", light: "Light", dark: "Dark" },
  },
  hero: {
    eyebrow: "Email, made personal",
    titleLines: ["Good email,", "simple conversations"],
    description: [
      "Buy an @abnormal.bid mailbox online and set it up yourself with a redeem code.",
      "Read and send from webmail or the mail app you already use.",
    ],
    buy: "Buy a mailbox",
    haveCode: "I have a code",
    loginPrompt: "Already set up?",
    loginLink: "Log in to webmail",
    promises: ["Code issued on payment", "Pick your own username", "Ready to send right away"],
    visualLabel: "Concept illustration of the email service: a tidy inbox and an address on your own domain.",
    mock: {
      overline: "A LITTLE MORE CONNECTED",
      heading: "Every email has a home",
      inbox: "Inbox",
      starred: "Starred",
      mails: [
        {
          title: "New connections, new possibilities.",
          body: "Make every conversation a good start.",
          time: "09:41",
        },
        {
          title: "About our next plan",
          body: "Ideas, plans and the news we've waited for.",
          time: "Yesterday",
        },
        {
          title: "All set. Let's begin.",
          body: "Your day starts with a mailbox that just works.",
          time: "Yesterday",
        },
      ],
      domainNote: "Your name, your address",
      demoLabel: "Concept",
    },
  },
  valueStrip: {
    lead: "Less setup hassle.",
    strong: "More time to talk.",
    labels: ["Buy online", "Self-service setup", "Webmail", "Mail apps"],
  },
  start: {
    eyebrow: "Start here",
    title: "Start here",
    intro: ["Buy, redeem, sign in and learn the ropes,", "all from this page."],
    entries: [
      {
        icon: "cart",
        eyebrow: "No mailbox yet",
        title: "Buy a mailbox",
        description:
          "Pick a plan and pay with Linux DO Credit or card. A redeem code is issued as soon as payment is confirmed.",
        link: "shop",
        action: "Go to the shop",
        primary: true,
      },
      {
        icon: "ticket",
        eyebrow: "Have a code",
        title: "Redeem",
        description:
          "Enter your 16-character code, pick usernames and passwords, and open several mailboxes at once. They work right away.",
        link: "redeem",
        action: "Redeem now",
      },
      {
        icon: "mail",
        eyebrow: "Already set up",
        title: "Webmail",
        description:
          "Read and send in the browser. Sign in with your full address and password, with several mailboxes at once.",
        link: "webmail",
        action: "Log in",
      },
      {
        icon: "book",
        eyebrow: "After you redeem",
        title: "Guide",
        description:
          "Set up mail apps on your phone or computer, change your password, and use your mailbox to sign up for Claude and ChatGPT.",
        link: "guide",
        action: "Read the guide",
      },
    ],
    secondary: [
      { link: "account", label: "Orders and renewals" },
      { link: "status", label: "Service status" },
    ],
    support: "Support",
  },
  services: {
    eyebrow: "Find your email",
    titleLines: ["A mailbox", "for every day"],
    intro: ["Personal mailboxes are bought and set up online.", "For domains, teams or setup help, let's talk first."],
    products: [
      {
        icon: "mail",
        name: "Personal mailbox",
        category: "Everyday mail",
        description:
          "An @abnormal.bid mailbox you buy and set up online, for everyday mail and signing up for the services you use.",
        tags: ["Buy online", "Self-service"],
        price: "Buy online",
        priceNote: "Plans and prices as shown in the shop",
        link: "shop",
        actionLabel: "Buy in the shop",
        featured: true,
      },
      {
        icon: "domain",
        name: "Domain mailbox",
        category: "Your address",
        description: "Addresses planned around your own domain, so every message carries your name.",
        tags: ["Domain advice", "Address planning"],
        price: "",
        priceNote: "Quoted by domain and setup",
      },
      {
        icon: "team",
        name: "Team mailbox",
        category: "Work",
        description: "Mailboxes planned around your team's size and the way you work together.",
        tags: ["For teams", "Set up to fit"],
        price: "",
        priceNote: "Quoted by mailboxes and term",
      },
      {
        icon: "setup",
        name: "Mailbox setup",
        category: "Support",
        description: "Help with sending and receiving settings and mail apps, so email fits into your day.",
        tags: ["Setup help", "How-to guidance"],
        price: "",
        priceNote: "Quoted by scope",
      },
    ],
    priceFallback: "On request",
    consult: "Ask about this",
    consultAria: (name) => `Ask about: ${name}`,
    noteQuestion: "Need something else, or a team setup?",
    noteAction: "Talk to us",
    noteFine:
      "Personal mailboxes follow the plans and prices in the shop. Other services are quoted once we've talked.",
  },
  process: {
    eyebrow: "A simple way to get started",
    title: "Three steps to your mailbox",
    intro: ["From checkout to your first email,", "every step is self-service."],
    steps: [
      {
        icon: "cart",
        title: "Choose a plan",
        description:
          "Pick the number of mailboxes and storage in the shop, and pay with Linux DO Credit or card. The redeem code is issued once payment is confirmed.",
        link: "shop",
        action: "Go to the shop",
      },
      {
        icon: "ticket",
        title: "Redeem",
        description:
          "Enter the code on the redeem page and pick a username and password. The password is shown only once, so save it.",
        link: "redeem",
        action: "Redeem",
      },
      {
        icon: "mail",
        title: "Sign in and send",
        description:
          "Log in to webmail with your full address, or follow the guide to add it to a mail app over IMAP / SMTP.",
        link: "webmail",
        action: "Log in to webmail",
      },
    ],
  },
  faq: {
    eyebrow: "Good questions",
    title: "Questions, answered",
    description: "What's worth knowing before you start.",
    contact: "Something else? Ask us",
    items: [
      {
        question: "What does Abnormal offer?",
        answer:
          "We offer @abnormal.bid mailboxes: buy one in the shop, set it up yourself with a redeem code, and read and send from webmail or the mail app you already use. For your own domain, a batch of team mailboxes or setup help, ask us first.",
      },
      {
        question: "How do I buy and set up a mailbox?",
        answer:
          "Pick a plan in the shop and pay with Linux DO Credit or card. Once payment is confirmed you get a redeem code; enter it on the redeem page and pick a username and password. If you already have a code, go straight to the redeem page.",
      },
      {
        question: "Where do I sign in afterwards?",
        answer:
          "Webmail is at webmail.abnormalhq.com. Sign in with your full email address and the password you set when redeeming. You can also add the account to a mail app on your phone or computer; the server settings are in your redeem result and the guide.",
      },
      {
        question: "Where do I manage orders, renewals and automatic payments?",
        answer:
          "On the My account page in the shop you can see your orders, collect redeem codes and renew. Card subscriptions are managed there too, including changing the card or cancelling automatic renewal.",
      },
      {
        question: "Can I use my own domain or set up mailboxes for a team?",
        answer:
          "Tell us your domain, how many mailboxes you need and for how long. We'll confirm the plan, the setup involved and the cost; you need to have admin access to the domain. Never send passwords, verification codes, recovery codes or payment details in your message.",
      },
      {
        question: "What if something goes wrong?",
        answer:
          "If mail isn't coming or going, check the service status page first for outages or maintenance. For anything else, write to support and include your email address or order number so we can help faster.",
      },
    ],
  },
  closing: {
    eyebrow: "Make every connection count",
    titleLines: ["Your next email", "starts here"],
    body: "Pick a plan, pay, set it up yourself and start sending right away. Need a domain or a team? Let's talk.",
    buy: "Buy a mailbox",
    custom: "Talk about custom needs",
  },
  footer: {
    tagline: "Your inbox. Your identity.",
    productLabel: "Product",
    supportLabel: "Support",
    contactLabel: "Contact",
    productLinks: [
      { link: "shop", label: "Buy a mailbox" },
      { link: "redeem", label: "Redeem" },
      { link: "webmail", label: "Webmail" },
      { link: "guide", label: "Guide" },
    ],
    supportLinks: [
      { link: "account", label: "My orders" },
      { link: "status", label: "Service status" },
    ],
    faq: "FAQ",
    emailAria: (email) => `Support email: ${email}`,
    copyright: "© {year} Abnormal. Mail made simple.",
    buyOnline: "Buy a mailbox online",
    legalLabel: "Legal",
  },
  legalPages: [
    { path: "/privacy/", label: "Privacy Policy" },
    { path: "/terms/", label: "Terms of Service" },
  ],
  download: {
    metaTitle: "Download the desktop app — Abnormal",
    metaDescription:
      "The Abnormal Mail desktop app for macOS and Windows: read, search, reply and send, in sync with webmail.",
    navLabel: "Desktop app",
    eyebrow: "Desktop app",
    title: "Your mail on the desktop",
    intro:
      "A native app for macOS and Windows. Sign in with your mailbox address and password; folders, read state and stars stay in sync with webmail.",
    macos: {
      name: "macOS",
      requirement: "macOS 11 or later, for Apple silicon and Intel.",
      download: "Download .dmg",
      brewLabel: "Or install with Homebrew:",
      firstLaunch:
        "The app is not signed yet. The first time you open it, go to System Settings › Privacy & Security and click Open Anyway.",
    },
    windows: {
      name: "Windows",
      requirement: "Windows 10 or 11 (64-bit). Installs for the current user, no administrator rights needed.",
      download: "Download the installer",
      firstLaunch: "The installer is not signed yet. If SmartScreen appears, click More info, then Run anyway.",
    },
    signInTitle: "Sign in",
    signInSteps: [
      "Server: the same server address mail clients use, shown when your mailbox is set up and in the guide.",
      "Email address: your full mailbox address.",
      "Password: the mailbox's own password, the same one IMAP / SMTP clients use.",
    ],
    checksums: "Version and SHA-256 checksums",
    webmailNote: "Rather not install anything?",
    webmailLink: "Use webmail in your browser",
  },
  inquiry: {
    kicker: "Let's get you started",
    close: "Close",
    title: "Start with what you need",
    description: [
      "Pick a service, describe what you need, then get in touch.",
      "Plans, pricing and setup are confirmed before you pay.",
    ],
    productLabel: "Service",
    durationLabel: "Term",
    durations: ["1 month", "3 months", "6 months", "12 months", "Not sure yet"],
    otherProduct: "Something else",
    undecidedProduct: "Not sure yet",
    undecidedLabel: "Not sure yet, I'd like to ask first",
    notesLabel: "Number of mailboxes, domain or mail app needs",
    optional: "Optional",
    notesPlaceholder:
      "For example: 3 mailboxes, I already own a domain, and I want mail on my phone and laptop. Never include passwords or codes.",
    previewLabel: "Your message",
    copy: "Copy message",
    note: "This dialog only helps you write your request. It doesn't place an order or charge you.",
    legal: "Requests and services are covered by the {terms} and {privacy}.",
    newWindow: " (opens in a new window)",
    copied: "Copied. Paste it into a message to us.",
    copyFailed: "Couldn't copy automatically. Select the text above and copy it.",
    copyFieldLabel: "Message to copy",
  },
  legal: {
    effective: "Effective",
    updated: "Last updated",
    dateLocale: "en-US",
    tocLabel: "Contents",
    tocHint: "On this page",
    tocKicker: "Contents",
    highlights: "At a glance",
    highlightsNote: "This summary is for convenience; the full text below governs.",
    contactTitle: "Contact us",
    contactBody: (title) =>
      `If you have questions about this ${title}, or want to access, correct or delete your information, contact us below. Tell us what you need and include any order details; never send passwords, verification codes or card details.`,
    contactPending: "Contact channels are coming soon and will be listed here.",
    contactLabels: { email: "Email", wechat: "WeChat", telegram: "Telegram" },
    colon: ": ",
    relatedLabel: "Related pages",
    seeAlso: (label) => `See also: ${label}`,
    backHome: "Back to home",
  },
};
