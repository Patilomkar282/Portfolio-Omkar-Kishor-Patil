const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Skill = require('./models/Skill');
const Achievement = require('./models/Achievement');
const Admin = require('./models/Admin');

// Data from frontend components
const projects = [
    {
        title: "MediSlot",
        description: "A comprehensive doctor appointment booking platform designed for seamless healthcare access. Features secure user authentication, real-time slot availability, and an integrated Razorpay payment gateway for hassle-free online consultations and payments.",
        tags: ["React", "Node.js", "MongoDB", "Razorpay"],
        codeLink: "https://github.com/Patilomkar282/MediSlot",
        demoLink: "https://docappoint-sable.vercel.app/",
        icons: ["FaReact", "FaNodeJs", "SiMongodb", "SiRazorpay"],
        gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
        title: "AutoCorrection System",
        description: "An intelligent CNC correction system featuring user, manager, and admin roles. Built with React.js & Tailwind for the frontend and Node.js/Express for RESTful APIs. Logs are stored in MySQL with secure JWT auth. Integrated with Raspberry Pi for real-time edge deployment and Chart.js for data visualization.",
        tags: ["React", "Node.js", "MySQL", "Raspberry Pi"],
        codeLink: "#",
        demoLink: "#",
        icons: ["FaReact", "FaNodeJs", "SiMysql", "FaRaspberryPi", "SiChartdotjs"],
        gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
        title: "UnikLeads",
        description: "A robust SaaS platform designed for enterprise access control with a scalable multi-tenant architecture.  Leverages AWS for cloud infrastructure, MySQL for structured data management, and React/Redux for complex state handling across different user roles.",
        tags: ["AWS", "MySQL", "React", "Redux"],
        codeLink: "https://github.com/UnikLeadsDev/SaaS-Base-Automated-Access-Control-with-Recharge-System",
        demoLink: "http://34.227.47.231/login",
        icons: ["FaAws", "SiMysql", "FaReact", "SiRedux"],
        gradient: "from-orange-500/10 to-yellow-500/10"
    },
    {
        title: "Blog-Connect",
        description: "A dynamic blog management platform empowering users to create, share, and manage articles. Features a high-performance Node.js/Express backend and an engaging React.js frontend that ensures smooth, real-time updates and a rich user experience.",
        tags: ["React", "Node.js", "Express", "MongoDB"],
        codeLink: "#",
        demoLink: "#",
        icons: ["FaReact", "FaNodeJs", "SiExpress", "SiMongodb"],
        gradient: "from-pink-500/10 to-rose-500/10"
    },
    {
        title: "Inventory Management",
        description: "A full-stack inventory tracking system ensuring real-time database updates and efficient stock management. Powered by a PHP backend for robust logic and a responsive HTML/CSS/JS frontend for superior usability across devices.",
        tags: ["HTML/CSS", "PHP", "MySQL", "JS"],
        codeLink: "#",
        demoLink: "#",
        icons: ["FaHtml5", "FaPhp", "SiMysql", "FaJs"],
        gradient: "from-indigo-500/10 to-violet-500/10"
    },
    {
        title: "Skillora",
        description: "An AI-powered learning assistant that curates personalized educational content.  Integrates advanced LLMs for intelligent recommendations and the YouTube API to fetch relevant video resources, creating a tailored learning path for every user.",
        tags: ["React", "AI/ML", "YouTube API"],
        codeLink: "https://github.com/Patilomkar282/Devclash_Frontend",
        demoLink: "#",
        icons: ["FaReact", "FaPython", "SiYoutube"],
        gradient: "from-red-500/10 to-rose-500/10"
    },
    {
        title: "Portfolio",
        description: "The website you're looking at! An extraordinary Single Page Application offering a high-performance, immersive experience. Features a custom light theme, 3D tilt interactions, Framer Motion animations, and a NodeJS email backend.",
        tags: ["React", "Framer Motion", "Tailwind"],
        codeLink: "#",
        demoLink: "#",
        icons: ["FaReact", "SiFramer", "SiTailwindcss"],
        gradient: "from-purple-500/10 to-indigo-500/10"
    }
];

const experiences = [
    {
        title: "MERN Stack Developer Intern",
        company: "Nexrage",
        period: "Aug 2025 – Present",
        location: "Remote",
        description: "Architecting scalable web solutions using the MERN stack. Focusing on performance optimization, component reusability, and implementing modern React patterns.",
        skills: ["React", "Node.js", "Redux", "MongoDB"],
        icon: "Laptop",
        gradient: "from-blue-500/10 to-indigo-500/10",
        iconColor: "text-blue-600"
    },
    {
        title: "Full Stack Intern",
        company: "Athena Automation",
        period: "Dec 2024 – Feb 2025",
        location: "Hybrid (Pune)",
        description: "Developed automated workflows and integrated third-party APIs for seamless data synchronization. Enhanced system reliability by 20% through rigorous testing.",
        skills: ["MySQL", "Express", "API Integration", "Node.js"],
        icon: "Database",
        gradient: "from-purple-500/10 to-violet-500/10",
        iconColor: "text-purple-600"
    },
    {
        title: "Software Development Intern",
        company: "Educadd Software",
        period: "June 2022 – Aug 2022",
        location: "Latur",
        description: "Assisted in the development of educational software modules. Gained hands-on experience with version control (Git) and agile development methodologies.",
        skills: ["Java", "SQL", "Git", "OOPs"],
        icon: "Layout",
        gradient: "from-orange-500/10 to-amber-500/10",
        iconColor: "text-orange-600"
    }
];

const education = [
    {
        degree: "B.E in Computer Engineering",
        institute: "Marathwada Mitra Mandal’s College of Engineering",
        location: "Karvenagar, Pune",
        year: "2026",
        score: "9.60 CGPA",
        description: "Focusing on core computer science concepts, rigorous academic curriculum, and advanced technical skills.",
        icon: "GraduationCap",
        gradient: "from-blue-500/10 to-cyan-500/10",
        iconColor: "text-blue-500"
    },
    {
        degree: "Diploma in Computer Science",
        institute: "Puranmal Lahoti Government Polytechnic",
        location: "Latur",
        year: "2023",
        score: "88.11%",
        description: "Built a strong foundation in programming, algorithms, and system architecture with hands-on labs.",
        icon: "BookOpen",
        gradient: "from-purple-500/10 to-pink-500/10",
        iconColor: "text-purple-500"
    },
    {
        degree: "Senior Secondary (HSC)",
        institute: "Dayanand Science College",
        location: "Latur",
        year: "2021",
        score: "96.67%",
        description: "Excelled in Science and Mathematics streams, developing strong analytical and problem-solving abilities.",
        icon: "Award",
        gradient: "from-amber-500/10 to-orange-500/10",
        iconColor: "text-amber-500"
    },
    {
        degree: "Secondary (SSC)",
        institute: "Shri Mahatma Bashweshwar Vidyalaya",
        location: "Omerga",
        year: "2019",
        score: "92.80%",
        description: "Achieved academic excellence and actively participated in extra-curricular activities.",
        icon: "SchoolIcon",
        gradient: "from-emerald-500/10 to-green-500/10",
        iconColor: "text-emerald-500"
    }
];

const skills = [
    { name: "React", icon: "FaReact", category: "Frontend" },
    { name: "Node.js", icon: "FaNodeJs", category: "Backend" },
    { name: "MongoDB", icon: "SiMongodb", category: "Database" },
    { name: "Express", icon: "SiExpress", category: "Backend" },
    { name: "JavaScript", icon: "FaJs", category: "Language" },
    { name: "Java", icon: "FaJava", category: "Language" },
    { name: "Python", icon: "FaPython", category: "Language" },
    { name: "Tailwind", icon: "SiTailwindcss", category: "Frontend" },
    { name: "Redux", icon: "SiRedux", category: "State" },
    { name: "MySQL", icon: "SiMysql", category: "Database" },
    { name: "HTML5", icon: "FaHtml5", category: "Frontend" },
    { name: "CSS3", icon: "FaCss3", category: "Frontend" },
    { name: "AWS", icon: "FaAws", category: "Cloud" },
    { name: "Framer", icon: "SiFramer", category: "Design" },
];

const achievements = [
    {
        title: "Winner - DevClash Hackathon 2025",
        description: "First place in competitive programming and development hackathon",
        icon: "Award",
        color: "primary",
        category: "Competition"
    },
    {
        title: "Cyber Security Bootcamp",
        organization: "COEP, 2025",
        description: "Comprehensive training in cybersecurity fundamentals and practices",
        icon: "Award",
        color: "secondary",
        category: "Certification"
    },
    {
        title: "MongoDB University Certification",
        organization: "MongoDB, 2025",
        description: "Advanced database management and MongoDB development certification",
        icon: "Award",
        color: "primary",
        category: "Certification"
    }
];

// Seed Function
const seedDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await Project.deleteMany({});
        await Experience.deleteMany({});
        await Education.deleteMany({});
        await Skill.deleteMany({});
        await Achievement.deleteMany({});
        await Admin.deleteMany({}); // Clear existing admins
        console.log('Cleared existing data');

        // Insert new data
        await Project.insertMany(projects);
        await Experience.insertMany(experiences);
        await Education.insertMany(education);
        await Skill.insertMany(skills);
        await Achievement.insertMany(achievements);

        // Create Default Admin
        const admin = new Admin({
            username: 'admin',
            password: 'password123'
        });
        await admin.save();
        console.log('Default Admin Created: admin / password123');

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
