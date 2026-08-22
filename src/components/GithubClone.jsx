import React, { useEffect, useState } from 'react'
import { Users, MapPin, Clock, Mail, Link as LinkIcon, Star, BookOpen, ChevronDown } from 'lucide-react'

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#da5b0b'
}

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
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // 🚨 NEW: Track the currently active tab
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // 🚨 UPDATED: Fetching up to 100 repos now instead of 6
    fetch('https://api.github.com/users/pratyushwinorlearn/repos?sort=updated&per_page=100')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching GitHub repos:', error);
        setIsLoading(false);
      });
  }, []);

  // 🚨 NEW: Helper style function to handle active/inactive tab highlighting
  const getTabStyle = (tabName) => ({
    cursor: 'pointer',
    fontWeight: activeTab === tabName ? '600' : 'normal',
    borderBottom: activeTab === tabName ? '2px solid #f78166' : 'none',
    paddingBottom: '10px',
    color: activeTab === tabName ? '#fff' : '#c9d1d9',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  });

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
        
        {/* 🚨 UPDATED: Interactive Tab Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid #30363d', marginBottom: '20px', gap: '20px', fontSize: '0.9rem' }}>
          <span onClick={() => setActiveTab('overview')} style={getTabStyle('overview')}>
            <BookOpen size={16} /> Overview
          </span>
          <span onClick={() => setActiveTab('repositories')} style={getTabStyle('repositories')}>
            Repositories
            {/* Renders a little repo count badge if data has loaded */}
            {!isLoading && <span style={{backgroundColor: '#30363d', padding: '2px 6px', borderRadius: '10px', fontSize: '0.75rem'}}>{repos.length}</span>}
          </span>
          <span style={{ color: '#c9d1d9', paddingBottom: '10px' }}>Projects</span>
          <span style={{ color: '#c9d1d9', paddingBottom: '10px' }}>Packages</span>
          <span style={{ color: '#c9d1d9', paddingBottom: '10px' }}>Stars</span>
        </div>
        
        {isLoading ? (
          <div style={{ color: '#8b949e', marginBottom: '30px' }}>Loading repositories...</div>
        ) : (
          <>
            {/* 🚨 CONDITIONAL RENDER: Overview Tab */}
            {activeTab === 'overview' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: 'normal', color: '#fff' }}>Recently Active</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                  {/* Slice to only show the first 6 for the overview grid */}
                  {repos.slice(0, 6).map((repo) => (
                    <div key={repo.id} style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '15px', backgroundColor: '#0d1117' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <BookOpen size={16} color="#8b949e" />
                        <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                          {repo.name}
                        </a>
                        <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '10px' }}>
                          {repo.private ? 'Private' : 'Public'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '10px 0 15px 0', minHeight: '35px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {repo.description || 'No description provided.'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e' }}>
                        {repo.language && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: languageColors[repo.language] || '#8b949e' }}></span>
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Star size={14} /> {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contributions Graph */}
                <div style={{ border: '1px solid #30363d', borderRadius: '6px', padding: '20px', backgroundColor: '#0d1117', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#c9d1d9' }}>Simulated active contributions</span>
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
              </>
            )}

            {/* 🚨 CONDITIONAL RENDER: Repositories Tab */}
            {activeTab === 'repositories' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input type="text" placeholder="Find a repository..." style={{ flex: 1, padding: '5px 12px', backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '6px', color: '#c9d1d9' }} />
                  <button style={{ padding: '5px 15px', backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #363b42', borderRadius: '6px', cursor: 'pointer' }}>Type</button>
                  <button style={{ padding: '5px 15px', backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #363b42', borderRadius: '6px', cursor: 'pointer' }}>Language</button>
                  <button style={{ padding: '5px 15px', backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #363b42', borderRadius: '6px', cursor: 'pointer' }}>Sort</button>
                </div>
                
                {/* Renders every single repo fetched as a vertical list */}
                {repos.map((repo) => (
                  <div key={repo.id} style={{ padding: '24px 0', borderBottom: '1px solid #30363d' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontWeight: '600', fontSize: '1.25rem', textDecoration: 'none' }}>
                            {repo.name}
                          </a>
                          <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.75rem', padding: '1px 7px', borderRadius: '10px' }}>
                            {repo.private ? 'Private' : 'Public'}
                          </span>
                        </div>
                        {repo.description && (
                          <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: '8px 0 0 0', width: '75%' }}>
                            {repo.description}
                          </p>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', color: '#8b949e', marginTop: '15px' }}>
                          {repo.language && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: languageColors[repo.language] || '#8b949e' }}></span>
                              {repo.language}
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Star size={14} /> {repo.stargazers_count}
                            </span>
                          )}
                          <span>
                            Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <button style={{ backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #363b42', borderRadius: '6px', padding: '4px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                          <Star size={14}/> Star
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}