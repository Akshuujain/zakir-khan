import React from 'react';
import './index.css';
import { LayoutDashboard, Video, Users, BarChart3, Settings, LogOut, PlusCircle } from 'lucide-react';

function App() {
  const stats = [
    { label: "Total Subscribers", value: "1.2M", icon: <Users size={20} /> },
    { label: "Watch Time (Hrs)", value: "485K", icon: <BarChart3 size={20} /> },
    { label: "Published Content", value: "156", icon: <Video size={20} /> }
  ];

  const recentUploads = [
    { title: "Tathastu Uncut", status: "Published", date: "Mar 12, 2026", views: "450K" },
    { title: "Haq Se Single 2 Preview", status: "Processing", date: "Mar 15, 2026", views: "0" },
    { title: "Podcast #24: Life & Survival", status: "Scheduled", date: "Mar 18, 2026", views: "-" }
  ];

  return (
    <div className="dashboard-container h-screen overflow-hidden font-inter">
      {/* Sidebar */}
      <aside className="sidebar h-full">
        <div className="logo-container mb-8">
           <h1 className="text-xl font-black tracking-tight uppercase">
              <span className="gold-text">Zakir</span> Admin
           </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          <a href="#" className="nav-link active"><LayoutDashboard size={18} /> Dashboard</a>
          <a href="#" className="nav-link"><Video size={18} /> Content</a>
          <a href="#" className="nav-link"><Users size={18} /> Audience</a>
          <a href="#" className="nav-link"><BarChart3 size={18} /> Analytics</a>
          <div className="mt-8 border-t border-slate-800 pt-8 opacity-50 text-[10px] font-bold uppercase tracking-widest pl-4 mb-4">System</div>
          <a href="#" className="nav-link"><Settings size={18} /> Settings</a>
          <a href="#" className="nav-link text-red-500/80 hover:text-red-500"><LogOut size={18} /> Logout</a>
        </nav>

        <div className="bg-gradient-to-br from-gold/20 to-transparent p-6 rounded-2xl border border-gold/10">
           <p className="text-[10px] font-black uppercase text-gold mb-2">Pro Plan</p>
           <p className="text-xs text-gray-400 mb-4 leading-relaxed">Upgrade to Platinum for advanced distribution.</p>
           <button className="w-full py-2 bg-gold text-black text-[10px] font-black uppercase rounded-lg">Upgrade</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow bg-black p-12 overflow-y-auto no-scrollbar">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
           <div>
              <h2 className="text-3xl font-black mb-2 animate-fade-in">Sakht Launda <span className="gold-text">Dashboard</span></h2>
              <p className="text-gray-500 text-sm">Welcome back, Zakir. Here's what's happening with your content today.</p>
           </div>
           <button className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-gold/20 hover:scale-105 transition-transform">
              <PlusCircle size={18} /> Create New
           </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {stats.map((stat, i) => (
             <div key={i} className="stat-card">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-slate-800 rounded-xl text-gold">{stat.icon}</div>
                  <span className="text-green-500 text-[10px] font-black">+12.5%</span>
                </div>
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
             </div>
           ))}
        </div>

        {/* Recent Uploads Table */}
        <section className="bg-slate-950 p-8 rounded-3xl border border-slate-900 shadow-2xl">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold uppercase tracking-tight">Recent Content</h3>
              <button className="text-xs font-bold text-gold uppercase tracking-widest hover:opacity-70">View All Content</button>
           </div>

           <div className="w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-900 text-[10px] uppercase font-black tracking-widest text-gray-600">
                    <th className="pb-4 pl-4">Title</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Views</th>
                    <th className="pb-4 text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentUploads.map((item, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors border-b border-slate-900/50">
                      <td className="py-5 pl-4 font-bold tracking-tight">{item.title}</td>
                      <td className="py-5">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${item.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-gold/10 text-gold'}`}>
                            {item.status}
                         </span>
                      </td>
                      <td className="py-5 text-gray-500 text-xs">{item.date}</td>
                      <td className="py-5 font-mono text-xs text-gold/80">{item.views}</td>
                      <td className="py-5 text-right pr-4">
                         <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-800 rounded-lg text-gray-400">
                            <Settings size={14} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
      `}} />
    </div>
  );
}

export default App;
