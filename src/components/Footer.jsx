import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-4 px-4 bg-card relative border-t border-border">
      <div className="container mx-auto flex items-center justify-center relative">
        <p className="text-sm text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Shivam.dev. All rights reserved.
        </p>

        <a
          href="#hero"
          className="absolute right-0 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};