const profileData = {
    name: "Prem Nikam",
    title: "Computer Engineering Student | MERN Stack Developer",
    bio: "I'm Prem Nikam, a Computer Engineering student passionate about Full Stack Development and Artificial Intelligence. I enjoy building modern web applications using the MERN stack, solving real-world problems through technology, and continuously improving my skills through projects, hackathons, and learning.",
    location: "Pune, Maharashtra, India",
    resume: "/resume/Prem_Nikam_Resume.pdf",
    image: "/images/profile/image.png",
};

const projectsData = [
    {
        projectName: "Airbnb Clone",
        description: "A full-stack Airbnb clone with authentication, property listings, image uploads, reviews, and CRUD functionality.",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "Node.js",
            "Express.js",
            "MongoDB",
            "EJS"
        ],
        githubLink: "https://github.com/prem1006j/airbnb-clone",
        liveLink: "",
        image: "/images/projects/Airbnb.png",
        featured: true,
        category: "Full Stack",
    },

    {
        projectName: "Simon Says Game",
        description: "A browser-based memory game developed using HTML, CSS, and JavaScript.",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        githubLink: "https://github.com/prem1006j/Simon-Says-Game",
        liveLink: "",
        image: "/images/projects/simon_Says.png",
        featured: false,
        category: "Frontend",
    },

    {
        projectName: "Movie Recommendation System",
        description: "A recommendation system that suggests movies based on user preferences using Machine Learning concepts.",
        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-Learn"
        ],
        githubLink: "",
        liveLink: "",
        image: "/images/projects/movie_recomendation.png",
        featured: true,
        category: "AI / ML",
    },

    {
        projectName: "MY-E-Village",
        description: "A Django-based web application developed during internship for digital village management.",
        technologies: [
            "Python",
            "Django",
            "Bootstrap",
            "MySQL"
        ],
        githubLink: "",
        liveLink: "",
        image: "/images/projects/My-e-village.png",
        featured: true,
        category: "Web Application",
    }
];

const skillsData = [
    {
        category: "Programming Languages",
        skills: [
            "C",
            "C++",
            "Java",
            "JavaScript",
            "Python"
        ]
    },

    {
        category: "Frontend",
        skills: [
            "HTML",
            "CSS",
            "Bootstrap",
            "React"
        ]
    },

    {
        category: "Backend",
        skills: [
            "Node.js",
            "Express.js",
            "Django"
        ]
    },

    {
        category: "Database",
        skills: [
            "MongoDB",
            "MySQL",
            "SQL"
        ]
    },

    {
        category: "Tools",
        skills: [
            "Git",
            "GitHub",
            "VS Code",
            "Hoppscotch"
        ]
    },

];

const experiencesData = [
    {
        companyName: "Elite Software",
        role: "Python Web Development Intern",
        location: "Pune, Maharashtra",
        employmentType: "Internship",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-06-30"),
        currentlyWorking: false,
        description: [
            "Developed web applications using Python and Django.",
            "Worked with Bootstrap for responsive UI.",
            "Integrated MySQL database.",
            "Collaborated with the development team."
        ],
        technologies: [
            "Python",
            "Django",
            "Bootstrap",
            "MySQL"
        ]
    }
];

const educationData = [
    {
        institution: "Genba Sopanrao Moze College of Engineering",
        degree: "Bachelor of Engineering",
        fieldOfStudy: "Computer Engineering",
        startYear: 2023,
        endYear: 2027,
        grade: "CGPA: 7.67",
        location: "Pune, Maharashtra",
        description: [
            "Currently pursuing Computer Engineering.",
            "Working on Full Stack Development and AI projects.",
            "Actively participating in hackathons and technical events."
        ]
    },

    {
        institution: "Jagruti Junior College",
        degree: "Higher Secondary Certificate (HSC)",
        fieldOfStudy: "Science",
        startYear: 2021,
        endYear: 2023,
        grade: "",
        location: "Maharashtra"
    },

    {
        institution: "Sarvoday Vivek Jeevan Vidya Public School",
        degree: "Secondary School Certificate (SSC)",
        fieldOfStudy: "General Education",
        startYear: 2011,
        endYear: 2021,
        grade: "",
        location: "Maharashtra"
    }
];

const contactsData = [
    {
        name: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        subject: "Freelance Opportunity",
        message: "Hi Prem, I really liked your portfolio. Let's discuss a web development project."
    },

];

module.exports = {
    profileData,
    projectsData,
    skillsData,
    experiencesData,
    educationData,
    contactsData,
};