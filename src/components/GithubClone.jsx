import React from 'react'
import { Users, MapPin, Clock, Mail, Link as LinkIcon, Star, BookOpen, ChevronDown } from 'lucide-react'

// Helper component to generate the fake GitHub contribution graph
const ContributionGraph = () => {
  const weeks = 52;
  const days = 7;
  const squares = [];
  for (let i = 0; i < weeks * days; i++) {
    const level = Math.random();
    let bg = '#161b22'; 
    if (level > 0.9) bg = '#39d353'; 
    else if (level > 0.75) bg = '#26a641';
    else if (level > 0.6) bg = '#006d32';
    else if (level > 0.5) bg = '#0e4429';
    
    squares.push(<div key={i} style={{ width: '10px', height: '10px', backgroundColor: bg, borderRadius: '2px' }} />);
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${weeks}, 10px)`, gap: '3px', marginTop: '10px' }}>
      {squares}
    </div>
  )
}

export default function GithubClone() {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      
      {/* GitHub Sidebar */}
      <div style={{ width: '280px', padding: '30px 20px', borderRight: '1px solid #30363d', overflowY: 'auto' }}>
        <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', backgroundColor: '#21262d', marginBottom: '15px', border: '1px solid #30363d', overflow: 'hidden' }}>
          <img src="cocacola.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>
        
        <h1 style={{ margin: '0', fontSize: '1.5rem', color: '#fff', lineHeight: '1.2' }}>Shekhar Pratyush</h1>
        <p style={{ margin: '0 0 15px 0', color: '#8b949e', fontSize: '1.2rem', fontWeight: '300' }}>pratyushwinorlearn · he/him</p>
        <p style={{ fontSize: '1rem', marginBottom: '15px' }}>the best code is the code you don't write</p>
        
        <button style={{ width: '100%', padding: '5px', backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #363b42', borderRadius: '6px', fontWeight: '500', marginBottom: '15px', cursor: 'pointer' }}>Edit profile</button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', color: '#8b949e', marginBottom: '15px' }}>
          <Users size={16} /> <strong style={{ color: '#c9d1d9' }}>9</strong> followers · <strong style={{ color: '#c9d1d9' }}>7</strong> following
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} color="#8b949e"/> <span>India</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={16} color="#8b949e"/> <span>11:15 (UTC +05:30)</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} color="#8b949e"/> 
            <a href="mailto:pratyushqgis22@gmail.com" style={{ color: '#c9d1d9', textDecoration: 'none' }}>pratyushqgis22@gmail.com</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LinkIcon size={16} color="#8b949e"/> 
            <a href="https://linkedin.com/in/shekhar-pratyush-445362327" target="_blank" rel="noreferrer" style={{ color: '#c9d1d9', textDecoration: 'none' }}>in/shekhar-pratyush-445362327</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LinkIcon size={16} color="#8b949e"/> 
            <a href="https://www.credly.com/users/shekhar-pratyush" target="_blank" rel="noreferrer" style={{ color: '#c9d1d9', textDecoration: 'none' }}>credly.com/users/shekhar-pratyush</a>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', borderTop: '1px solid #30363d', paddingTop: '15px' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#fff', margin: '0 0 10px 0' }}>Highlights</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#8b949e', fontSize: '0.8rem' }}><Star size={14} color="#a371f7"/> PRO</div>
        </div>
      </div>

      {/* GitHub Main Content */}
      <div style={{ flex: 1, padding: '20px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #30363d', marginBottom: '20px', paddingBottom: '10px', gap: '20px', fontSize: '0.9rem' }}>
          <span style={{ fontWeight: '600', borderBottom: '2px solid #f78166', paddingBottom: '10px', color: '#fff' }}><BookOpen size={16} style={{display:'inline', verticalAlign:'middle', marginRight:'5px'}}/>Overview</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Repositories</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Projects</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Packages</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Stars</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: 'normal', color: '#fff' }}>Pinned</h3>
          <span style={{ fontSize: '0.8rem', color: '#8b949e', cursor: 'pointer' }}>Customize your pins</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          
          {/* Pinned 1 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/BlindNav" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>BlindNav</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>a project for navigating the blind</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3178c6' }}></span>TypeScript</span>
            </div>
          </div>

          {/* Pinned 2 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/HateMM" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>HateMM</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>multimodal</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3572A5' }}></span>Python</span>
            </div>
          </div>

          {/* Pinned 3 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/persona-ai" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>persona-ai</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>ai interview preparation model with a metahuman preset</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f1e05a' }}></span>JavaScript</span>
            </div>
          </div>

          {/* Pinned 4 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/pratify" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>pratify</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>Personal music app</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3178c6' }}></span>TypeScript</span>
            </div>
          </div>

          {/* Pinned 5 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/news-telegram-bot" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>news-telegram-bot</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>project for osint desk</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f1e05a' }}></span>JavaScript</span>
            </div>
          </div>

          {/* Pinned 6 */}
          <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BookOpen size={16} color="#8b949e" />
              <a href="https://github.com/pratyushwinorlearn/Movie-Digger" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none' }}>Movie-Digger</a>
              <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>Public</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px' }}>movie recommendation project based on cosine similarity and tf-idf</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#da5b0b' }}></span>Jupyter Notebook</span>
            </div>
          </div>

        </div>

        {/* Contributions Graph */}
        <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '20px', backgroundColor: '#0d1117', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: '#c9d1d9' }}>299 contributions in the last year</span>
            <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>Contribution settings <ChevronDown size={12} style={{display:'inline', verticalAlign:'middle'}}/></span>
          </div>
          <ContributionGraph />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '0.75rem', color: '#8b949e' }}>
            <span>Learn how we count contributions</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              Less 
              <div style={{width:'10px',height:'10px',backgroundColor:'#161b22',borderRadius:'2px',marginLeft:'5px'}}></div>
              <div style={{width:'10px',height:'10px',backgroundColor:'#0e4429',borderRadius:'2px'}}></div>
              <div style={{width:'10px',height:'10px',backgroundColor:'#006d32',borderRadius:'2px'}}></div>
              <div style={{width:'10px',height:'10px',backgroundColor:'#26a641',borderRadius:'2px'}}></div>
              <div style={{width:'10px',height:'10px',backgroundColor:'#39d353',borderRadius:'2px',marginRight:'5px'}}></div>
              More
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}