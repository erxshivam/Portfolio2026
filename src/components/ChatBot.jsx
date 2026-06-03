import React, { useState, useEffect, useRef } from 'react';

// --- KNOWLEDGE BASE & CONTEXT DATA ---
const contextData = {
  mockverse: {
    technologies: "MockVerse AI is powered by the MERN stack (React.js, Node.js, Express.js, MongoDB) along with specialized AI integrations for resume parsing and dynamic question generation.",
    features: "Key features include real-time voice-based mock interviews, ATS score analysis, a built-in resume builder, tailored AI-generated questions, interview history tracking, and personalized feedback.",
    challenges: "A key challenge was engineering the voice processing pipeline to feel conversational while accurately analyzing spoken responses for AI evaluation.",
    learnings: "Building this deepened my understanding of integrating third-party AI APIs, managing complex state in React, and building scalable backend architectures."
  },
  examprep: {
    technologies: "ExamPrep was built using React.js for the interface, Node.js/Express for the backend logic, and MongoDB to store user data, questions, and results.",
    features: "It features an MCQ-based examination engine, real-time secure timers, automated result generation, comprehensive performance tracking, and a secure admin dashboard.",
    challenges: "Ensuring state persistence during active exams (so users don't lose progress on page refresh) and handling timer synchronization were significant technical hurdles.",
    learnings: "I gained strong practical experience in session management, complex database aggregations, and building secure admin-only routes."
  },
  portfolio: {
    technologies: "This portfolio is built entirely with React.js and Tailwind CSS to ensure a lightweight, highly responsive, and modern user experience.",
    features: "It features a modern UI, dark theme aesthetics, smooth CSS animations, responsive design across all devices, and this custom interactive portfolio assistant."
  },
  softpro: {
    technologies: "During my time at Softpro India, I extensively utilized React.js, JavaScript, and Tailwind CSS.",
    responsibilities: "I was responsible for developing the frontend for several core projects, including the ExamPrep platform, the FoodCart application, and the frontend website for IIM Ayodhya."
  },
  codealpha: {
    technologies: "My virtual internship at CodeAlpha involved core web development technologies and JavaScript.",
    responsibilities: "I completed multiple structured development tasks, focusing on building responsive and interactive web components while adhering to best practices."
  }
};

const intents = [
  {
    category: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'start', 'howdy'],
    response: "Hello. I am the automated portfolio assistant for Shivam. I can provide details regarding his technical skills, project portfolio, professional experience, or help you get in touch. How may I assist you today?"
  },
  {
    category: 'about',
    keywords: ['about', 'who are you', 'tell me about yourself', 'background', 'introduce', 'introduction'],
    response: "Shivam is a software developer specializing in the MERN stack. He is a B.Tech Computer Science & Engineering student at Goel Institute of Technology and Management, graduating in 2026. Based in Lucknow, he is highly focused on Full Stack Web Development and is actively seeking opportunities as a Software Developer or MERN Stack Developer."
  },
  {
    category: 'hire',
    keywords: ['why should we hire', 'why hire', 'value', 'bring to the company', 'stand out'],
    response: "Shivam brings a strong foundation in modern web technologies (React, Node, MongoDB) combined with hands-on experience building complex, feature-rich applications like MockVerse AI and ExamPrep. He is a fast learner, deeply understands problem-solving through Data Structures and Algorithms, and has proven his ability to deliver production-ready code during his internships."
  },
  {
    category: 'strengths',
    keywords: ['strength', 'good at', 'best skills', 'superpower'],
    response: "Shivam's core strengths lie in Full Stack Web Development (MERN), writing clean and maintainable code, and his ability to independently architect solutions from the database schema up to the user interface. He is also highly adaptable and possesses strong logical problem-solving skills rooted in Java and DSA."
  },
  {
    category: 'roles',
    keywords: ['role', 'looking for', 'target', 'position', 'job', 'hire for'],
    response: "Shivam is actively targeting the following roles: MERN Stack Developer, Full Stack Developer, Software Developer, Associate Software Engineer, and Backend Developer."
  },
  {
    category: 'goals',
    keywords: ['goal', 'future plan', 'career path', 'where do you see', 'vision'],
    response: "Shivam's immediate goal is to contribute to a dynamic engineering team where he can build impactful software and refine his full-stack expertise. Long-term, he aims to architect large-scale systems and continuously adapt to emerging technologies in the software engineering landscape."
  },
  {
    category: 'skills',
    keywords: ['skill', 'technology', 'technologies', 'tech stack', 'framework', 'language', 'know', 'mern'],
    response: "Shivam has a comprehensive technical skillset:\n\n• Frontend: React.js, Tailwind CSS, JavaScript\n• Backend: Node.js, Express.js, REST APIs\n• Database: MongoDB\n• Core & Tools: Java, Data Structures & Algorithms, Git & GitHub"
  },
  {
    category: 'projects_general',
    keywords: ['project', 'portfolio', 'work', 'build', 'built', 'created'],
    response: "Shivam has developed several robust projects:\n\n1. MockVerse AI (Voice-based interview platform)\n2. ExamPrep (Examination engine with dashboard)\n3. Personal Portfolio (Modern web architecture)\n\nWhich project would you like to know more about?"
  },
  {
    category: 'project_mockverse',
    keywords: ['mockverse', 'mock verse', 'interview app', 'ai project', 'voice based'],
    context: 'mockverse',
    response: "MockVerse AI is a comprehensive platform designed to conduct voice-based mock interviews. It evaluates candidates through ATS score analysis, provides AI-generated questions tailored to their profile, and offers detailed, personalized feedback."
  },
  {
    category: 'project_examprep',
    keywords: ['examprep', 'exam prep', 'mcq', 'examination'],
    context: 'examprep',
    response: "ExamPrep is an MCQ-based examination platform. It features strict timer functionalities, auto-result generation, performance tracking, and a dedicated admin dashboard for test management."
  },
  {
    category: 'project_portfolio',
    keywords: ['this website', 'portfolio website', 'personal website'],
    context: 'portfolio',
    response: "This personal portfolio website was designed and developed entirely by Shivam to showcase his technical capabilities, featuring a modern, responsive UI and this custom-built smart assistant."
  },
  {
    category: 'experience_general',
    keywords: ['experience', 'intern', 'internship', 'job', 'work history', 'company'],
    response: "Shivam has acquired professional experience through two internships:\n\n• Softpro India (2 Months)\n• CodeAlpha (1 Month)\n\nWould you like to hear about his responsibilities at either of these organizations?"
  },
  {
    category: 'experience_softpro',
    keywords: ['softpro', 'soft pro', 'iim', 'foodcart'],
    context: 'softpro',
    response: "During his 2-month internship at Softpro India, Shivam contributed significantly to the frontend development of multiple applications, including the ExamPrep platform, FoodCart, and the frontend website for IIM Ayodhya."
  },
  {
    category: 'experience_codealpha',
    keywords: ['codealpha', 'code alpha', 'virtual intern'],
    context: 'codealpha',
    response: "Shivam completed a 1-month virtual internship at CodeAlpha, where he focused on core web development practices and honed his JavaScript fundamentals."
  },
  {
    category: 'contact',
    keywords: ['contact', 'email', 'reach', 'github', 'linkedin', 'phone', 'connect', 'message'],
    response: "You can reach out to Shivam via the following channels:\n\n• Email: erxshivam@gmail.com\n• LinkedIn: linkedin.com/in/erxshivam\n• GitHub: github.com/erxshivam"
  },
  {
    category: 'resume',
    keywords: ['resume', 'cv', 'download', 'document'],
    response: "Shivam's resume highlights his B.Tech education, proficiency in the MERN stack and Java, his projects like MockVerse AI, and his internship experiences. You can download the full PDF version directly from the main navigation menu of this portfolio."
  }
];

const fallbackResponse = "I apologize, but I don't have specific information regarding that query. I can provide details about Shivam's 'skills', 'projects', 'internships', or 'contact information'. Please let me know what you would like to explore.";

// --- ICONS ---
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- MAIN COMPONENT ---
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null); // For context awareness
  const messagesEndRef = useRef(null);

  const quickReplies = ['About Me', 'Skills', 'Projects', 'Experience', 'Contact', 'Resume'];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { 
            id: Date.now(), 
            type: 'bot', 
            text: "Hello. I am the automated portfolio assistant for Shivam. I can provide details regarding his technical skills, project portfolio, professional experience, or help you get in touch. How may I assist you today?" 
          }
        ]);
        setIsTyping(false);
      }, 700);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processInput = (text) => {
    const input = text.toLowerCase().trim();

    // 1. Check for Contextual Follow-up Questions
    if (currentTopic && contextData[currentTopic]) {
      const isTechQuestion = ['tech', 'technologies', 'stack', 'built', 'used', 'language'].some(k => input.includes(k));
      const isFeatureQuestion = ['feature', 'do', 'about', 'function'].some(k => input.includes(k));
      const isChallengeQuestion = ['challenge', 'hard', 'difficult', 'hurdle'].some(k => input.includes(k));
      const isLearningQuestion = ['learn', 'takeaway', 'gain'].some(k => input.includes(k));
      const isResponsibilityQuestion = ['responsibility', 'role', 'did', 'work'].some(k => input.includes(k));

      if (isTechQuestion && contextData[currentTopic].technologies) return contextData[currentTopic].technologies;
      if (isFeatureQuestion && contextData[currentTopic].features) return contextData[currentTopic].features;
      if (isChallengeQuestion && contextData[currentTopic].challenges) return contextData[currentTopic].challenges;
      if (isLearningQuestion && contextData[currentTopic].learnings) return contextData[currentTopic].learnings;
      if (isResponsibilityQuestion && contextData[currentTopic].responsibilities) return contextData[currentTopic].responsibilities;
    }

    // 2. Standard Intent Matching
    for (const intent of intents) {
      // Use word boundaries for more accurate matching where possible, or fallback to simple includes
      if (intent.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(input) || input.includes(keyword);
      })) {
        
        // Update context if the matched intent has one
        if (intent.context) {
          setCurrentTopic(intent.context);
        } else if (['skills', 'contact', 'resume', 'about', 'greeting'].includes(intent.category)) {
          // Clear context on general topic shifts to prevent weird follow-ups
          setCurrentTopic(null);
        }

        return intent.response;
      }
    }

    return fallbackResponse;
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    // Prevent identical consecutive messages from quick replies
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === 'user' && lastMessage.text === text.trim()) {
      setInputValue('');
      return;
    }

    const userMsg = { id: Date.now(), type: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const responseText = processInput(text);
    
    // Dynamic typing delay based on response length (min 600ms, max 1500ms)
    const delay = Math.min(Math.max(responseText.length * 10, 600), 1500);

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, type: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* CHAT WINDOW */}
      <div 
        className={`mb-4 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-700 bg-[#0f1115] shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-4 absolute'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-800 to-purple-600 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <BotIcon />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold tracking-wide">Portfolio Assistant</h3>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="Close Chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex h-[360px] flex-col overflow-y-auto p-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.type === 'user' 
                    ? 'rounded-2xl rounded-tr-sm bg-purple-600 text-white' 
                    : 'rounded-2xl rounded-tl-sm bg-[#1a1d24] text-gray-200 border border-gray-700/50'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="mb-4 flex justify-start">
              <div className="flex max-w-[80%] items-center gap-1.5 rounded-2xl rounded-tl-sm border border-gray-700/50 bg-[#1a1d24] px-4 py-3.5 shadow-sm">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400/80" style={{ animationDelay: '0ms' }}></div>
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400/80" style={{ animationDelay: '150ms' }}></div>
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400/80" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 overflow-x-auto border-t border-gray-800 bg-[#0f1115] px-4 py-3 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              disabled={isTyping}
              className="flex-shrink-0 rounded-full border border-gray-600 bg-[#1a1d24] px-3.5 py-1.5 text-[13px] text-gray-300 transition-all hover:border-purple-500 hover:bg-purple-900/20 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 bg-[#0f1115] p-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="w-full rounded-full border border-gray-700 bg-[#1a1d24] py-2.5 pl-4 pr-12 text-[14px] text-white placeholder-gray-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white transition-all hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-400"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-900/40 transition-transform duration-300 hover:scale-110 hover:bg-purple-500 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/30"
        aria-label="Toggle chat"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-0 absolute' : 'rotate-0 scale-100'}`}>
          <BotIcon />
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0 absolute'}`}>
          <CloseIcon />
        </div>
      </button>
      
    </div>
  );
}