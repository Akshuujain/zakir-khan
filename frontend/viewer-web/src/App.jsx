import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ["All", "Stand-Up", "Podcasts", "Zakir Specials", "Mini Clips"];
  const latestReleases = [
    { title: "Tathastu", img: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=800", exclusive: true },
    { title: "Haq Se Single", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800", exclusive: false },
    { title: "Chacha Vidhayak", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800", exclusive: true },
    { title: "Kaksha Gyarvi", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800", exclusive: false },
    { title: "Zakir Live", img: "https://images.unsplash.com/photo-1503095396549-807039045349?auto=format&fit=crop&q=80&w=800", exclusive: true },
  ];

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-4 flex justify-between items-center ${scrolled ? 'glass py-3' : 'bg-transparent'}`}>
        <div className="flex items-center gap-12">
          <h1 className="text-2xl tracking-tighter cursor-pointer">
            <span className="text-gradient-gold">ZAKIR</span> KHAN
          </h1>
          <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide uppercase opacity-80">
            <a href="#" className="hover:text-gold transition-colors">Home</a>
            <a href="#" className="hover:text-gold transition-colors">Shows</a>
            <a href="#" className="hover:text-gold transition-colors">Movies</a>
            <a href="#" className="hover:text-gold transition-colors">Podcasts</a>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn-outline hidden sm:block">Login</button>
          <button className="btn-gold">Join Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center px-12 overflow-hidden">
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514525253344-a81f3f6c233c?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl animate-fade-in">
          <span className="inline-block px-3 py-1 bg-gold text-black text-[10px] font-extrabold rounded-sm uppercase tracking-widest mb-6">Trending Now</span>
          <h2 className="text-7xl font-extrabold mb-4 leading-none">
            ZAKIR KHAN: <br/>
            <span className="text-gradient-gold">TATHASTU</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
            From childhood memories to global fame, Zakir takes you on a hilarious and emotional journey of survival and success.
          </p>
          <div className="flex gap-4">
            <button className="btn-gold px-12 py-4">Watch Now</button>
            <button className="btn-outline px-12 py-4">Add to List</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-12 -mt-20 relative z-20">
        {/* Categories */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat, i) => (
            <button key={i} className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold border ${i === 0 ? 'bg-white text-black border-white' : 'border-slate-800 hover:border-gold transition-colors'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Latest Releases */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold uppercase tracking-tight">Latest Releases</h3>
            <a href="#" className="text-gold text-sm font-bold uppercase tracking-widest border-b border-gold hover:opacity-70 transition-opacity">View All</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestReleases.map((item, i) => (
              <div key={i} className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-gold/50 transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg shadow-black">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                
                {item.exclusive && (
                  <div className="absolute top-2 left-2 bg-gold text-black text-[8px] font-black px-1.5 py-0.5 rounded-sm">GOLD</div>
                )}
                
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">New Special</p>
                  <h4 className="font-bold text-lg group-hover:text-gold transition-colors">{item.title}</h4>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                   <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exclusive Branding Banner */}
        <section className="mb-20 glass rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-gold/10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl font-black mb-4"><span className="text-gradient-gold">Haq Se</span> Premium Member</h2>
              <p className="text-gray-400">Get early access to all live shows, exclusive merchandise, and ad-free content with the platinum membership.</p>
            </div>
            <button className="btn-gold whitespace-nowrap">Upgrade Now</button>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-12 py-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <p className="text-xs">&copy; 2026 Zakir Khan OTT. All Rights Reserved.</p>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Help Center</a>
        </div>
      </footer>

      {/* Add custom Tailwind-like classes support if not available */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

export default App;
