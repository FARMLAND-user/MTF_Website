
import React, { useState } from 'react';
import { useCMS } from '../App';
import { 
  Settings, 
  Layout, 
  FileText, 
  LogOut, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle,
  Activity,
  Users,
  Eye,
  Globe,
  MapPin,
  Lock,
  Image as ImageIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { data, updateData } = useCMS();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', pw: '' });
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'services' | 'news' | 'contact'>('overview');
  const [localData, setLocalData] = useState(data);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.id === 'admin' && loginForm.pw === '@meta@metafor!') {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    updateData(localData);
    setTimeout(() => setSaveStatus('saved'), 600);
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505] p-6">
        <div className="max-w-md w-full bg-[#0A0A0A] border border-white/5 p-12 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#FF5E00] rounded-2xl rotate-45 flex items-center justify-center mx-auto mb-8">
              <Lock className="text-black -rotate-45" size={32} />
            </div>
            <h1 className="font-anton text-4xl mb-2 text-[#FF5E00]">ADMIN CORE</h1>
            <p className="text-white/40 text-xs tracking-widest uppercase font-bold">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Security ID</label>
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                placeholder="ID"
                value={loginForm.id}
                onChange={(e) => setLoginForm({...loginForm, id: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Access Code</label>
              <input 
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                placeholder="Password"
                value={loginForm.pw}
                onChange={(e) => setLoginForm({...loginForm, pw: e.target.value})}
              />
            </div>
            <button className="w-full bg-[#FF5E00] text-black py-4 rounded-xl font-anton text-xl hover:bg-white transition-all">
              UNLOCK SYSTEM
            </button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, icon: Icon, label }: { id: any, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-[#FF5E00] text-black shadow-lg shadow-[#FF5E00]/20' : 'hover:bg-white/5 text-white/60'
      }`}
    >
      <Icon size={18} />
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col gap-12 bg-[#080808]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5E00] rounded-lg rotate-45 flex items-center justify-center">
            <span className="text-black font-anton -rotate-45 text-sm">M</span>
          </div>
          <div>
            <span className="font-anton text-xl block leading-none">CMS CORE</span>
            <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">v2.6 Enterprise</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2 overflow-y-auto">
          <SidebarItem id="overview" icon={Activity} label="Overview" />
          <SidebarItem id="services" icon={Layout} label="Services" />
          <SidebarItem id="news" icon={FileText} label="Editorial" />
          <SidebarItem id="contact" icon={MapPin} label="Contact" />
          <SidebarItem id="settings" icon={Settings} label="Site Config" />
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-[#FF5E00] transition-colors"
          >
            <LogOut size={18} />
            <span className="font-bold text-xs uppercase tracking-widest">Exit Portal</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-[#080808]">
          <h2 className="text-sm font-anton tracking-widest uppercase text-white/40">
            System / {activeTab}
          </h2>
          
          <div className="flex items-center gap-6">
             <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center gap-2 bg-[#FF5E00] text-black px-8 py-3 rounded-full font-anton text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {saveStatus === 'saving' ? 'Processing...' : saveStatus === 'saved' ? <><CheckCircle size={16}/> Applied</> : 'Apply Changes'}
              </button>
          </div>
        </header>

        {/* Dynamic Body */}
        <div className="flex-grow overflow-y-auto p-10 bg-[#050505]">
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               {/* Metrics */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: 'Total Reach', val: '2.4M', icon: Eye, color: '#FF5E00' },
                   { label: 'Active Leads', val: '842', icon: Users, color: '#3b82f6' },
                   { label: 'Global Rank', val: '#12', icon: Globe, color: '#10b981' },
                   { label: 'Engagement', val: '+24%', icon: Activity, color: '#f59e0b' }
                 ].map((stat, i) => (
                   <div key={i} className="p-8 bg-[#111] border border-white/5 rounded-2xl space-y-4">
                     <div className="flex justify-between items-center">
                        <stat.icon size={20} style={{ color: stat.color }} />
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">30d Change</span>
                     </div>
                     <div>
                       <p className="text-3xl font-anton">{stat.val}</p>
                       <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{stat.label}</p>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="p-8 bg-[#111] border border-white/5 rounded-2xl">
                 <h3 className="font-anton text-xl mb-8">System Activity</h3>
                 <div className="space-y-4">
                   {[
                     { user: 'Admin', act: 'Updated News Section', time: '2m ago' },
                     { user: 'AI Bot', act: 'Generated Trend Report', time: '1h ago' },
                     { user: 'System', act: 'Backup Completed', time: '4h ago' }
                   ].map((log, i) => (
                     <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                       <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-[#FF5E00]"></div>
                         <div>
                           <p className="text-sm font-bold">{log.act}</p>
                           <p className="text-[10px] text-white/40 uppercase">{log.user}</p>
                         </div>
                       </div>
                       <span className="text-[10px] text-white/20 font-bold uppercase">{log.time}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <section>
                  <h3 className="text-3xl font-anton mb-6">Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {localData.services.map((svc, i) => (
                      <div key={svc.id} className="p-8 bg-[#111] border border-white/5 rounded-2xl space-y-4 group">
                         <div className="flex justify-between">
                           <span className="text-xs font-bold text-[#FF5E00]">0{i+1}</span>
                         </div>
                         <input 
                           className="w-full bg-transparent border-b border-white/5 py-2 text-xl font-anton outline-none focus:border-[#FF5E00]"
                           value={svc.title}
                           onChange={(e) => {
                             const updated = [...localData.services];
                             updated[i].title = e.target.value;
                             setLocalData({...localData, services: updated});
                           }}
                         />
                         <textarea 
                           className="w-full bg-transparent border border-white/5 rounded-xl p-4 text-sm text-white/40 outline-none h-24 focus:border-[#FF5E00]"
                           value={svc.description}
                           onChange={(e) => {
                             const updated = [...localData.services];
                             updated[i].description = e.target.value;
                             setLocalData({...localData, services: updated});
                           }}
                         />
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-3xl font-anton mb-6">Convergence Process</h3>
                  <div className="space-y-4">
                    {localData.process.map((p, i) => (
                      <div key={p.id} className="p-6 bg-[#111] border border-white/5 rounded-2xl flex flex-col gap-4">
                         <input 
                           className="bg-transparent border-b border-white/5 py-2 font-anton text-lg outline-none focus:border-[#FF5E00]"
                           value={p.title}
                           onChange={(e) => {
                             const updated = [...localData.process];
                             updated[i].title = e.target.value;
                             setLocalData({...localData, process: updated});
                           }}
                         />
                         <textarea 
                           className="bg-transparent border border-white/5 rounded-lg p-2 text-xs text-white/40 outline-none focus:border-[#FF5E00]"
                           value={p.description}
                           onChange={(e) => {
                             const updated = [...localData.process];
                             updated[i].description = e.target.value;
                             setLocalData({...localData, process: updated});
                           }}
                         />
                      </div>
                    ))}
                  </div>
                </section>
             </div>
          )}

          {activeTab === 'contact' && (
             <div className="max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-4">
                <section className="space-y-6">
                  <h3 className="text-3xl font-anton border-b border-white/5 pb-4 text-[#FF5E00]">Contact Data</h3>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Office Phone</label>
                    <input 
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                      value={localData.contact.phone}
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, phone: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Maps Embed URL</label>
                    <input 
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                      value={localData.contact.mapEmbedUrl}
                      onChange={(e) => setLocalData({...localData, contact: {...localData.contact, mapEmbedUrl: e.target.value}})}
                    />
                    <p className="text-[9px] text-white/20 italic">Provide the URL from Google Maps iframe "src" attribute.</p>
                  </div>
                </section>
             </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-anton">Editorial Queue</h3>
                  <button className="flex items-center gap-2 bg-white/5 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#FF5E00] hover:text-black transition-all">
                    <Plus size={14} /> Draft Insight
                  </button>
                </div>
                <div className="space-y-6">
                   {localData.news.map((n, i) => (
                     <div key={n.id} className="p-6 bg-[#111] border border-white/5 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="flex gap-6 items-center flex-grow">
                              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-anton text-xl text-white/10 flex-shrink-0">{i+1}</div>
                              <div className="flex-grow">
                                <input 
                                  className="w-full bg-transparent border-b border-white/5 py-1 text-lg font-anton outline-none focus:border-[#FF5E00]"
                                  value={n.title}
                                  onChange={(e) => {
                                    const updated = [...localData.news];
                                    updated[i].title = e.target.value;
                                    setLocalData({...localData, news: updated});
                                  }}
                                />
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{n.category} / {n.date}</p>
                              </div>
                           </div>
                           <div className="flex gap-4 ml-4">
                             <button className="p-3 bg-white/5 rounded-full hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Image URL</label>
                              <div className="relative">
                                <input 
                                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#FF5E00] outline-none pl-10"
                                  value={n.imageUrl || ''}
                                  onChange={(e) => {
                                    const updated = [...localData.news];
                                    updated[i].imageUrl = e.target.value;
                                    setLocalData({...localData, news: updated});
                                  }}
                                />
                                <ImageIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-bold uppercase text-white/30 tracking-widest">Category</label>
                              <input 
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#FF5E00] outline-none"
                                value={n.category}
                                onChange={(e) => {
                                  const updated = [...localData.news];
                                  updated[i].category = e.target.value;
                                  setLocalData({...localData, news: updated});
                                }}
                              />
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-2xl space-y-12 animate-in fade-in slide-in-from-bottom-4">
                <section className="space-y-6">
                  <h3 className="text-2xl font-anton border-b border-white/5 pb-4">Global Identity</h3>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Brand Name</label>
                    <input 
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                      value={localData.config.siteTitle}
                      onChange={(e) => setLocalData({...localData, config: {...localData.config, siteTitle: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">HQ Address</label>
                    <input 
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-4 focus:border-[#FF5E00] outline-none"
                      value={localData.config.address}
                      onChange={(e) => setLocalData({...localData, config: {...localData.config, address: e.target.value}})}
                    />
                  </div>
                </section>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
