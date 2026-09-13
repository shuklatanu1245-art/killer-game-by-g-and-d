import React, { useState, useEffect } from 'react';
import { Download, Gamepad2, Users, Star, Smartphone, Image as ImageIcon, Layout, Code, Video, MessageCircle, Send, ShieldCheck, Mail, Lock, ChevronRight, CheckCircle2, Upload, Loader2, Target, Zap, Award } from 'lucide-react';

export default function WebLanding({ onPlayWeb }) {
  const [activeTab, setActiveTab] = useState('home');
  const [pricingFilter, setPricingFilter] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'pricing') {
      setPricingFilter('all');
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={handleTabChange} />;
      case 'services':
        return <ServicesTab onServiceClick={(title) => {
          setPricingFilter(title);
          setActiveTab('pricing');
        }} />;
      case 'pricing':
        return <PricingTab filter={pricingFilter} setFilter={setPricingFilter} />;
      case 'portfolio':
        return <PortfolioTab />;
      case 'games':
        return <GamesTab onPlayWeb={onPlayWeb} />;
      case 'admin':
        return <AdminTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HomeTab onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#8A2BE2] rounded-full filter blur-[200px] opacity-20 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00E5FF] rounded-full filter blur-[200px] opacity-10 pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="w-full border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('home')}>
            <div className="text-3xl font-black bg-gradient-to-r from-white to-[#8A2BE2] bg-clip-text text-transparent italic tracking-tighter">
              CV
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase leading-none">Creovate</h1>
              <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">Studio</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 text-xs md:text-sm font-bold tracking-widest uppercase">
            {['home', 'services', 'pricing', 'portfolio', 'games', 'contact'].map((tab) => (
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full flex-1 flex flex-col">
          {renderTab()}
        </div>
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
          © {new Date().getFullYear()} Creovate Studio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

// --- TAB COMPONENTS ---

function HomeTab({ onNavigate }) {
  return (
    <div className="flex flex-col flex-1 pt-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
        <div className="flex-1 text-left">
          <h2 className="text-[#8A2BE2] text-3xl font-black italic tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(138,43,226,0.5)]">
            Welcome to
          </h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2 leading-none text-white drop-shadow-xl">
            Creovate<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Studio</span>
          </h1>
          <div className="h-1 w-24 bg-[#8A2BE2] rounded-full mb-8"></div>
          
          <p className="text-2xl text-gray-300 font-bold mb-6">
            Creative Ideas. <span className="text-[#8A2BE2]">Digital Solutions.</span>
          </p>
          <p className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
            We help businesses, brands and creators stand out with stunning designs, powerful websites and <span className="text-[#8A2BE2] font-bold">AI-driven</span> advertisements.
          </p>
          
          <div className="flex items-center gap-6 text-sm font-black tracking-widest uppercase text-gray-400 mb-10">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8A2BE2]"></div> DESIGN</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div> WEB</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> AI</span>
          </div>

          <div className="flex gap-4">
            <button onClick={() => onNavigate('portfolio')} className="bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
              View Our Work
            </button>
            <button onClick={() => onNavigate('services')} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              Our Services
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center items-center relative hidden md:flex">
          <div className="absolute inset-0 bg-[#8A2BE2] filter blur-[100px] opacity-20 rounded-full animate-pulse-slow"></div>
          <div className="text-[20rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-[#8A2BE2] drop-shadow-2xl relative z-10 leading-none">
            CV
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
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

    </div>
  );
}

function ServicesTab({ onServiceClick }) {
  const services = [
    { icon: <ImageIcon size={40}/>, title: "Thumbnail Designing", desc: "Eye-catching thumbnails that get more clicks.", color: "text-[#8A2BE2]", border: "border-[#8A2BE2]/50", bg: "bg-[#8A2BE2]/10" },
    { icon: <Layout size={40}/>, title: "Poster Designing", desc: "Creative posters that leave a lasting impact.", color: "text-[#00E5FF]", border: "border-[#00E5FF]/50", bg: "bg-[#00E5FF]/10" },
    { icon: <Code size={40}/>, title: "Website Development", desc: "Modern, responsive and high-performing websites.", color: "text-green-400", border: "border-green-400/50", bg: "bg-green-400/10" },
    { icon: <Video size={40}/>, title: "AI Advertisement Videos", desc: "AI-powered ads that promote and perform.", color: "text-orange-400", border: "border-orange-400/50", bg: "bg-orange-400/10" },
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-center">
        Our <span className="text-[#8A2BE2]">Services</span>
      </h2>
      <p className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-12 text-center max-w-lg">
        Click on any service to view its pricing.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {services.map((s, i) => (
          <div 
            key={i} 
            onClick={() => onServiceClick(s.title)}
            className={`p-8 rounded-2xl border ${s.border} bg-[#0A0D14] flex flex-col items-center text-center hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden group cursor-pointer`}
          >
            <div className={`absolute inset-0 ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className={`${s.color} mb-6 relative z-10 drop-shadow-lg`}>{s.icon}</div>
            <h3 className="text-xl font-black uppercase tracking-wider mb-4 relative z-10">{s.title}</h3>
            <p className="text-gray-400 text-sm relative z-10 flex-1">{s.desc}</p>
            
            <div className="mt-8 relative z-10 w-full">
              <button className={`w-full py-3 rounded-xl border border-white/10 group-hover:border-white/30 text-xs font-black uppercase tracking-widest ${s.color} bg-black/50 transition-all`}>
                See Pricing &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingTab({ filter, setFilter }) {
  const [orderModal, setOrderModal] = useState({ isOpen: false, plan: null, sectionTitle: null });
  const [orderForm, setOrderForm] = useState({ name: "", email: "", details: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          plan_title: orderModal.sectionTitle,
          plan_name: orderModal.plan.name,
          price: orderModal.plan.price,
          details: orderForm.details
        })
      });
      
      if (res.ok) {
        alert("Order placed successfully! We will contact you soon.");
        setOrderModal({ isOpen: false, plan: null, sectionTitle: null });
        setOrderForm({ name: "", email: "", details: "" });
      } else {
        alert("Failed to place order. Database might not be initialized yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order. Ensure API backend is running on Vercel.");
    }
    
    setSubmitting(false);
  };

  const allSections = [
    {
      title: "Thumbnail Designing", 
      icon: <ImageIcon/>, color: "text-[#8A2BE2]", borderColor: "border-[#8A2BE2]",
      plans: [
        { name: "Basic", price: "149", features: ["1 Thumbnail", "1 Concept", "1 Revision"] },
        { name: "Pro", price: "299", popular: true, features: ["Premium Design", "Advanced Effects", "2 Revisions"] },
        { name: "Creator Pack", price: "999", features: ["5 Thumbnails", "Consistent Style", "Priority Delivery"] }
      ]
    },
    {
      title: "Poster Designing", 
      icon: <Layout/>, color: "text-[#00E5FF]", borderColor: "border-[#00E5FF]",
      plans: [
        { name: "Basic", price: "299", features: ["1 Professional Poster", "High Quality Design", "1 Revision"] },
        { name: "Premium", price: "499", popular: true, features: ["Custom Design", "Advanced Graphics", "2 Revisions"] },
        { name: "Business Pack", price: "1,499", features: ["5 Posters", "Consistent Branding", "Priority Delivery"] }
      ]
    },
    {
      title: "Website Development", 
      icon: <Code/>, color: "text-green-400", borderColor: "border-green-400",
      plans: [
        { name: "Starter", price: "2,999+", features: ["Single Page Website", "Mobile Responsive", "Contact Section", "Basic SEO"] },
        { name: "Business", price: "5,999+", popular: true, features: ["Multi-Section Website", "Responsive Design", "Contact / CTA", "Professional UI"] },
        { name: "Custom", price: "9,999+", features: ["Custom Functionality", "Advanced UI/UX", "Multiple Pages", "Priority Support"] }
      ]
    },
    {
      title: "AI Advertisement Videos", 
      icon: <Video/>, color: "text-orange-400", borderColor: "border-orange-400",
      plans: [
        { name: "Starter", price: "499", features: ["15-20 Sec Video", "AI Visuals", "Background Music", "HD Quality"] },
        { name: "Professional", price: "999", popular: true, features: ["30-40 Sec Video", "Voiceover", "Editing", "HD Quality"] },
        { name: "Business Ad", price: "1,999+", features: ["Custom Concept", "Multiple Scenes", "Professional Editing", "HD Quality"] }
      ]
    }
  ];

  const displayedSections = filter === 'all' 
    ? allSections 
    : allSections.filter(s => s.title === filter);

  return (
    <div className="flex flex-col items-center flex-1 w-full relative">
      <h2 className="text-4xl font-black uppercase tracking-widest mb-4 text-center">
        Price <span className="text-[#8A2BE2]">Chart</span>
      </h2>
      <p className="text-gray-400 font-bold tracking-widest text-sm uppercase mb-12">Creative Designs. Modern Websites. AI-Powered Ads.</p>
      
      {filter !== 'all' && (
        <button 
          onClick={() => setFilter('all')}
          className="mb-10 text-xs font-black tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          &larr; View All Pricing
        </button>
      )}

      <div className="w-full space-y-12">
        {displayedSections.map((section, idx) => (
          <PricingSection 
            key={idx} 
            {...section} 
            onOrder={(plan) => setOrderModal({ isOpen: true, plan, sectionTitle: section.title })}
          />
        ))}
      </div>

      {/* Order Modal */}
      {orderModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setOrderModal({ isOpen: false, plan: null, sectionTitle: null })} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Place Order</h3>
            <p className="text-[#00E5FF] font-bold text-xs uppercase tracking-widest mb-6">
              {orderModal.sectionTitle} - {orderModal.plan.name} (₹{orderModal.plan.price})
            </p>
            
            <form className="space-y-4" onSubmit={handleOrderSubmit}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Name</label>
                <input required type="text" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email / Instagram</label>
                <input required type="text" value={orderForm.email} onChange={e => setOrderForm({...orderForm, email: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Project Details</label>
                <textarea required rows="3" value={orderForm.details} onChange={e => setOrderForm({...orderForm, details: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none resize-none"></textarea>
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-[#00E5FF] text-black font-black uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-[#00E5FF]/80 transition-colors">
                {submitting ? "Submitting..." : "Confirm Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingSection({ title, icon, color, borderColor, plans, onOrder }) {
  return (
    <div className={`w-full border ${borderColor}/30 rounded-3xl p-6 bg-[#05070A] shadow-xl`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className={`${color} bg-white/5 p-4 rounded-2xl`}>{icon}</div>
          <h3 className={`text-2xl font-black uppercase tracking-wider ${color}`}>{title}</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div key={i} className={`rounded-2xl border ${p.popular ? borderColor : 'border-white/10'} p-6 bg-[#0A0D14] flex flex-col relative hover:-translate-y-2 transition-transform duration-300 shadow-lg`}>
            {p.popular && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black border ${borderColor} ${color}`}>
                Most Popular
              </div>
            )}
            <h4 className={`text-center font-bold uppercase tracking-widest text-sm mb-4 ${p.popular ? color : 'text-gray-400'}`}>{p.name}</h4>
            <div className="text-center mb-6">
              <span className={`text-4xl font-black ${p.popular ? 'text-white' : 'text-gray-300'}`}>₹{p.price}</span>
            </div>
            <div className="flex-1 space-y-3 mb-8">
              {p.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 size={16} className={color} /> {f}
                </div>
              ))}
            </div>
            <button 
              onClick={() => onOrder(p)}
              className={`w-full py-3 rounded-xl font-black tracking-widest uppercase text-xs transition-colors border ${p.popular ? `bg-[#8A2BE2] text-white border-[#8A2BE2] hover:bg-[#8A2BE2]/80` : 'border-white/20 text-white hover:bg-white/10'}`}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioTab() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://res.cloudinary.com/kcfjib2f/image/list/creovate_portfolio.json')
      .then(res => res.json())
      .then(data => {
        setImages(data.resources || []);
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
      
      {loading ? (
        <div className="flex items-center gap-3 text-[#00E5FF] mt-10">
          <Loader2 className="animate-spin" size={32} />
          <span className="font-bold tracking-widest uppercase">Loading Portfolio...</span>
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {images.map((img) => (
            <div key={img.public_id} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-[#0A0D14]">
              <img 
                src={`https://res.cloudinary.com/kcfjib2f/image/upload/v${img.version}/${img.public_id}.${img.format}`}
                alt="Portfolio Item"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10 p-10 border border-white/10 rounded-3xl bg-[#0A0D14] w-full max-w-md">
          <ImageIcon size={48} className="mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2 tracking-widest uppercase">Portfolio is Empty</h3>
          <p className="text-gray-400 text-sm mb-4">Upload images from the Admin Panel.</p>
          <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest">Note: 'Resource list' must be enabled in Cloudinary Security settings!</p>
        </div>
      )}
    </div>
  );
}

function GamesTab({ onPlayWeb }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="glass-panel p-10 max-w-lg w-full text-center relative z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0A0D14]/80">
        <div className="mx-auto w-32 h-32 mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8A2BE2] to-[#00E5FF] rounded-[2rem] blur-xl opacity-50 animate-pulse"></div>
          <img src="/logo.jpg" alt="Creovate Games Logo" className="w-full h-full object-cover rounded-[2rem] border-2 border-white/20 relative z-10 shadow-2xl"/>
        </div>
        <h1 className="text-4xl font-black mb-2 tracking-widest uppercase bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Creovate Games
        </h1>
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-10">The Ultimate Offline Party Hub</p>
        
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">For Android Devices</p>
            <a href="/CreovateGames.apk" download="CreovateGames.apk" className="w-full glass-btn-primary py-4 rounded-xl font-black tracking-widest text-sm uppercase flex items-center justify-center gap-3 transition-all hover:scale-[1.02] group">
              <Download size={20} className="group-hover:animate-bounce" /> Download APK
            </a>
          </div>
          <div className="mt-2">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">For iPhone / iOS Devices</p>
            <button onClick={onPlayWeb} className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-black tracking-widest text-sm uppercase flex items-center justify-center gap-3 transition-all hover:bg-white/10 hover:border-white/20 group text-white">
              <Smartphone size={20} className="text-[#00E5FF] group-hover:scale-110 transition-transform" /> Play in Browser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminTab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    
    if (email === "admin@creovate.in" && pass === "Creovate@123") {
      setIsLoggedIn(true);
      fetchOrders();
    } else {
      alert("Invalid Email or Password!");
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/get-orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoadingOrders(false);
  };

  const initDB = async () => {
    try {
      const res = await fetch('/api/init-db');
      if (res.ok) {
        alert("Database Tables Created! (Neon Postgres)");
      } else {
        alert("DB Error");
      }
    } catch(err) { alert(err); }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "creovate_portfolio");
    
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f/image/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        alert("Uploaded to Portfolio Successfully! (Refresh page to see it)");
      } else {
        alert("Upload failed: " + (data.error?.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading to Cloudinary");
    }
    setUploading(false);
    e.target.value = "";
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-[#0A0D14] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF]"></div>
          
          <div className="text-center mb-10">
            <ShieldCheck size={48} className="mx-auto text-[#8A2BE2] mb-4" />
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-2">Admin Portal</h2>
            <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Restricted Access</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" name="email" required className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#8A2BE2]" />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" name="password" required className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#8A2BE2]" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#00E5FF] text-white font-black tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              Login <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest">Admin <span className="text-[#8A2BE2]">Dashboard</span></h2>
          <p className="text-[#00E5FF] text-xs font-bold uppercase tracking-widest mt-1">Vercel Postgres Connected</p>
        </div>
        <div className="flex gap-4">
          <button onClick={initDB} className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest border border-yellow-400/30 px-4 py-2 rounded-lg hover:bg-yellow-400/10">
            Init Postgres DB (1st time only)
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-400/30 px-4 py-2 rounded-lg hover:bg-red-400/10">
            Logout
          </button>
        </div>
      </div>

      {/* Customer Orders Section */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-400/10 rounded-xl">
              <Users className="text-green-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Customer Orders</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">From Postgres DB</p>
            </div>
          </div>
          <button onClick={fetchOrders} className="text-xs uppercase font-bold tracking-widest text-white/50 hover:text-white">Refresh</button>
        </div>
        
        {loadingOrders ? (
          <p className="text-center text-gray-500 text-sm py-4">Loading orders...</p>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-white/5 bg-black/50 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-[#00E5FF]">{order.name}</h4>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#8A2BE2] text-sm uppercase tracking-widest">{order.plan_title}</p>
                    <p className="text-xs text-white">Plan: {order.plan_name} (₹{order.price})</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-4 border-t border-white/5 pt-4">"{order.details}"</p>
                <p className="text-[10px] text-gray-600 mt-2 text-right">{new Date(order.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm py-4">No orders received yet.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-[#00E5FF]/10 rounded-xl">
              <ImageIcon className="text-[#00E5FF]" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest">Add to Portfolio</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cloudinary Database</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6 relative z-10">Select an image to instantly upload it to Cloudinary. It will automatically be tagged and displayed on the public Portfolio tab.</p>
          
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#00E5FF]/30 rounded-2xl cursor-pointer hover:bg-[#00E5FF]/5 transition-colors relative z-10">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <>
                  <Loader2 className="animate-spin text-[#00E5FF] mb-2" size={32} />
                  <p className="text-xs text-[#00E5FF] font-black uppercase tracking-widest">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="text-[#00E5FF] mb-2" size={32} />
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Select Image to Upload</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>
      </div>
    </div>
  );
}

function ContactTab() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-4xl font-black uppercase tracking-widest mb-6">Let's build<br/><span className="text-[#00E5FF]">Something Great.</span></h2>
          <p className="text-gray-400 leading-relaxed mb-10">Have a project in mind? We'd love to hear about it. Drop us a message or reach out on Instagram to bring your ideas to life.</p>
          
          <a href="https://instagram.com/creov.atestudio" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-6 group w-max">
            <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">DM Us on Instagram</p>
              <p className="text-lg font-black tracking-wider text-white">@creov.atestudio</p>
            </div>
          </a>
        </div>
        
        <div className="bg-[#0A0D14] p-8 rounded-3xl border border-white/10 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
              <input type="text" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
              <input type="email" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Project Details</label>
              <textarea rows="4" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#00E5FF] text-black font-black tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00E5FF]/80 transition-colors">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
