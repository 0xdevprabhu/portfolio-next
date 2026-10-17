import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & UI Design",
    description: "Responsive interfaces, semantic markup, dynamic state management, and modern interactive aesthetics.",
    skills: [
      { name: "HTML5", icon: "/assets/images/html5.svg", level: 95 },
      { name: "CSS3", icon: "/assets/images/css3.svg", level: 92 },
      { name: "JavaScript (ES6+)", icon: "/assets/images/javascript.svg", level: 90 },
      { name: "React JS", icon: "/assets/images/react.svg", badge: "Specialist", level: 85 },
      { name: "Tailwind CSS", icon: "/assets/images/css3.svg", level: 88 },
      { name: "Bootstrap", icon: "/assets/images/bootstrap.svg", level: 85 },
      { name: "Canva UI", icon: "/assets/images/canva.svg", level: 80 },
    ],
  },
  {
    title: "Backend & Database Architecture",
    description: "Server-side logic, relational database engineering, RESTful API integrations, and LAMP environment administration.",
    skills: [
      { name: "PHP", icon: "/assets/images/php.svg", badge: "Core", level: 92 },
      { name: "MySQL", icon: "/assets/images/mysql.svg", badge: "Core", level: 90 },
      { name: "Linux Server", icon: "/assets/images/linux.svg", level: 85 },
      { name: "Apache HTTPD", icon: "/assets/images/apache.svg", level: 85 },
      { name: "Laravel", icon: "/assets/images/laravel.png", badge: "Self Taught", level: 75 },
    ],
  },
  {
    title: "Artificial Intelligence & Automation",
    description: "Leveraging cutting-edge generative AI models and automated workflows to accelerate software development.",
    skills: [
      { name: "Google Gemini API", icon: "/assets/images/gemini.svg", badge: "API Integration", level: 90 },
      { name: "Claude AI", icon: "/assets/images/claude.jpg", level: 88 },
      { name: "ChatGPT (OpenAI)", icon: "/assets/images/chatgpt.png", level: 88 },
      { name: "xAI Grok", icon: "/assets/images/grok.png", level: 82 },
      { name: "GitHub Copilot", icon: "/assets/images/copilot.png", level: 85 },
    ],
  },
  {
    title: "Development Ecosystem & DevOps",
    description: "Industry-standard tooling, version control workflows, database administration, and local dev environments.",
    skills: [
      { name: "VS Code", icon: "/assets/images/vscode.svg", level: 95 },
      { name: "Git & GitHub", icon: "/assets/images/git.svg", level: 90 },
      { name: "Google Antigravity", icon: "/assets/images/antigravity.png", badge: "Power User", level: 92 },
      { name: "XAMPP Stack", icon: "/assets/images/xampp.png", level: 90 },
      { name: "phpMyAdmin", icon: "/assets/images/phpmyadmin.png", level: 90 },
    ],
  },
];
