import {
  SpringBootIcon,
  ExpressIcon,
  MongoIcon,
  ReactIcon,
  TailwindIcon,
  DockerIcon,
  StripeIcon,
} from "../icons/SvgIcons";

export const PROJECT_DATA = [
  {
    id: 1,
    title: "EvoTickets",
    description:
      "A web platform for buying and selling tickets and managing events. Users can explore and purchase tickets, while organizers manage events and sales.",
    imageUrl: "/images/evotickets.png",
    projectUrl: "https://evotickets.es",
    githubUrl: "https://github.com/Whxismou1/EvoTickets",
    techStack: [
      { icon: <ReactIcon />, name: "React" },
      { icon: <TailwindIcon />, name: "TailwindCSS" },
      { icon: <SpringBootIcon key="spring" />, name: "Spring Boot" },
      { icon: <DockerIcon />, name: "Docker" },
    ],
  },
  {
    id: 2,
    title: "SpendSmart",
    description:
      "A personal finance management app in development. It allows you to track income and expenses, categorize transactions, and gain better control of your money.",
    imageUrl: "/images/spendSmart.png",
    projectUrl: "https://spendsmart-frontend.vercel.app/",
    githubUrl: "https://github.com/Whxismou1/SpendSmart",
    techStack: [
      { icon: <ReactIcon />, name: "React" },
      { icon: <ExpressIcon />, name: "ExpressJS" },
      { icon: <MongoIcon />, name: "MongoDB" },
    ],
  },
  {
    id: 3,
    title: "FlickFusion",
    description:
      "A web app for registering, buying movies, and accessing movie information. Features email and Google authentication, profile management, and online payments. Built with Express.js, MongoDB, Stripe, and various frontend and backend technologies.",
    imageUrl: "/images/FlickFusion.png",
    projectUrl: "https://flickfusion-express-js-movie-portal.onrender.com",
    githubUrl: "https://github.com/Whxismou1/FlickFusion-Movie-Portal",
    techStack: [
      { icon: <ExpressIcon />, name: "ExpressJS" },
      { icon: <MongoIcon />, name: "MongoDB" },
      { icon: <StripeIcon />, name: "Stripe" },
    ],
  },
  
];
