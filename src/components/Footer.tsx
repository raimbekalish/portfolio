import { Github, Linkedin, Mail, FileText } from "lucide-react";

interface FooterProps {
  name: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

export default function Footer({ name, email, githubUrl, linkedinUrl, resumeUrl }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-10 sm:py-12 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-dark-50">{name}</p>
            <p className="text-xs text-dark-300 mt-0.5">Software Engineer & AI Developer</p>
          </div>

          <div className="flex items-center gap-4">
            <a href={`mailto:${email}`} className="text-dark-300 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-dark-300 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-dark-300 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-dark-300 hover:text-white transition-colors" aria-label="Resume">
              <FileText className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-dark-400">
            © {year} {name}
          </p>
        </div>
      </div>
    </footer>
  );
}
