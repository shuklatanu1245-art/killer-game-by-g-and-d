import React, { useState, useEffect } from 'react';
import { Download, Gamepad2, Users, Star, Smartphone, Image as ImageIcon, Layout, Code, Video, MessageCircle, Send, ShieldCheck, Mail, Lock, ChevronRight, CheckCircle2, Upload, Loader2, Target, Zap, Award, Trash2, Plus, X } from 'lucide-react';

export default function WebLanding({ onPlayWeb }) {
  const [activeTab, setActiveTab] = useState('home');
  const [pricingFilter, setPricingFilter] = useState('all');
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
    if (tab !== 'pricing') {
      setPricingFilter('all');
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={handleTabChange} />;
      case 'services':
        return <ServicesTab services={dynamicServices} loading={loadingData} onServiceClick={(title) => {
          setPricingFilter(title);
          setActiveTab('pricing');
        }} />;
      case 'pricing':
        return <PricingTab services={dynamicServices} loading={loadingData} filter={pricingFilter} setFilter={setPricingFilter} />;
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

function ServicesTab({ services, loading, onServiceClick }) {
  if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-[#8A2BE2]" size={40} /></div>;
  if (!services || services.length === 0) return <div className="text-center py-20 text-gray-500">No services available. Init DB from Admin Panel.</div>;

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
            className={`p-8 rounded-2xl border ${s.border_color}/50 bg-[#0A0D14] flex flex-col items-center text-center hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden group cursor-pointer`}
          >
            <div className={`absolute inset-0 ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className={`${s.color} mb-6 relative z-10 drop-shadow-lg`}>{getIconComponent(s.icon)}</div>
            <h3 className="text-xl font-black uppercase tracking-wider mb-4 relative z-10">{s.title}</h3>
            <p className="text-gray-400 text-sm relative z-10 flex-1">{s.description}</p>
            
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

function PricingTab({ services, loading, filter, setFilter }) {
  const [orderModal, setOrderModal] = useState({ isOpen: false, plan: null, sectionTitle: null });
  const [orderForm, setOrderForm] = useState({ name: "", email: "", details: "" });
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-[#00E5FF]" size={40} /></div>;
  if (!services || services.length === 0) return <div className="text-center py-20 text-gray-500">No pricing available. Init DB from Admin Panel.</div>;

  const displayedSections = filter === 'all' 
    ? services 
    : services.filter(s => s.title === filter);

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
        alert("Failed to place order.");
      }
    } catch (err) {
      alert("Error placing order.");
    }
    setSubmitting(false);
  };

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

      {orderModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setOrderModal({ isOpen: false, plan: null, sectionTitle: null })} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >✕</button>
            <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Place Order</h3>
            <p className="text-[#00E5FF] font-bold text-xs uppercase tracking-widest mb-6">
              {orderModal.sectionTitle} - {orderModal.plan.name} (₹{orderModal.plan.price})
            </p>
            
            <form className="space-y-4" onSubmit={handleOrderSubmit}>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Name</label><input required type="text" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email / Instagram</label><input required type="text" value={orderForm.email} onChange={e => setOrderForm({...orderForm, email: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none" /></div>
              <div><label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Project Details</label><textarea required rows="3" value={orderForm.details} onChange={e => setOrderForm({...orderForm, details: e.target.value})} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#00E5FF] outline-none resize-none"></textarea></div>
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

function PricingSection({ title, icon, color, border_color, plans, onOrder }) {
  const pList = plans || [];
  return (
    <div className={`w-full border ${border_color}/30 rounded-3xl p-6 bg-[#05070A] shadow-xl`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className={`${color} bg-white/5 p-4 rounded-2xl`}>{getIconComponent(icon)}</div>
          <h3 className={`text-2xl font-black uppercase tracking-wider ${color}`}>{title}</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pList.map((p, i) => (
          <div key={i} className={`rounded-2xl border ${p.is_popular ? border_color : 'border-white/10'} p-6 bg-[#0A0D14] flex flex-col relative hover:-translate-y-2 transition-transform duration-300 shadow-lg`}>
            {p.is_popular && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black border ${border_color} ${color}`}>
                Most Popular
              </div>
            )}
            <h4 className={`text-center font-bold uppercase tracking-widest text-sm mb-4 ${p.is_popular ? color : 'text-gray-400'}`}>{p.name}</h4>
            <div className="text-center mb-6">
              <span className={`text-4xl font-black ${p.is_popular ? 'text-white' : 'text-gray-300'}`}>₹{p.price}</span>
            </div>
            <div className="flex-1 space-y-3 mb-8">
              {p.features && p.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle2 size={16} className={color} /> {f}
                </div>
              ))}
            </div>
            <button onClick={() => onOrder(p)} className={`w-full py-3 rounded-xl font-black tracking-widest uppercase text-xs transition-colors border ${p.is_popular ? `bg-[#8A2BE2] text-white border-[#8A2BE2] hover:bg-[#8A2BE2]/80` : 'border-white/20 text-white hover:bg-white/10'}`}>
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
            <div key={img.public_id} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group bg-[#0A0D14]">
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

function AdminTab({ services, contacts, onDataChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [deletingImage, setDeletingImage] = useState(null);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);

  // Modals state
  const [serviceModal, setServiceModal] = useState({ isOpen: false, mode: 'ADD', data: { id: null, title: '', description: '', icon: '' } });
  const [planModal, setPlanModal] = useState({ isOpen: false, mode: 'ADD', service_id: null, data: { id: null, name: '', price: '', features: [''], is_popular: false } });
  const [contactModal, setContactModal] = useState({ isOpen: false, mode: 'ADD', data: { id: null, platform: '', handle: '', url: '' } });
  const [uploadingServiceImg, setUploadingServiceImg] = useState(false);
  
  const [isSavingPlan, setIsSavingPlan] = useState(false);
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
      fetchOrders();
      fetchPortfolio();
    } else { alert("Invalid Email or Password!"); }
  };

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
    fetch(`https://res.cloudinary.com/kcfjib2f/image/list/creovate_portfolio.json?v=${Date.now()}`)
      .then(res => res.json())
      .then(data => setPortfolioImages(data.resources || []))
      .catch(err => console.error(err));
  };

  const handleDeletePortfolioImage = async (public_id) => {
    if (!confirm("Delete this portfolio image?")) return;
    setDeletingImage(public_id);
    try {
      const res = await fetch('/api/delete-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id })
      });
      if (res.ok) fetchPortfolio();
      else alert("Failed to delete.");
    } catch(err) { alert("Error deleting"); }
    setDeletingImage(null);
  };

  const handlePortfolioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPortfolio(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("tags", "creovate_portfolio");
    formData.append("public_id", "portfolio_" + Date.now());
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        alert("Uploaded Successfully!");
        fetchPortfolio();
      }
    } catch (err) { alert("Error uploading to Cloudinary"); }
    setUploadingPortfolio(false);
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
    formData.append("public_id", "service_" + Date.now());
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/kcfjib2f/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setServiceModal(prev => ({ ...prev, data: { ...prev.data, icon: data.secure_url } }));
      }
    } catch (err) { alert("Error uploading"); }
    setUploadingServiceImg(false);
  };

  const submitService = async (e) => {
    e.preventDefault();
    const { id, title, description, icon } = serviceModal.data;
    const payload = { id, title, description, icon: icon || 'Star', color: 'text-white', bg: 'bg-white/10', border_color: 'border-white' };
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

  // --- Plan Modal Handlers ---
  const addFeatureInput = () => {
    setPlanModal(prev => ({ ...prev, data: { ...prev.data, features: [...prev.data.features, ''] } }));
  };
  
  const updateFeatureInput = (index, value) => {
    const newFeatures = [...planModal.data.features];
    newFeatures[index] = value;
    setPlanModal(prev => ({ ...prev, data: { ...prev.data, features: newFeatures } }));
  };

  const removeFeatureInput = (index) => {
    const newFeatures = planModal.data.features.filter((_, i) => i !== index);
    setPlanModal(prev => ({ ...prev, data: { ...prev.data, features: newFeatures } }));
  };

  const submitPlan = async (e) => {
    e.preventDefault();
    setIsSavingPlan(true);
    const { id, name, price, features, is_popular } = planModal.data;
    const cleanFeatures = features.filter(f => f.trim() !== '');
    const payload = { id, service_id: planModal.service_id, name, price, features: cleanFeatures, is_popular };
    const action = planModal.mode === 'ADD' ? 'ADD_PLAN' : 'EDIT_PLAN';
    try {
      const res = await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });
      if (!res.ok) throw new Error("Server error");
      onDataChange();
      setPlanModal({ isOpen: false, mode: 'ADD', service_id: null, data: { id: null, name: '', price: '', features: [''], is_popular: false } });
    } catch(err) { alert("Error saving plan. Please try again."); }
    setIsSavingPlan(false);
  };

  const handleDeletePlan = async (id) => {
    if(!confirm("Delete this plan?")) return;
    try {
      await fetch('/api/manage-pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE_PLAN', payload: { id } })
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
               <div className="sm:text-right flex-1"><p className="font-bold text-[#8A2BE2]">{o.plan_title}</p><p className="text-xs text-gray-400">{o.plan_name} (₹{o.price})</p></div>
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
                  <button onClick={() => setPlanModal({ isOpen: true, mode: 'ADD', service_id: s.id, data: { id: null, name: '', price: '', features: [''], is_popular: false } })} className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-md">Add Plan</button>
                  <button onClick={() => setServiceModal({ isOpen: true, mode: 'EDIT', data: { id: s.id, title: s.title, description: s.description, icon: s.icon } })} className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md">Edit</button>
                  <button onClick={() => handleDeleteService(s.id)} className="text-xs font-bold bg-red-500/20 text-red-400 px-3 py-1 rounded-md">Delete</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {s.plans && s.plans.map(p => (
                  <div key={p.id} className="border border-white/5 p-4 rounded-xl bg-[#0A0D14] relative group">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold uppercase tracking-widest text-xs">{p.name}</p>
                      <div className="flex gap-2 transition-opacity">
                        <button onClick={() => setPlanModal({ isOpen: true, mode: 'EDIT', service_id: s.id, data: { id: p.id, name: p.name, price: p.price, features: p.features || [''], is_popular: p.is_popular } })} className="text-blue-400 text-[10px] font-bold bg-blue-500/20 px-2 py-1 rounded">EDIT</button>
                        <button onClick={() => handleDeletePlan(p.id)} className="text-red-400 bg-red-500/20 px-2 py-1 rounded"><Trash2 size={12}/></button>
                      </div>
                    </div>
                    <p className="text-xl font-black text-gray-300">₹{p.price}</p>
                  </div>
                ))}
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
            onClick={() => setContactModal({ isOpen: true, mode: 'ADD', data: { id: null, platform: '', handle: '', url: '' } })} 
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
                 <button onClick={() => setContactModal({ isOpen: true, mode: 'EDIT', data: { id: c.id, platform: c.platform, handle: c.handle, url: c.url } })} className="text-blue-400 text-xs font-bold bg-blue-500/20 px-3 py-1 rounded">EDIT</button>
                 <button onClick={() => handleDeleteContact(c.id)} className="text-red-400 bg-red-500/20 px-3 py-1 rounded">DELETE</button>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Portfolio Uploader / Manager */}
      <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-black uppercase tracking-widest mb-6">Manage Portfolio</h3>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#00E5FF]/30 rounded-2xl cursor-pointer hover:bg-[#00E5FF]/5 transition-colors mb-8">
          {uploadingPortfolio ? <Loader2 className="animate-spin text-[#00E5FF]" size={32} /> : <Upload className="text-[#00E5FF]" size={32} />}
          <p className="text-xs text-gray-400 font-bold uppercase mt-2">Upload Image</p>
          <input type="file" className="hidden" accept="image/*" onChange={handlePortfolioUpload} disabled={uploadingPortfolio} />
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {portfolioImages.map(img => (
            <div key={img.public_id} className="relative aspect-video rounded-xl overflow-hidden group">
              <img src={`https://res.cloudinary.com/kcfjib2f/image/upload/v${img.version}/${img.public_id}.${img.format}`} className="w-full h-full object-cover" />
              <button 
                onClick={() => handleDeletePortfolioImage(img.public_id)}
                disabled={deletingImage === img.public_id}
                className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {deletingImage === img.public_id ? <Loader2 className="animate-spin" /> : <Trash2 size={24} />}
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
              <div className="flex flex-col items-center mb-4">
                {serviceModal.data.icon && serviceModal.data.icon.startsWith('http') ? (
                  <img src={serviceModal.data.icon} className="w-24 h-24 object-cover rounded-xl border border-white/20 mb-3" />
                ) : (
                  <div className="w-24 h-24 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center mb-3">
                    <ImageIcon size={32} className="text-gray-500"/>
                  </div>
                )}
                <label className="text-xs font-bold text-[#00E5FF] cursor-pointer bg-[#00E5FF]/10 px-4 py-2 rounded-lg">
                  {uploadingServiceImg ? 'Uploading...' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleServiceImageUpload} disabled={uploadingServiceImg} />
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Service Title</label>
                <input required type="text" value={serviceModal.data.title} onChange={e=>setServiceModal(p=>({...p, data:{...p.data, title: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Description</label>
                <textarea required rows="3" value={serviceModal.data.description} onChange={e=>setServiceModal(p=>({...p, data:{...p.data, description: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white resize-none"></textarea>
              </div>
              <button type="submit" disabled={uploadingServiceImg} className="w-full bg-[#8A2BE2] text-white font-black uppercase tracking-widest py-3 rounded-xl mt-4">Save Service</button>
            </form>
          </div>
        </div>
      )}

      {/* --- Plan Modal --- */}
      {planModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0A0D14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setPlanModal({isOpen: false})} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
            <h3 className="text-xl font-black uppercase tracking-widest mb-6">{planModal.mode === 'ADD' ? 'Add Plan' : 'Edit Plan'}</h3>
            
            <form onSubmit={submitPlan} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Plan Name</label>
                  <input required type="text" value={planModal.data.name} onChange={e=>setPlanModal(p=>({...p, data:{...p.data, name: e.target.value}}))} placeholder="e.g. Basic" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price</label>
                  <input required type="text" value={planModal.data.price} onChange={e=>setPlanModal(p=>({...p, data:{...p.data, price: e.target.value}}))} placeholder="e.g. 499" className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" id="popular" checked={planModal.data.is_popular} onChange={e=>setPlanModal(p=>({...p, data:{...p.data, is_popular: e.target.checked}}))} className="w-4 h-4 rounded border-white/10" />
                <label htmlFor="popular" className="text-xs font-bold text-[#8A2BE2] uppercase tracking-widest">Mark as 'Most Popular'</label>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Plan Features</label>
                {planModal.data.features.map((feat, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" value={feat} onChange={e => updateFeatureInput(index, e.target.value)} placeholder={`Feature ${index + 1}`} className="flex-1 bg-[#05070A] border border-white/10 rounded-lg py-2 px-3 text-sm text-white" />
                    <button type="button" onClick={() => removeFeatureInput(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button type="button" onClick={addFeatureInput} className="w-full border border-dashed border-white/20 text-gray-400 text-xs font-bold uppercase py-2 rounded-lg mt-2 hover:bg-white/5 flex items-center justify-center gap-2">
                  <Plus size={14}/> Add Feature
                </button>
              </div>

              <button type="submit" disabled={isSavingPlan} className="w-full bg-[#00E5FF] text-black font-black uppercase tracking-widest py-3 rounded-xl mt-6">
                {isSavingPlan ? "Saving..." : "Save Plan"}
              </button>
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
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Platform (e.g. Instagram, Email)</label>
                <input required type="text" value={contactModal.data.platform} onChange={e=>setContactModal(p=>({...p, data:{...p.data, platform: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Handle (e.g. @creovate, +91...)</label>
                <input required type="text" value={contactModal.data.handle} onChange={e=>setContactModal(p=>({...p, data:{...p.data, handle: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">URL / Link</label>
                <input required type="text" value={contactModal.data.url} onChange={e=>setContactModal(p=>({...p, data:{...p.data, url: e.target.value}}))} className="w-full bg-[#05070A] border border-white/10 rounded-xl py-3 px-4 text-white" />
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

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-widest mb-6">Let's build<br/><span className="text-[#00E5FF]">Something Great.</span></h2>
          <div className="space-y-4">
            {contacts && contacts.map(c => (
              <a key={c.id} href={c.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                {getIcon(c.platform)} 
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect on {c.platform}</p>
                  <p className="text-lg font-black text-white">{c.handle}</p>
                </div>
              </a>
            ))}
            {(!contacts || contacts.length === 0) && (
              <p className="text-gray-500 text-sm italic">Contact info will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
