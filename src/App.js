import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Heart, 
  AlertTriangle, 
  BookOpen, 
  Download, 
  Menu, 
  X, 
  PhoneCall, 
  Users, 
  Info,
  ChevronRight,
  MapPin,
  Trash2,
  Syringe,
  Activity,
  Zap,
  CheckCircle,
  Sun,
  Moon
} from 'lucide-react';

// --- Data extracted from the provided document ---

const AGGRESSION_TYPES = [
  {
    title: "Territorial Aggression",
    icon: <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    desc: "Dogs mark territories. Intruders (people or other dogs) may trigger defense. Watch for dogs urinating on vehicles.",
    solution: "Wash marked tires. Use tyre baths with diluted KMnO4 at entry points."
  },
  {
    title: "Fear Aggression",
    icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    desc: "Occurs when dogs are startled, threatened, or approached too quickly. Stick-wielding can provoke them.",
    solution: "Don't stare. Don't use sticks to scare. Move slowly and chatter to announce presence."
  },
  {
    title: "Maternal Aggression",
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    desc: "Nursing mothers are extremely protective of puppies. They may attack if you get too close.",
    solution: "Stay away from nursing mothers and their litters. Respect their space."
  },
  {
    title: "Food Aggression",
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    desc: "Dogs are irritable when hungry or eating. Open food carrying can make you a target.",
    solution: "Never disturb a feeding dog. Avoid carrying food openly in hand."
  },
  {
    title: "Predatory Chase",
    icon: <Zap className="w-6 h-6 text-indigo-500" />,
    desc: "Running triggers a dog's natural chase instinct. Panic creates a dangerous cycle.",
    solution: "Stop running. Stand still or walk calmly. 'Be boring' to the dog."
  },
  {
    title: "Disease (Rabies)",
    icon: <Syringe className="w-6 h-6 text-red-600" />,
    desc: "Blank look, drooling, dropped jaw. Unprovoked attacks on inanimate objects.",
    solution: "Stay away immediately. Call the municipality or our Helpline. Do not touch."
  }
];

const GUIDELINES = [
  {
    category: "For Residents",
    points: [
      "Cooperate with ABC (Animal Birth Control) dog catchers.",
      "Do not feed stray dogs at random spots; use designated areas.",
      "Segregate waste. Do not throw food leftovers in open drains.",
      "Check under your car before starting; dogs often sleep there.",
      "Avoid running in areas with known dog packs."
    ]
  },
  {
    category: "For Communities (RWAs)",
    points: [
      "Designate feeding spots away from play areas and senior zones.",
      "Fix feeding times (e.g., 8-9 AM, 5-6 PM) to reduce loitering.",
      "Install dog-proof dustbins to prevent scavenging.",
      "Ensure proper street lighting in dark corners.",
      "Display Dog Helpline numbers prominently."
    ]
  }
];

const LEGAL_FACTS = [
  "Relocating stray dogs is illegal under Supreme Court directives.",
  "Sterilized dogs must be returned to their original territory.",
  "Feeding animals is a compassionate gesture protected by law, but must be done responsibly.",
  "Cruelty (beating, kicking, starving) is a punishable offense under the PCA Act, 1960."
];

// --- Components ---

const Button = ({ children, primary = false, className = "", ...props }) => (
  <button 
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
      primary 
        ? "bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 border border-transparent" 
        : "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50 hover:text-stone-900 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-600 dark:hover:bg-stone-700"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const SectionHeading = ({ children, subtitle, darkBg = false }) => (
  <div className="mb-12 text-center relative z-10">
    <h2 className={`text-3xl md:text-5xl font-bold mb-4 font-serif tracking-tight ${darkBg ? 'text-stone-50' : 'text-stone-800 dark:text-stone-100'}`}>
      {children}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl mx-auto font-light ${darkBg ? 'text-emerald-100' : 'text-stone-600 dark:text-stone-400'}`}>{subtitle}</p>}
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50 dark:bg-stone-800/80 dark:border-stone-700 dark:shadow-none backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 group">
    <div className="mb-4 p-3 bg-stone-100 dark:bg-stone-700 rounded-xl w-fit group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
      {React.cloneElement(icon, { className: "w-8 h-8 text-stone-600 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" })}
    </div>
    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{title}</h3>
    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{desc}</p>
  </div>
);

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "The Issue", href: "#issue" },
    { name: "App Features", href: "#features" },
    { name: "Behavior Guide", href: "#behavior" },
    { name: "Community", href: "#community" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-700 dark:text-emerald-500" />
            <span className="text-2xl font-bold text-stone-800 dark:text-stone-100 tracking-tight font-serif">SafeStreet</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400 transition-colors text-sm font-medium">
                  {link.name}
                </a>
              ))}
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <Button primary className="py-2 px-4 text-sm shadow-none">Download App</Button>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
            >
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 animate-in slide-in-from-top-5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-600 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 px-3">
              <Button primary className="w-full justify-center">Download App</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Main Page ---

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-200 font-sans transition-colors duration-300 selection:bg-emerald-500/30">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background decorations - Earthy blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/10 dark:bg-emerald-800/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-600/10 rounded-full blur-[100px] -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-center lg:text-left z-10">
                <div className="inline-flex items-center space-x-2 bg-white dark:bg-stone-800/50 rounded-full px-4 py-1.5 border border-stone-200 dark:border-stone-700 mb-8 backdrop-blur-sm shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-sm font-medium text-stone-600 dark:text-emerald-300">New: AI Dog Behavior Scanner</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-800 dark:text-stone-100 mb-6 leading-tight font-serif">
                  Coexist with <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
                    Nature & Neighbors
                  </span>
                </h1>
                <p className="mt-4 text-xl text-stone-600 dark:text-stone-400 mb-10 leading-relaxed font-light">
                  Building a community where humans and dogs live in harmony. 
                  Safety, compassion, and understanding—all in one app.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button primary>
                    <Download className="w-5 h-5" /> Get SafeStreet App
                  </Button>
                  <Button>
                    <BookOpen className="w-5 h-5" /> Read Guidelines
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-stone-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                   <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Dog and Human High Five" 
                    className="w-full h-auto object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent flex items-end p-8">
                      <div className="text-white">
                        <p className="font-bold text-lg font-serif">"Dogs are considered human's best friend."</p>
                        <p className="text-sm opacity-90 font-light">- From the Guidelines</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Mock App Interface - Floating below */}
            <div className="mt-20 relative mx-auto max-w-4xl transform hover:translate-y-[-5px] transition-transform duration-500">
              <div className="relative rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
                  <div className="flex-1 space-y-4 w-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                          <div className="flex items-center gap-3 mb-2">
                              <AlertTriangle className="text-amber-500 w-5 h-5"/>
                              <span className="text-stone-800 dark:text-stone-100 font-bold">Territorial Warning</span>
                          </div>
                          <p className="text-sm text-stone-600 dark:text-stone-400">High activity reported in Sector 4. Proceed with caution.</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700 opacity-60">
                         <div className="h-2 w-1/3 bg-stone-300 dark:bg-stone-600 rounded mb-2"></div>
                         <div className="h-2 w-2/3 bg-stone-200 dark:bg-stone-600 rounded"></div>
                      </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2 font-serif">Real-time Safety Alerts</h3>
                      <p className="text-stone-600 dark:text-stone-400">Get notified about breeding seasons, aggressive packs, or vaccination drives in your gated community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Issue Section */}
        <section id="issue" className="py-20 bg-stone-100 dark:bg-stone-900/50 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Understanding the root cause is the first step to solution.">
              Why Conflict Happens
            </SectionHeading>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Users />}
                title="Misunderstanding Behavior"
                desc="Many conflicts arise because humans misinterpret a dog's fear or hunger as aggression. Running or using sticks often triggers attacks."
              />
              <FeatureCard 
                icon={<Trash2 />}
                title="Improper Waste Disposal"
                desc="Open garbage dumps attract stray dogs. Abundant food leads to higher reproduction rates and larger packs in residential areas."
              />
              <FeatureCard 
                icon={<Info />}
                title="Lack of Awareness"
                desc="Residents often don't know the legal framework (ABC Rules 2023) or the difference between a pet, a stray, and a feral dog."
              />
            </div>
          </div>
        </section>

        {/* Behavior Guide Section (Interactive) */}
        <section id="behavior" className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Dogs don't bite without reason. Learn to read the signs.">
              Decoding Canine Aggression
            </SectionHeading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGGRESSION_TYPES.map((item, index) => (
                <div key={index} className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-lg dark:shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg shadow-inner">{item.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-2">{item.title}</h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 min-h-[60px]">{item.desc}</p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">How to handle</p>
                    <p className="text-stone-700 dark:text-stone-300 text-sm">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Features Showcase with Image */}
        <section id="features" className="py-24 relative overflow-hidden bg-white dark:bg-stone-900 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mb-6 font-serif">
                  Technology for <br/>
                  <span className="text-emerald-700 dark:text-emerald-500">Safer Communities</span>
                </h2>
                <p className="text-stone-600 dark:text-stone-400 text-lg mb-8">
                  The SafeStreet app connects residents, security guards, and animal welfare organizations to manage the ecosystem effectively.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-500/20 transition-colors">
                      <PhoneCall className="w-6 h-6 text-red-600 dark:text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 dark:text-stone-100 font-bold text-lg">SOS Helpline Button</h4>
                      <p className="text-stone-600 dark:text-stone-400">One-touch reporting for dog bites or aggressive packs. Alerts nearby security and the designated "Colony Caretaker".</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/20 transition-colors">
                      <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 dark:text-stone-100 font-bold text-lg">Designated Feeding Maps</h4>
                      <p className="text-stone-600 dark:text-stone-400">Locate approved feeding spots away from play areas. Coordinate feeding times to prevent conflict.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-500/20 transition-colors">
                      <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-stone-800 dark:text-stone-100 font-bold text-lg">ABC Program Tracker</h4>
                      <p className="text-stone-600 dark:text-stone-400">Track sterilization status of community dogs. Help dog catchers identify unsterilized dogs.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-100 dark:border-stone-800">
                  <img 
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1000" 
                    alt="Community Discussion" 
                    className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Floating Legal Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl p-6 shadow-lg border border-stone-200 dark:border-stone-700">
                     <div className="flex items-center gap-2 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2">
                        <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-500"/>
                        <span className="text-sm font-bold text-stone-800 dark:text-stone-100">Legal Quick-Check</span>
                     </div>
                     <ul className="space-y-2">
                        {LEGAL_FACTS.slice(0, 3).map((fact, i) => (
                          <li key={i} className="flex gap-2 text-xs text-stone-700 dark:text-stone-300">
                            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                            {fact}
                          </li>
                        ))}
                     </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Guidelines with Parallax Background */}
        <section id="community" className="py-20 relative bg-stone-900">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1558929996-da64ba858215?auto=format&fit=crop&q=80&w=1500" 
               alt="Park Background" 
               className="w-full h-full object-cover opacity-30 grayscale"
             />
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <SectionHeading subtitle="Actionable steps for a peaceful environment." darkBg={true}>
              Community Guidelines
             </SectionHeading>

             <div className="grid md:grid-cols-2 gap-8">
               {GUIDELINES.map((section, idx) => (
                 <div key={idx} className="bg-stone-900/40 rounded-3xl p-8 border border-white/10 backdrop-blur-md hover:bg-stone-900/60 transition-colors">
                   <h3 className="text-2xl font-bold text-stone-100 mb-6 border-l-4 border-emerald-500 pl-4">{section.category}</h3>
                   <ul className="space-y-4">
                     {section.points.map((point, i) => (
                       <li key={i} className="flex items-start gap-3">
                         <ChevronRight className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                         <span className="text-stone-300">{point}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>

             {/* Call to Action Banner */}
             <div className="mt-16 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-emerald-800/50">
                <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-12">
                   <Users className="w-64 h-64 text-emerald-100" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 relative z-10 font-serif">Start a SafeStreet Chapter</h3>
                <p className="text-emerald-100 max-w-2xl mx-auto mb-8 relative z-10 font-light">
                  Empower your Gated Community or University with the tools to manage dog-human conflict scientifically and humanely.
                </p>
                <div className="relative z-10">
                  <Button className="bg-white text-emerald-900 hover:bg-emerald-50 border-none shadow-xl font-bold">
                    Register Your Community
                  </Button>
                </div>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-900 py-12 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
                  <span className="text-xl font-bold text-stone-800 dark:text-stone-100 font-serif">SafeStreet</span>
                </div>
                <p className="text-stone-600 dark:text-stone-500 max-w-sm">
                  Bridging the gap between humans and dogs. Based on the guidelines for Prevention and Management of Dog-Human Conflicts.
                </p>
              </div>
              <div>
                <h4 className="text-stone-800 dark:text-stone-100 font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-stone-600 dark:text-stone-500 text-sm">
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">ABC Rules 2023</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">AWBI Website</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Emergency Contacts</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Legal Rights</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-stone-800 dark:text-stone-100 font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-stone-600 dark:text-stone-500 text-sm">
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">About Us</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Careers</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-900 flex flex-col md:flex-row justify-between items-center text-stone-500 text-sm">
              <p>&copy; 2024 Pawsitive Coexistence. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                 <a href="#" className="hover:text-stone-900 dark:hover:text-stone-400">Twitter</a>
                 <a href="#" className="hover:text-stone-900 dark:hover:text-stone-400">LinkedIn</a>
                 <a href="#" className="hover:text-stone-900 dark:hover:text-stone-400">Instagram</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}