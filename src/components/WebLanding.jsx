import React, { useState, useEffect } from 'react';
import { Download, Gamepad2, Users, Star, Smartphone, Image as ImageIcon, Layout, Code, Video, MessageCircle, Send, ShieldCheck, Mail, Lock, ChevronRight, CheckCircle2, Upload, Loader2, Target, Zap, Award, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

const parseMediaMetadata = (public_id) => {
  const titleMatch = public_id.match(/__TITLE__([a-zA-Z0-9_]+)/);
  const title = titleMatch ? titleMatch[1].replace(/_/g, ' ') : '';
  const urlMatch = public_id.match(/__URL__([a-zA-Z0-9_PCT:/.-]+)/);
  let link = urlMatch ? decodeURIComponent(urlMatch[1].replace(/PCT/g, '%')) : null;
  if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
    link = 'https://' + link;
  }
  const isLinkOnly = public_id.includes('__LINKONLY__');
  return { title, link, isLinkOnly };
};

import { PORTFOLIO_CATEGORIES } from '../portfolioConfig';

export default function WebLanding({ onPlayWeb }) {
  const [activeTab, setActiveTab] = useState('home');
    const [dynamicServices, setDynamicServices] = useState([]);
  const [dynamicContacts, setDynamicContacts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchDynamicData = async () => {
    try {
      const res = await fetch('/api/get-pricing');
      if (res.ok) {
        const data = await res.json();
        setDynamicServices(data.services || []);
        setDynamicContacts(data.contacts || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={handleTabChange} />;
      case 'services':
        return <ServicesTab services={dynamicServices} loading={loadingData} />;
      case 'portfolio':
        return <PortfolioTab />;
      case 'games':
        return <GamesTab onPlayWeb={onPlayWeb} />;
      case 'admin':
        return <AdminTab onDataChange={fetchDynamicData} services={dynamicServices} contacts={dynamicContacts} />;
      case 'contact':
        return <ContactTab contacts={dynamicContacts} />;
      default:
        return <HomeTab onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Background Effects */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8A2BE2] rounded-full filter blur-[200px] pointer-events-none z-0"></motion.div>
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00E5FF] rounded-full filter blur-[200px] pointer-events-none z-0"></motion.div>
      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="fixed top-[40%] left-[40%] w-[600px] h-[600px] bg-[#FF00FF] rounded-full filter blur-[250px] pointer-events-none z-0"></motion.div>

      {/* Navbar */}
      <nav className="w-full border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('home')}>
            <div className="flex items-center gap-2">
              <img src="/logo.jpg" alt="Creovate Studio" className="h-8 w-8 object-cover rounded-md" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase leading-none">Creovate <span className="text-[#8A2BE2]">Studio</span></h1>
              <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase">Creative Agency</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 text-xs md:text-sm font-bold tracking-widest uppercase">
            {['home', 'services', 'portfolio', 'games', 'contact'].map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`transition-colors py-2 px-3 rounded-lg ${activeTab === tab ? 'text-[#8A2BE2] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {tab.replace('games', 'our games')}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex-1 flex flex-col"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black/80 py-8 text-center relative z-10 mt-auto">
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-1">Quick Access</p>
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={() => handleTabChange('admin')} 
              className="text-gray-400 hover:text-[#00E5FF] text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Admin Portal
            </button>
            <a 
              href="https://instagram.com/creov.atestudio" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-400 hover:text-[#8A2BE2] text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
        <p className="text-gray-600 text-[10px] font-bold tracking-widest uppercase border-t border-white/5 pt-6 max-w-md mx-auto">
          &copy; {new Date().getFullYear()} Creovate Studio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// --- TAB COMPONENTS ---

function getIconComponent(iconName) {
  if (iconName && iconName.startsWith('http')) {
    return <img src={iconName} alt="Service" className="w-16 h-16 object-cover rounded-xl shadow-lg border border-white/10" />;
  }
  switch (iconName) {
    case 'ImageIcon': return <ImageIcon size={40} />;
    case 'Layout': return <Layout size={40} />;
    case 'Code': return <Code size={40} />;
    case 'Video': return <Video size={40} />;
    default: return <Star size={40} />;
  }
}

function HomeTab({ onNavigate }) {
  return (
    <div className="flex flex-col flex-1 pt-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 text-left"
        >
          <h2 className="text-[#8A2BE2] text-3xl font-black italic tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]">
            Welcome to
          </h2>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-2 leading-tight text-white drop-shadow-xl">
            Creovate<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF]">Studio</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] rounded-full mb-8"></div>
          
          <p className="text-2xl text-gray-300 font-bold mb-6">
            Creative Ideas. <span className="text-[#00E5FF]">Visual Reality.</span>
          </p>
          <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
            We help businesses, brands and creators stand out with stunning designs, powerful websites, and <span className="text-[#00E5FF] font-bold">pro-level video editing</span>. Turning imagination into reality.
          </p>
          
          <div className="flex items-center gap-6 text-sm font-black tracking-widest uppercase text-gray-400 mb-10 flex-wrap">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8A2BE2]"></div> DESIGN</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div> WEB</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF00FF]"></div> EDITING</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> VFX</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => onNavigate('portfolio')} className="bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,87,34,0.3)]">
              View Our Work
            </button>
            <button onClick={() => onNavigate('services')} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              Our Services
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 flex justify-center items-center relative hidden md:flex"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#00E5FF] filter blur-[100px] opacity-20 rounded-full animate-pulse-slow"></div>
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <img src="/creovate_poster.png" alt="Creovate Poster" className="w-full max-w-sm rounded-3xl object-cover shadow-2xl drop-shadow-[0_0_40px_rgba(138,43,226,0.5)] border border-white/10" />
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full bg-[#0A0D14] rounded-3xl p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF] rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
        <h2 className="text-3xl font-black uppercase tracking-widest mb-12 text-center">Why <span className="text-[#00E5FF]">Choose Us?</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-[#8A2BE2]/10 rounded-2xl mb-6"><Target className="text-[#8A2BE2]" size={32} /></div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-3">Goal Oriented</h3>
            <p className="text-gray-400 text-sm">We design with purpose. Every thumbnail, poster, and website is crafted to maximize engagement and conversions.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-[#00E5FF]/10 rounded-2xl mb-6"><Zap className="text-[#00E5FF]" size={32} /></div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-3">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Strict deadlines? No problem. We deliver premium quality assets with industry-leading turnaround times.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-green-400/10 rounded-2xl mb-6"><Award className="text-green-400" size={32} /></div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-3">Premium Quality</h3>
            <p className="text-gray-400 text-sm">Our modern designs and AI-powered workflows ensure you always stay one step ahead of the competition.</p>
          </div>
        </div>
      </div>

      {/* NEW: Our Process Section */}
      <div className="w-full bg-[#05070A] rounded-3xl p-10 border border-white/5 relative overflow-hidden mt-12">
        <h2 className="text-3xl font-black uppercase tracking-widest mb-12 text-center">How We <span className="text-[#8A2BE2]">Work</span></h2>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 relative z-10">
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#8A2BE2]/20 flex items-center justify-center text-2xl font-black text-[#8A2BE2] mb-4">1</div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Discuss</h3>
            <p className="text-gray-400 text-sm">We understand your brand, goals, and vision.</p>
          </div>
          <div className="hidden md:block w-16 h-[2px] bg-white/10 mt-8"></div>
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-2xl font-black text-[#00E5FF] mb-4">2</div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Create</h3>
            <p className="text-gray-400 text-sm">Our experts design and edit your custom assets.</p>
          </div>
          <div className="hidden md:block w-16 h-[2px] bg-white/10 mt-8"></div>
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF00FF]/20 flex items-center justify-center text-2xl font-black text-[#00E5FF] mb-4">3</div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Deliver</h3>
            <p className="text-gray-400 text-sm">You receive premium, ready-to-use visual content.</p>
          </div>
        </div>
      </div>

      {/* NEW: Stats Section */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="bg-[#0A0D14] border border-white/5 p-6 rounded-2xl text-center">
          <h4 className="text-4xl font-black text-white mb-2">50+</h4>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Clients</p>
        </div>
        <div className="bg-[#0A0D14] border border-white/5 p-6 rounded-2xl text-center">
          <h4 className="text-4xl font-black text-[#00E5FF] mb-2">100%</h4>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Satisfaction</p>
        </div>
        <div className="bg-[#0A0D14] border border-white/5 p-6 rounded-2xl text-center">
          <h4 className="text-4xl font-black text-[#8A2BE2] mb-2">24h</h4>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fast Delivery</p>
        </div>
        <div className="bg-[#0A0D14] border border-white/5 p-6 rounded-2xl text-center">
          <h4 className="text-4xl font-black text-[#00E5FF] mb-2">Pro</h4>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quality</p>
        </div>
      </div>

      {/* NEW: Final CTA Banner */}
      <div className="w-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#00E5FF]/20 rounded-3xl p-12 border border-white/10 text-center mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/logo.jpg')] opacity-5 bg-cover bg-center"></div>
        <h2 className="text-4xl font-black uppercase tracking-widest mb-4 relative z-10">Ready to Elevate Your Brand?</h2>
        <p className="text-gray-300 font-bold mb-8 relative z-10 max-w-xl mx-auto">Stop settling for average visuals. Let our team of expert designers and editors bring your vision to life.</p>
        <button onClick={() => onNavigate('services')} className="relative z-10 bg-white text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-2xl">
          Book a Service Now
        </button>
      </div>
    </div>
  );
}

function ServicesTab({ services, loading }) {
  const [orderModal, setOrderModal] = useState({ isOpen: false, serviceTitle: null });
  const [orderForm, setOrderForm] = useState({ name: "", email: "", phone: "", details: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const fullDetails = orderForm.phone ? `Phone: ${orderForm.phone}\n\n${orderForm.details}` : orderForm.details;
      
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          plan_title: orderModal.serviceTitle,
          plan_name: 'Standard Service',
          price: 'N/A',
          details: fullDetails
        })
      });
      
      if (res.ok) {
        alert("Booking request sent successfully! We will contact you soon.");
        setOrderModal({ isOpen: false, serviceTitle: null });
        setOrderForm({ name: "", email: "", phone: "", details: "" });
      } else {
        alert("Failed to send booking request.");
      }
    } catch (err) {
      alert("Error sending request.");
    }
    setSubmitting(false);
  };

  if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-[#8A2BE2]" size={40} /></div>;
  if (!services || services.length === 0) return <div className="text-center py-20 text-gray-500">No services available. Init DB from Admin Panel.</div>;

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-center">
        Our <span className="text-[#8A2BE2]">Services</span>
      </h2>
      <p className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-12 text-center max-w-lg">
        Premium designs and edits for your brand.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {services.map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`p-8 rounded-2xl border ${s.border_color}/50 bg-[#0A0D14] flex flex-col items-center text-center shadow-xl relative overflow-hidden group`}
          >
            <div className={`absolute inset-0 ${s.bg} ${s.image_url ? 'opacity-90' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-300`}></div>
              {s.image_url && <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-opacity duration-300" style={{ backgroundImage: `url(${s.image_url})` }}></div>}
            <div className={`${s.color} mb-6 relative z-10 drop-shadow-lg`}>{getIconComponent(s.icon)}</div>
            <h3 className="text-xl font-black uppercase tracking-wider mb-4 relative z-10">{s.title}</h3>
            <p className="text-gray-400 text-sm relative z-10 flex-1">{s.description}</p>
            
            <div className="mt-8 relative z-10 w-full">
              <button onClick={() => setOrderModal({ isOpen: true, serviceTitle: s.title })} className={`w-full py-3 rounded-xl border border-white/10 group-hover:border-white/30 text-xs font-black uppercase tracking-widest ${s.color} bg-black/50 transition-all`}>
                Book Now &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      {orderModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setOrderModal({ isOpen: false, serviceTitle: null })} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >?</button>
            <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Book Service</h3>
            <p className="text-[#00E5FF] font-bold text-xs uppercase tracking-widest mb-6">
              {orderModal.serviceTitle}
            </p>
            
            <form className="space-y-4" onSubmit={handleOrderSubmit}>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Name</label><input required type="text" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email / Instagram</label><input required type="text" value={orderForm.email} onChange={e => setOrderForm({...orderForm, email: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone Number (Optional)</label><input type="tel" value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Project Details</label><textarea required rows="3" value={orderForm.details} onChange={e => setOrderForm({...orderForm, details: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none resize-none"></textarea></div>
              <button type="submit" disabled={submitting} className="w-full bg-[#00E5FF] text-black font-black uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-[#00E5FF]/80 transition-colors">
                {submitting ? "Sending..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioTab() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeSubcat, setActiveSubcat] = useState("All");
  const [activeNiche, setActiveNiche] = useState("All");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://res.cloudinary.com/kcfjib2f/image/list/creovate_portfolio.json').then(res => res.ok ? res.json() : {}),
      fetch('https://res.cloudinary.com/kcfjib2f/video/list/creovate_portfolio.json').then(res => res.ok ? res.json() : {})
    ])
    .then(([imgData, vidData]) => {
      const imgs = (imgData.resources || []).map(r => ({...r, resource_type: 'image'}));
      const vids = (vidData.resources || []).map(r => ({...r, resource_type: 'video'}));
      let allMedia = [...imgs, ...vids].sort((a,b) => b.version - a.version);
      setImages(allMedia);
      setLoading(false);
    })
    .catch(err => {
      console.error("Cloudinary fetch error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center flex-1 w-full">
      <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-center">
        Our <span className="text-[#00E5FF]">Portfolio</span>
      </h2>
      <p className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-12 text-center max-w-lg">
        Explore our recent work.
        </p>
        
        <div className="w-full max-w-6xl mb-8 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => { setActiveCat("All"); setActiveSubcat("All"); setActiveNiche("All"); }} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${activeCat === "All" ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>All</button>
            {PORTFOLIO_CATEGORIES.map(c => (
              <button key={c.name} onClick={() => { setActiveCat(c.name); setActiveSubcat("All"); setActiveNiche("All"); }} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${activeCat === c.name ? 'bg-[#00E5FF] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{c.name}</button>
            ))}
          </div>
          
          {activeCat !== "All" && PORTFOLIO_CATEGORIES.find(c => c.name === activeCat)?.subcategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={() => { setActiveSubcat("All"); setActiveNiche("All"); }} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeSubcat === "All" ? 'bg-[#8A2BE2] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>All {activeCat}</button>
              {PORTFOLIO_CATEGORIES.find(c => c.name === activeCat).subcategories.map(s => (
                <button key={s.name} onClick={() => { setActiveSubcat(s.name); setActiveNiche("All"); }} className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeSubcat === s.name ? 'bg-[#8A2BE2] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>{s.name}</button>
              ))}
            </div>
          )}
          
          {activeSubcat !== "All" && PORTFOLIO_CATEGORIES.find(c => c.name === activeCat)?.subcategories.find(s => s.name === activeSubcat)?.niches.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
              <button onClick={() => setActiveNiche("All")} className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${activeNiche === "All" ? 'border-white text-white bg-white/10' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}>All Niches</button>
              {PORTFOLIO_CATEGORIES.find(c => c.name === activeCat).subcategories.find(s => s.name === activeSubcat).niches.map(n => (
                <button key={n} onClick={() => setActiveNiche(n)} className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${activeNiche === n ? 'border-white text-white bg-white/10' : 'border-white/10 text-gray-500 hover:bg-white/5'}`}>{n}</button>
              ))}
            </div>
          )}
        </div>
      
      {loading ? (
        <div className="flex items-center gap-3 text-[#00E5FF] mt-10">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-bold tracking-widest uppercase">Loading Portfolio...</span>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {(images.filter(m => {
              if(activeCat === "All") return true;
              const catSafe = activeCat.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_");
              if(!m.public_id.includes("__CAT__" + catSafe)) return false;
              
              if(activeSubcat !== "All") {
                const subSafe = activeSubcat.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_");
                if(!m.public_id.includes("__SUBCAT__" + subSafe)) return false;
              }
              
              if(activeNiche !== "All") {
                const nicheSafe = activeNiche.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_");
                if(!m.public_id.includes("__NICHE__" + nicheSafe)) return false;
              }
              return true;
            })).map((media, idx) => (
            <motion.div 
              key={media.public_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group bg-[#0A0D14]"
            >
              {(() => {
                const { title, link, isLinkOnly } = parseMediaMetadata(media.public_id);
                const InnerContent = () => (
                  <>
                    {isLinkOnly ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#05070A] group-hover:bg-[#0A0D14] transition-colors">
                        <Globe className="text-[#00E5FF] mb-4 group-hover:scale-110 transition-transform" size={48} />
                        <h4 className="text-white font-bold">{title || "Visit Website"}</h4>
                        <p className="text-[#00E5FF] text-xs font-bold uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to Open</p>
                      </div>
                    ) : media.resource_type === 'video' ? (
                      <video 
                        src={`https://res.cloudinary.com/kcfjib2f/video/upload/q_auto:eco,f_auto,w_600,c_limit,vc_auto/v${media.version}/${media.public_id}.${media.format}`}
                        controls preload="metadata" playsInline
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <img 
                        src={`https://res.cloudinary.com/kcfjib2f/image/upload/q_auto,f_auto,w_800,c_limit/v${media.version}/${media.public_id}.${media.format}`}
                        alt="Portfolio Item" loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    {title && !isLinkOnly && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                        <p className="text-white font-bold tracking-widest text-sm uppercase text-center">{title}</p>
                      </div>
                    )}
                  </>
                );

                return link ? (
                  <a href={link} target="_blank" rel="noreferrer" className="block w-full h-full">
                    <InnerContent />
                  </a>
                ) : (
                  <InnerContent />
                );
              })()}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 p-10 border border-white/10 rounded-3xl bg-[#0A0D14] w-full max-w-md">
          <ImageIcon size={48} className="mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2 tracking-widest uppercase">Portfolio is Empty</h3>
          <p className="text-gray-400 text-sm mb-4">Upload media from the Admin Panel.</p>
          <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest">Note: 'Resource list' must be enabled in Cloudinary Security settings!</p>
        </div>
      )}
    </div>
  );
}

function GamesTab({ onPlayWeb }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-center">
        Our <span className="text-[#00E5FF]">Games</span>
      </h2>
      <p className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-12 text-center max-w-lg">
        Download and play our exclusive creations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* REDROLE GAME CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 rounded-3xl text-center relative border border-white/10 shadow-[0_0_30px_rgba(138,43,226,0.3)] bg-[#0A0D14]/80 flex flex-col items-center"
        >
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8A2BE2] to-[#00E5FF] rounded-2xl blur-lg opacity-50"></div>
            <img src="/logo.jpg" alt="RedRole" className="w-full h-full object-cover rounded-2xl border border-white/20 relative z-10"/>
          </div>
          <h3 className="text-2xl font-black mb-2 tracking-widest uppercase text-white">RedRole</h3>
          <p className="text-gray-400 font-bold tracking-widest text-[10px] uppercase mb-8">The Ultimate Offline Party Hub</p>
          
          <div className="w-full flex flex-col gap-3 mt-auto">
            <a href="/CreovateGames.apk" download="CreovateGames.apk" className="w-full bg-[#8A2BE2]/20 border border-[#8A2BE2]/50 text-[#8A2BE2] py-4 rounded-xl font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all hover:bg-[#8A2BE2] hover:text-white group">
              <Download size={18} className="group-hover:animate-bounce" /> Android APK
            </a>
            <button onClick={onPlayWeb} className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all hover:bg-white/10">
              <Smartphone size={18} className="text-[#00E5FF]" /> Play in Browser (iOS)
            </button>
          </div>
        </motion.div>

        {/* MINI MALL TYCOON GAME CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel p-8 rounded-3xl text-center relative border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.3)] bg-[#0A0D14]/80 flex flex-col items-center"
        >
          <div className="w-24 h-24 mb-6 relative flex items-center justify-center bg-black/50 rounded-2xl border border-white/10 shadow-2xl">
            <Gamepad2 size={40} className="text-[#00E5FF]"/>
          </div>
          <h3 className="text-2xl font-black mb-2 tracking-widest uppercase text-white">Mini Mall Tycoon</h3>
          <p className="text-gray-400 font-bold tracking-widest text-[10px] uppercase mb-2">Build & Manage Your Empire</p>
          <span className="text-[10px] bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-1 rounded font-bold tracking-widest mb-8">277 MB</span>
          
          <div className="w-full flex flex-col gap-3 mt-auto">
            <a href="https://www.mediafire.com/file/nt7icoxcejutlkv/MiniMallTycoon_v1.1.apk/file" target="_blank" rel="noreferrer" className="w-full bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#00E5FF] py-4 rounded-xl font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all hover:bg-[#00E5FF] hover:text-black group">
              <Download size={18} className="group-hover:animate-bounce" /> Download APK
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function AdminTab({ services, contacts, onDataChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [deletingImage, setDeletingImage] = useState(null);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [portfolioCat, setPortfolioCat] = useState(PORTFOLIO_CATEGORIES[0].name);
  const [portfolioSubcat, setPortfolioSubcat] = useState(PORTFOLIO_CATEGORIES[0].subcategories[0]?.name || "");
  const [portfolioNiche, setPortfolioNiche] = useState(PORTFOLIO_CATEGORIES[0].subcategories[0]?.niches[0] || "");


  // Modals state
  const [serviceModal, setServiceModal] = useState({ isOpen: false, mode: 'ADD', data: { id: null, title: '', description: '', icon: '', image_url: '' } });
    const [uploadingServiceBg, setUploadingServiceBg] = useState(false);
    const [contactModal, setContactModal] = useState({ isOpen: false, mode: 'ADD', data: { id: null, platform: '', handle: '', url: '' } });
  const [uploadingServiceImg, setUploadingServiceImg] = useState(false);
  
    const [isSavingContact, setIsSavingContact] = useState(false);

  const submitContact = async (e) => {
    e.preventDefault();
    setIsSavingContact(true);
    const payload = contactModal.data;
    const action = contactModal.mode === 'ADD' ? 'ADD_CONTACT' : 'EDIT_CONTACT';
    try {
      const res = await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });
      if (!res.ok) throw new Error("Server error");
      onDataChange();
      setContactModal({ isOpen: false, mode: 'ADD', data: { id: null, platform: '', handle: '', url: '' } });
    } catch(err) { alert("Error saving contact."); }
    setIsSavingContact(false);
  };

  const handleDeleteContact = async (id) => {
    if(!confirm("Delete this contact method?")) return;
    try {
      await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE_CONTACT', payload: { id } })
      });
      onDataChange();
    } catch(err) {}
  };

  const handleLogin = (e) => {
      e.preventDefault();
      if (e.target.email.value === "admin@creovate.in" && e.target.password.value === "Creovate@123") {
        setIsLoggedIn(true);
        localStorage.setItem('creovate_admin_logged_in', 'true');
        fetchOrders();
        fetchPortfolio();
      } else { alert("Invalid Email or Password!"); }
    };

    useEffect(() => {
      if (localStorage.getItem('creovate_admin_logged_in') === 'true') {
        setIsLoggedIn(true);
        fetchOrders();
        fetchPortfolio();
      }
    }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/get-orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {}
    setLoadingOrders(false);
  };

  const handleDeleteOrder = async (id) => {
    if(!confirm("Mark this order as DONE and delete it?")) return;
    try {
      await fetch('/api/delete-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchOrders();
    } catch(err) {
      alert("Error deleting order");
    }
  };

  // --- Portfolio Managers ---
  const fetchPortfolio = () => {
    Promise.all([
      fetch(`https://res.cloudinary.com/kcfjib2f/image/list/creovate_portfolio.json?v=${Date.now()}`).then(r => r.ok ? r.json() : {}),
      fetch(`https://res.cloudinary.com/kcfjib2f/video/list/creovate_portfolio.json?v=${Date.now()}`).then(r => r.ok ? r.json() : {})
    ])
    .then(([imgData, vidData]) => {
      const imgs = (imgData.resources || []).map(r => ({...r, resource_type: 'image'}));
      const vids = (vidData.resources || []).map(r => ({...r, resource_type: 'video'}));
      setPortfolioImages([...imgs, ...vids].sort((a,b) => b.version - a.version));
    })
    .catch(err => console.error(err));
  };

  const handleDeletePortfolioImage = async (public_id, resource_type) => {
    if (!confirm("Delete this portfolio media?")) return;
    setDeletingImage(public_id);
    try {
      const res = await fetch('/api/delete-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id, resource_type })
      });
      if (res.ok) fetchPortfolio();
      else alert("Failed to delete.");
    } catch(err) { alert("Error deleting"); }
    setDeletingImage(null);
  };

  const handlePortfolioUpload = async (e, isLinkOnly = false) => {
    let file;
    if (!isLinkOnly) {
      file = e?.target?.files[0];
      if (!file) return;
    } else {
      if (!portfolioUrl) { alert("Please enter a URL first!"); return; }
      file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }
    setUploadingPortfolio(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "creovate_portfolio");
    const safeTitle = portfolioTitle.trim() ? "__TITLE__" + portfolioTitle.trim().replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") : "";
    const catStr = portfolioCat ? "__CAT__" + portfolioCat.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") : "";
    const subcatStr = portfolioSubcat ? "__SUBCAT__" + portfolioSubcat.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") : "";
    const nicheStr = portfolioNiche ? "__NICHE__" + portfolioNiche.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") : "";
    const urlStr = portfolioUrl.trim() ? "__URL__" + encodeURIComponent(portfolioUrl.trim()).replace(/%/g, "PCT") : "";
    const linkOnlyStr = isLinkOnly ? "__LINKONLY__" : "";
    formData.append("public_id", "portfolio_" + Date.now() + safeTitle + catStr + subcatStr + nicheStr + urlStr + linkOnlyStr);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f//upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.secure_url) {
          alert("Uploaded Successfully!");
          fetchPortfolio();
        } else {
          alert("Cloudinary Error: " + (data.error?.message || "Unknown error"));
        }
      } catch (err) { alert("Error uploading to Cloudinary: " + err.message); }
    setUploadingPortfolio(false);
    setPortfolioTitle("");
      e.target.value = "";
    };

  // --- Service Modal Handlers ---
  const handleServiceImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingServiceImg(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "creovate_services");
    formData.append("public_id", "service_icon_" + Date.now());
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setServiceModal(prev => ({ ...prev, data: { ...prev.data, icon: data.secure_url } }));
      }
    } catch (err) { alert("Error uploading icon"); }
    setUploadingServiceImg(false);
  };

  const handleServiceBgUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingServiceBg(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "creovate_services_bg");
    formData.append("public_id", "service_bg_" + Date.now());
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setServiceModal(prev => ({ ...prev, data: { ...prev.data, image_url: data.secure_url } }));
      }
    } catch (err) { alert("Error uploading background"); }
    setUploadingServiceBg(false);
  };

  const submitService = async (e) => {
    e.preventDefault();
    const { id, title, description, icon } = serviceModal.data;
    const payload = { id, title, description, icon: icon || 'Star', image_url: serviceModal.data.image_url || '', color: 'text-white', bg: 'bg-white/10', border_color: 'border-white' };
    const action = serviceModal.mode === 'ADD' ? 'ADD_SERVICE' : 'EDIT_SERVICE';
    try {
      await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });
      onDataChange();
      setServiceModal({ isOpen: false, mode: 'ADD', data: { id: null, title: '', description: '', icon: '' } });
    } catch(err) { alert("Error saving service"); }
  };

  const handleDeleteService = async (id) => {
    if(!confirm("Delete this service and ALL its plans?")) return;
    try {
      await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE_SERVICE', payload: { id } })
      });
      onDataChange();
    } catch(err) {}
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-[#0A0D14] shadow-2xl relative">
          <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-2 text-center">Admin Portal</h2>
          <form className="space-y-6 mt-6" onSubmit={handleLogin}>
            <input type="email" name="email" required placeholder="Email" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
            <input type="password" name="password" required placeholder="Password" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
            <button type="submit" className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white font-black tracking-widest uppercase py-4 rounded-xl">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-widest">Admin Dashboard</h2>
      </div>

      {/* Orders */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-black uppercase tracking-widest mb-4">Customer Orders</h3>
        <div className="space-y-4">
          {orders.map(o => (
             <div key={o.id} className="border border-white/5 bg-black/50 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div><p className="font-bold text-[#00E5FF]">{o.name}</p><p className="text-xs text-gray-400">{o.email}</p></div>
               <div className="sm:text-right flex-1"><p className="font-bold text-[#8A2BE2]">{o.plan_title}</p><p className="text-xs text-gray-400">Service Request</p></div>
               <button onClick={() => handleDeleteOrder(o.id)} className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-colors whitespace-nowrap">
                 Mark as Done
               </button>
             </div>
          ))}
        </div>
      </div>

      {/* Dynamic Services & Pricing Manager */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black uppercase tracking-widest">Manage Services & Pricing</h3>
          <button 
            onClick={() => setServiceModal({ isOpen: true, mode: 'ADD', data: { id: null, title: '', description: '', icon: '' } })} 
            className="flex items-center gap-2 text-xs bg-[#00E5FF] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00E5FF]/80"
          >
            <Plus size={16}/> Add Service
          </button>
        </div>
        
        <div className="space-y-8">
          {services.map(s => (
            <div key={s.id} className="border border-white/10 p-6 rounded-2xl bg-black/30">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {s.icon && s.icon.startsWith('http') ? (
                    <img src={s.icon} className="w-12 h-12 object-cover rounded-md border border-white/10" />
                  ) : (
                    <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center"><Star size={20}/></div>
                  )}
                  <h4 className="text-lg font-bold text-[#00E5FF] uppercase tracking-widest">{s.title}</h4>
                </div>
                <div className="flex gap-2">
                  
                  <button onClick={() => setServiceModal({ isOpen: true, mode: 'EDIT', data: { id: s.id, title: s.title, description: s.description, icon: s.icon, image_url: s.image_url } })} className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md">Edit</button>
                  <button onClick={() => handleDeleteService(s.id)} className="text-xs font-bold bg-red-500/20 text-red-400 px-3 py-1 rounded-md">Delete</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Manage Contacts */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black uppercase tracking-widest">Manage Contacts</h3>
          <button 
            onClick={() => setContactModal({ isOpen: true, mode: 'ADD', data: { id: null, platform: '', handle: '', url: '', is_clickable: true } })} 
            className="flex items-center gap-2 text-xs bg-[#00E5FF] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00E5FF]/80"
          >
            <Plus size={16}/> Add Contact
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts && contacts.map(c => (
             <div key={c.id} className="border border-white/5 bg-black/30 p-4 rounded-xl flex justify-between items-center group">
               <div>
                 <p className="font-bold text-[#00E5FF]">{c.platform}</p>
                 <p className="text-xs text-gray-400">{c.handle}</p>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => setContactModal({ isOpen: true, mode: 'EDIT', data: { id: c.id, platform: c.platform, handle: c.handle, url: c.url, is_clickable: c.is_clickable } })} className="text-blue-400 text-xs font-bold bg-blue-500/20 px-3 py-1 rounded">EDIT</button>
                 <button onClick={() => handleDeleteContact(c.id)} className="text-red-400 bg-red-500/20 px-3 py-1 rounded">DELETE</button>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Portfolio Uploader / Manager */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-black uppercase tracking-widest mb-6">Manage Portfolio</h3>
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <select value={portfolioCat} onChange={(e) => {
                setPortfolioCat(e.target.value);
                const catObj = PORTFOLIO_CATEGORIES.find(c => c.name === e.target.value);
                if (catObj && catObj.subcategories.length > 0) {
                  setPortfolioSubcat(catObj.subcategories[0].name);
                  setPortfolioNiche(catObj.subcategories[0].niches[0] || "");
                } else {
                  setPortfolioSubcat("");
                  setPortfolioNiche("");
                }
              }} className="flex-1 bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white font-bold">
                {PORTFOLIO_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>

              {PORTFOLIO_CATEGORIES.find(c => c.name === portfolioCat)?.subcategories.length > 0 && (
                <select value={portfolioSubcat} onChange={(e) => {
                  setPortfolioSubcat(e.target.value);
                  const catObj = PORTFOLIO_CATEGORIES.find(c => c.name === portfolioCat);
                  const subObj = catObj.subcategories.find(s => s.name === e.target.value);
                  setPortfolioNiche(subObj?.niches[0] || "");
                }} className="flex-1 bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white font-bold">
                  {PORTFOLIO_CATEGORIES.find(c => c.name === portfolioCat).subcategories.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              )}
              
              {PORTFOLIO_CATEGORIES.find(c => c.name === portfolioCat)?.subcategories.find(s => s.name === portfolioSubcat)?.niches.length > 0 && (
                <select value={portfolioNiche} onChange={e => setPortfolioNiche(e.target.value)} className="flex-1 bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white font-bold">
                  {PORTFOLIO_CATEGORIES.find(c => c.name === portfolioCat).subcategories.find(s => s.name === portfolioSubcat).niches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input 
                  type="text" 
                  placeholder="Enter Title (Optional)" 
                  value={portfolioTitle}
                  onChange={e => setPortfolioTitle(e.target.value)}
                  className="flex-1 bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white font-bold"
                />
                <input 
                  type="text" 
                  placeholder="Website URL / Link (Optional)" 
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  className="flex-1 bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white font-bold"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full justify-end">
                <button 
                  onClick={() => handlePortfolioUpload(null, true)}
                  disabled={uploadingPortfolio}
                  className="bg-white/10 text-white font-black px-6 py-3 rounded-xl hover:bg-white/20 transition-colors whitespace-nowrap"
                >
                  {uploadingPortfolio ? "SAVING..." : "SAVE LINK ONLY"}
                </button>
                <label className="bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white font-black px-6 py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 hover:opacity-80 transition-opacity whitespace-nowrap">
                  {uploadingPortfolio ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                  {uploadingPortfolio ? "UPLOADING..." : "UPLOAD MEDIA"}
                  <input type="file" className="hidden" accept="image/*,video/*" onChange={e => handlePortfolioUpload(e, false)} disabled={uploadingPortfolio} />
                </label>
              </div>
            </div>
            </div>
          </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolioImages.map(media => (
            <div key={media.public_id} className="relative aspect-video rounded-xl overflow-hidden group">
              {media.resource_type === 'video' ? (
                <video controls preload="metadata" src={`https://res.cloudinary.com/kcfjib2f/video/upload/q_auto:eco,f_auto,w_600,c_limit,vc_auto/v${media.version}/${media.public_id}.${media.format}`} className="w-full h-full object-cover" />
              ) : (
                <img src={`https://res.cloudinary.com/kcfjib2f/image/upload/q_auto,f_auto,w_800,c_limit/v${media.version}/${media.public_id}.${media.format}`} loading="lazy" className="w-full h-full object-cover" />
                )}
                {media.public_id.includes("__TITLE__") && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-center pointer-events-none">
                    <p className="text-white font-bold text-[10px] uppercase truncate">{media.public_id.split("__TITLE__")[1].replace(/_/g, " ")}</p>
                  </div>
                )}
              <button 
                onClick={() => handleDeletePortfolioImage(media.public_id, media.resource_type)}
                disabled={deletingImage === media.public_id}
                className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {deletingImage === media.public_id ? <Loader2 className="animate-spin" /> : <Trash2 size={24} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- Service Modal --- */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setServiceModal({isOpen: false})} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
            <h3 className="text-xl font-black uppercase tracking-widest mb-6">{serviceModal.mode === 'ADD' ? 'Add New Service' : 'Edit Service'}</h3>
            
            <form onSubmit={submitService} className="space-y-4">
              <div className="flex gap-4 mb-4 justify-center">
                <div className="flex flex-col items-center">
                  {serviceModal.data.icon && serviceModal.data.icon.startsWith('http') ? (
                    <img src={serviceModal.data.icon} className="w-20 h-20 object-cover rounded-xl border border-white/20 mb-2" />
                  ) : (
                    <div className="w-20 h-20 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center mb-2">
                      <ImageIcon size={24} className="text-gray-500"/>
                    </div>
                  )}
                  <label className="text-[10px] font-bold text-[#00E5FF] cursor-pointer bg-[#00E5FF]/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {uploadingServiceImg ? 'Uploading...' : 'Upload Icon'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleServiceImageUpload} disabled={uploadingServiceImg || uploadingServiceBg} />
                  </label>
                </div>
                
                <div className="flex flex-col items-center">
                  {serviceModal.data.image_url ? (
                    <img src={serviceModal.data.image_url} className="w-32 h-20 object-cover rounded-xl border border-white/20 mb-2" />
                  ) : (
                    <div className="w-32 h-20 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center mb-2">
                      <ImageIcon size={24} className="text-gray-500"/>
                    </div>
                  )}
                  <label className="text-[10px] font-bold text-[#8A2BE2] cursor-pointer bg-[#8A2BE2]/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {uploadingServiceBg ? 'Uploading...' : 'Upload Background'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleServiceBgUpload} disabled={uploadingServiceImg || uploadingServiceBg} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Service Title</label>
                <input required type="text" value={serviceModal.data.title} onChange={e=>setServiceModal(p=>({...p, data:{...p.data, title: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Description</label>
                <textarea required rows="3" value={serviceModal.data.description} onChange={e=>setServiceModal(p=>({...p, data:{...p.data, description: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white resize-none"></textarea>
              </div>
              <button type="submit" disabled={uploadingServiceImg || uploadingServiceBg} className="w-full bg-[#8A2BE2] text-white font-black uppercase tracking-widest py-3 rounded-xl mt-4">Save Service</button>
            </form>
          </div>
        </div>
      )}

      {contactModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setContactModal({isOpen: false})} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
            <h3 className="text-xl font-black uppercase tracking-widest mb-6">{contactModal.mode === 'ADD' ? 'Add Contact' : 'Edit Contact'}</h3>
            
            <form onSubmit={submitContact} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">1. URL / Email / Phone Number (Link)</label>
                <input required type="text" value={contactModal.data.url} onChange={e=>setContactModal(p=>({...p, data:{...p.data, url: e.target.value}}))} placeholder="e.g. https://wa.me/91987654321" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">2. Heading (e.g. Instagram, WhatsApp)</label>
                <input required type="text" value={contactModal.data.platform} onChange={e=>setContactModal(p=>({...p, data:{...p.data, platform: e.target.value}}))} placeholder="e.g. WhatsApp" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">3. Display Text (Optional Handle)</label>
                <input required type="text" value={contactModal.data.handle} onChange={e=>setContactModal(p=>({...p, data:{...p.data, handle: e.target.value}}))} placeholder="e.g. +91 98765 43210" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="clickable" checked={contactModal.data.is_clickable !== false} onChange={e=>setContactModal(p=>({...p, data:{...p.data, is_clickable: e.target.checked}}))} className="w-4 h-4 rounded border-white/10" />
                <label htmlFor="clickable" className="text-xs font-bold text-[#00E5FF] uppercase tracking-widest">Make this clickable?</label>
              </div>

              <button type="submit" disabled={isSavingContact} className="w-full bg-[#00E5FF] text-black font-black uppercase tracking-widest py-3 rounded-xl mt-6">
                {isSavingContact ? "Saving..." : "Save Contact"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function ContactTab({ contacts }) {
  const getIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('insta')) return <MessageCircle size={24} className="text-purple-500" />;
    if (p.includes('mail') || p.includes('email')) return <Mail size={24} className="text-red-400" />;
    if (p.includes('whatsapp') || p.includes('phone') || p.includes('call')) return <Smartphone size={24} className="text-green-400" />;
    return <MessageCircle size={24} className="text-[#00E5FF]" />;
  };

  const formatLink = (url) => {
    if (!url) return "#";
    const u = url.trim();
    if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('mailto:') || u.startsWith('tel:')) return u;
    
    // Check if it's an email
    if (u.includes('@') && !u.includes('/')) return `mailto:${u}`;
    
    // Check if it's a phone number (mostly digits, spaces, plus, hyphens)
    if (/^[\d\s\+\-]+$/.test(u)) return `tel:${u.replace(/\s+/g, '')}`;
    
    // Default to https
    return `https://${u}`;
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-widest mb-6">Let's build<br/><span className="text-[#00E5FF]">Something Great.</span></h2>
          <div className="space-y-4">
            {contacts && contacts.map(c => {
              const content = (
                <>
                  {getIcon(c.platform)} 
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect on {c.platform}</p>
                    <p className="text-lg font-black text-white">{c.handle}</p>
                  </div>
                </>
              );
              
              if (c.is_clickable === false) {
                return (
                  <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 opacity-80">
                    {content}
                  </div>
                );
              }
              
              const formattedUrl = formatLink(c.url);
              const isExternal = formattedUrl.startsWith('http');
              
              return (
                <a key={c.id} href={formattedUrl} target={isExternal ? "_blank" : "_self"} rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  {content}
                </a>
              );
            })}
            {(!contacts || contacts.length === 0) && (
              <p className="text-gray-500 text-sm italic">Contact info will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

