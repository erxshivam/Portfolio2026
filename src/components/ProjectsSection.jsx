import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "My Portfolio Website",
    description: "A modern and responsive personal portfolio website built using React and Bootstrap. It showcases my technical skills, projects, education, and achievements through an interactive and user-friendly interface. The website features smooth navigation, responsive design, and optimized performance to provide a seamless experience across all devices.",
    image: "/projects/ppp1.png",
    tags: ["React", "Bootstrap", "JavaScript"],
    demoUrl: "https://erxshivam.vercel.app/",
    githubUrl: "https://github.com/erxshivam/Portfolio2026",
  },
  {
    id: 2,
    title: "Exam Management System",
    description:
      "A full-stack MERN application designed to streamline the examination process for students and administrators. It includes features such as student registration, exam creation, question management, online test submission, result generation, and performance tracking. The platform ensures secure authentication and efficient exam management through a centralized dashboard.",
    image: "/projects/ppp2.jpeg",
    tags: ["React", "Node.js", "Express","MongoDB"],
    demoUrl: "https://erxshivam-examprep.vercel.app/",
    githubUrl: "https://github.com/erxshivam/ExamPrep",
  },
  {
  id: 3,
  title: "MockVerse AI",
  description:
  "A full-stack AI-powered interview preparation platform built with the MERN stack, featuring voice-based mock interviews, AI-generated questions, ATS score analysis, interview history tracking, performance analytics, and personalized AI feedback to help users improve their interview skills and job readiness.",
  image: "/projects/ppp3.png",
  tags: ["React", "Node.js", "Express.js", "MongoDB", "AI", "Tailwind CSS"],
  demoUrl: "https://mockverse-ai.vercel.app",
  githubUrl: "https://github.com/erxshivam/mockverse-ai",
},
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Projects <span className="text-primary"> Works </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Real-world coding projects built with the MERN stack and modern frontend tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
  <span
    key={`${tag}-${index}`}
    className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
  >
    {tag}
  </span>
))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/erxshivam"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
