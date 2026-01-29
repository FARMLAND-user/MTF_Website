
import React, { useState } from 'react';
import { useCMS } from '../App';
import { Search, TrendingUp, BarChart3, Radio, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Insights: React.FC = () => {
  const { data } = useCMS();
  const [trendSearch, setTrendSearch] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<{title: string, uri: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendAnalysis = async () => {
    if (!trendSearch) return;
    setIsLoading(true);
    setError(null);
    setGroundingLinks([]);
    
    try {
      // 환경 변수 안전 체크: process.env가 정의되지 않은 환경에서도 에러 방지
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;
      
      if (!apiKey) {
        throw new Error("AI 분석을 위한 API 키가 설정되지 않았습니다. 관리자에게 문의하세요.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a concise 2-sentence trend analysis for the branding/marketing industry regarding: ${trendSearch}. Focus on Korean vs Global perspectives.`,
        config: {
          tools: [{googleSearch: {}}],
        },
      });
      
      setAiAnalysis(response.text || "결과를 찾을 수 없습니다.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const links = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({
            title: c.web.title,
            uri: c.web.uri
          }));
        setGroundingLinks(links);
      }
    } catch (e: any) {
      console.error("AI Analysis Error:", e);
      setError(e.message || "현재 인사이트를 불러올 수 없습니다.");
      setAiAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* AI Trend Scout */}
      <section className="bg-[#111] py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex items-center gap-4 text-[#FF5E00]">
            <div className="relative">
              <Radio className="animate-pulse" />
              <div className="absolute inset-0 bg-[#FF5E00] blur-md opacity-20 animate-pulse"></div>
            </div>
            <span className="font-anton text-xl tracking-tighter">AI TREND SCOUT</span>
          </div>
          <div className="flex-grow w-full relative">
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 outline-none focus:border-[#FF5E00] transition-colors pr-32"
              placeholder="트렌드 분석 (예: '서울의 버추얼 인플루언서')..."
              value={trendSearch}
              onChange={(e) => setTrendSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchTrendAnalysis()}
            />
            <button 
              onClick={fetchTrendAnalysis}
              className="absolute right-2 top-2 bottom-2 bg-[#FF5E00] text-black px-8 rounded-full font-anton text-xs hover:bg-white transition-colors"
            >
              {isLoading ? '...' : 'ANALYZE'}
            </button>
          </div>
          
          {(aiAnalysis || error) && (
            <div className={`w-full md:max-w-sm p-6 border rounded-xl text-sm animate-in fade-in slide-in-from-left-4 backdrop-blur-sm ${
              error ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-white/5 border-[#FF5E00]/20 text-white/70 italic'
            }`}>
              {error ? (
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-500" />
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <p className="leading-relaxed">{aiAnalysis}</p>
                  {groundingLinks.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#FF5E00]">Verification Sources:</p>
                      <div className="space-y-1">
                        {groundingLinks.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block text-[10px] text-white/40 hover:text-white transition-colors truncate"
                          >
                            {link.title || link.uri}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Insights Editorial */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Global Shifts */}
          <div className="lg:w-2/3 space-y-12">
            <h2 className="text-4xl md:text-5xl font-anton flex items-center gap-4 text-[#FF5E00]">
              <TrendingUp /> GLOBAL SHIFT REPORTS
            </h2>
            <div className="grid gap-12">
              {data.news.map(item => (
                <article key={item.id} className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 aspect-square bg-[#121212] border border-white/5 group-hover:border-[#FF5E00]/30 transition-all flex items-center justify-center overflow-hidden relative">
                       {item.imageUrl ? (
                         <img 
                           src={item.imageUrl} 
                           alt={item.title} 
                           className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                         />
                       ) : (
                         <span className="font-anton text-white/10 text-6xl group-hover:scale-110 transition-transform">VIEW</span>
                       )}
                    </div>
                    <div className="md:w-2/3 py-2">
                       <span className="text-[#FF5E00] text-[10px] font-bold uppercase tracking-widest block mb-2">{item.category} / {item.date}</span>
                       <h3 className="text-3xl font-anton mb-4 group-hover:text-[#FF5E00] transition-colors uppercase leading-tight">{item.title}</h3>
                       <p className="text-white/50 font-light leading-relaxed">{item.excerpt}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* K-Pulse Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            <h2 className="text-4xl font-anton flex items-center gap-4">
              <BarChart3 className="text-[#FF5E00]" /> K-Pulse <span className="text-[10px] bg-[#FF5E00] text-black px-2 py-1 rounded font-bold">LIVE</span>
            </h2>
            <div className="bg-[#111] p-8 border border-white/5 rounded-2xl space-y-8">
              {[
                { label: 'Hyper-Personalization', score: '98%' },
                { label: 'Virtual Pop-up Stores', score: '85%' },
                { label: 'ESG Branding in Gangnam', score: '72%' }
              ].map((trend, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-white/60">{trend.label}</span>
                    <span className="text-[#FF5E00]">{trend.score}</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF5E00] transition-all duration-1000" style={{ width: trend.score }}></div>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-white/20 uppercase tracking-widest pt-4 text-center border-t border-white/5">Data refreshed every 24h via METAFOR AI</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Insights;
