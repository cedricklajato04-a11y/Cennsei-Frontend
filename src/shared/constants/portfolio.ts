export type PageKey = "home" | "about" | "expertise" | "projects" | "journey" | "contact";

export const navItems: Array<{ label: string; page: PageKey }> = [
  { label: "Home",      page: "home" },
  { label: "About",     page: "about" },
  { label: "Expertise", page: "expertise" },
  { label: "Projects",  page: "projects" },
  { label: "Journey",   page: "journey" },
  { label: "Contact",   page: "contact" },
];

// ── Hero ──────────────────────────────────────────────────────────────────────

export const homeStats: Array<[string, string]> = [
  ["3rd Year", "BSCS Student"],
  ["3+",       "Years Learning & Building"],
  ["7+",       "Development Technologies"],
  ["3",        "Completed Projects"],
];

export const currentFocus = [
  "Software Development",
  "Web Applications",
  "Database Systems",
  "UI/UX Design Principles",
  "Modern Development Practices",
];

export const heroTechTags = ["Java", "Python", "Flutter", "MySQL", "Supabase"];

// ── About ─────────────────────────────────────────────────────────────────────

export const aboutMetrics: Array<[string, string, string]> = [
  ["school",   "3rd Year",     "Computer Science Major"],
  ["terminal", "7+ Techs",     "Development Stack"],
  ["rocket",   "3+ Projects",  "Built & Deployed"],
  ["award",    "Continuous",   "Learner Mindset"],
];

export const foundations: Array<[string, string]> = [
  ["Data Structures & Algorithms", "Core problem-solving skills applied to real project logic."],
  ["Database Management",          "Designed and queried relational databases using MySQL and Supabase."],
  ["Object-Oriented Programming",  "Built maintainable software in Java, Python, and C++."],
];

export const vision = [
  {
    number: "01",
    title:  "Full Stack Development",
    description:
      "Strengthening my expertise in web technologies, APIs, and databases to build complete, end-to-end software solutions that are fast and user-friendly.",
  },
  {
    number: "02",
    title:  "Professional Growth",
    description:
      "Gaining real-world experience through internships and collaborative projects to develop into a software engineer capable of delivering meaningful value.",
  },
  {
    number: "03",
    title:  "Continuous Learning",
    description:
      "Staying up-to-date with modern tools and best practices, always exploring new technologies that can improve the quality and impact of my work.",
  },
];

// ── Expertise ─────────────────────────────────────────────────────────────────

export const expertiseCategories = [
  {
    eyebrow:  "Programming Languages",
    title:    "Languages",
    items:    ["Java", "Python", "C++", "C#", "HTML", "CSS", "Flutter / Dart"],
  },
  {
    eyebrow:  "Database & Backend",
    title:    "Database & Backend",
    items:    ["MySQL", "Supabase", "Laragon"],
  },
  {
    eyebrow:  "Productivity Tools",
    title:    "Tools & Ecosystem",
    items:    ["Git", "GitHub", "VS Code", "MS Word", "MS Excel", "MS PowerPoint", "MS Access"],
  },
  {
    eyebrow:  "Professional Skills",
    title:    "Professional Skills",
    items:    ["Team Collaboration", "Communication", "Adaptability", "Problem Solving", "Debugging"],
  },
];

export const expertisePreview = [
  {
    icon:        "code",
    title:       "Programming",
    description: "Java, Python, C++, C# — building reliable software with strong fundamentals.",
  },
  {
    icon:        "data",
    title:       "Databases",
    description: "MySQL & Supabase — designing clean schemas and writing efficient queries.",
  },
  {
    icon:        "rocket",
    title:       "Mobile Dev",
    description: "Flutter & Dart — building cross-platform mobile apps with modern UX.",
  },
  {
    icon:        "shield",
    title:       "Software Design",
    description: "OOP, MVC patterns, and clean architecture principles for maintainable code.",
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export const projects = [
  {
    slug:        "payroll-management-system",
    title:       "Payroll Management System",
    status:      "Completed",
    year:        "2024",
    description:
      "A desktop application that automates employee record management, payroll computation, attendance tracking, and database integration for small-to-medium organizations.",
    stack:       ["Java", "MySQL"],
    features:    ["Employee Records", "Payroll Computation", "Attendance Tracking", "Database Integration"],
    githubUrl:   null as string | null,
  },
  {
    slug:        "student-tuition-fee-system",
    title:       "Student Tuition Fee System",
    status:      "Completed",
    year:        "2024",
    description:
      "A student billing platform for academic institutions featuring student records, fee calculation, payment tracking, and report generation.",
    stack:       ["Java", "Database Management"],
    features:    ["Student Records", "Fee Calculation", "Payment Tracking", "Report Generation"],
    githubUrl:   null as string | null,
  },
  {
    slug:        "task-management-system",
    title:       "Task Management System",
    status:      "In Progress",
    year:        "2025",
    description:
      "A cross-platform mobile productivity app for task organization, habit tracking, scheduling, and a personal productivity dashboard.",
    stack:       ["Flutter", "Supabase"],
    features:    ["Task Organization", "Habit Tracking", "Scheduling", "Productivity Dashboard"],
    githubUrl:   null as string | null,
  },
];

export const projectPrinciples: Array<[string, string]> = [
  [
    "Clean Code",
    "Every project starts with readable, maintainable code. Naming, structure, and comments matter as much as functionality.",
  ],
  [
    "User-Centered Design",
    "Features are only valuable if they solve real problems. I design with the end user's workflow in mind from day one.",
  ],
  [
    "Continuous Improvement",
    "Each project teaches something new. I document lessons learned and apply them to make the next project better.",
  ],
];

// ── Journey ───────────────────────────────────────────────────────────────────

export const journeyMilestones = [
  {
    year:        "2023",
    period:      "2023",
    eyebrow:     "Q1 – Q4 2023",
    title:       "Started BSCS",
    description: "Began Bachelor of Science in Computer Science at Arellano University. Built strong foundations in programming fundamentals, data structures, and problem-solving with Java and Python.",
    tags:        ["Java", "Python", "Algorithms"],
    side:        "left" as const,
  },
  {
    year:        "2024",
    period:      "2024",
    eyebrow:     "Q1 – Q4 2024",
    title:       "Software Development Focus",
    description: "Dove deep into object-oriented programming, database design, and software engineering principles. Built the Payroll Management System and Student Tuition Fee System.",
    tags:        ["Java", "MySQL", "OOP"],
    side:        "right" as const,
  },
  {
    year:        "2025",
    period:      "2025",
    eyebrow:     "Q1 – Q4 2025",
    title:       "Mobile & Full Stack",
    description: "Expanded into cross-platform mobile development with Flutter and Supabase. Started building the Task Management System and exploring modern web development.",
    tags:        ["Flutter", "Supabase", "TypeScript"],
    side:        "left" as const,
  },
  {
    year:        "2026",
    period:      "2026",
    eyebrow:     "Present & Future",
    title:       "Internship & Growth",
    description: "Actively seeking internship opportunities to apply academic knowledge in real-world settings. Focused on full-stack development and growing into a professional software engineer.",
    tags:        ["Internship", "Full Stack", "Professional Growth"],
    side:        "right" as const,
  },
];

export const timelinePreview = journeyMilestones.slice(0, 3).map((m) => ({
  period:      m.year,
  title:       m.title,
  description: m.description,
}));

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactInfo = {
  name:      "Cennsei",
  email:     "cedricklajato04@gmail.com",
  phone:     "0956-374-0813",
  location:  "Pasay City, Philippines",
  github:    "https://github.com/cedricklajato04-a11y",
  linkedin:  "https://linkedin.com/in/cedricklajato",
  resumeUrl: "/cennsei-resume.pdf",
};
