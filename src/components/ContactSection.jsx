import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
  const response = await fetch(
    "https://portfolio-backend-a0n7.onrender.com/api/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

      const data = await response.json();

      toast({
        title: "Message sent!",
        description: data.message,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Something went wrong!",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          If you'd like to discuss a project, opportunity or just talk tech -
          feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h4 className="font-medium">Email</h4>

                  <a
                    href="mailto:erxshivam@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    erxshivam@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h4 className="font-medium">Phone</h4>

                  <a
                    href="tel:+919335125214"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 9335125214
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h4 className="font-medium">Location</h4>

                  <a
                    href="https://www.google.com/maps/place/Lucknow,+Uttar+Pradesh/"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Lucknow, Uttar Pradesh
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>

              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/erxshivam/"
                  target="_blank"
                >
                  <Linkedin />
                </a>

                <a href="https://x.com/erxshivam" target="_blank">
                  <Twitter />
                </a>

                <a
                  href="https://www.instagram.com/erxshivam/?hl=en"
                  target="_blank"
                >
                  <Instagram />
                </a>

                <a href="https://github.com/erxshivam" target="_blank">
                  <Github />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">
              Send a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background"
                  placeholder="Shivam..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background"
                  placeholder="erxshivam@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}

                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};