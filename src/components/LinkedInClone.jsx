import React from 'react'
import { CheckCircle, Building2, Plus, ThumbsUp } from 'lucide-react'

export default function LinkedInClone() {
  return (
    <div 
      // NEW: This makes clicking ANYWHERE inside the window open your real profile
      onClick={() => window.open('https://www.linkedin.com/in/shekhar-pratyush-445362327', '_blank')}
      style={{ 
        width: '100%', height: '100%', backgroundColor: '#f3f2ef', color: '#000', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', 
        overflowY: 'auto', 
        cursor: 'pointer' // NEW: Changes the mouse to a pointer to indicate it's clickable
      }}
    >
      
      {/* Top Navbar */}
      <div style={{ height: '52px', backgroundColor: '#fff', borderBottom: '1px solid #e0dfdc', display: 'flex', alignItems: 'center', padding: '0 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ backgroundColor: '#0a66c2', color: '#fff', fontWeight: 'bold', padding: '2px 6px', borderRadius: '3px', marginRight: '10px', fontSize: '1.2rem' }}>in</div>
        <div style={{ backgroundColor: '#eef3f8', border: 'none', padding: '8px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '300px' }}>
          <span style={{color: '#666', fontSize: '0.9rem'}}>Search</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', maxWidth: '1128px', margin: '20px auto', padding: '0 20px' }}>
        
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Profile Header Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0dfdc', position: 'relative' }}>
            <div style={{ height: '200px', backgroundColor: '#135bb4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{color: '#fff', fontSize: '2rem', letterSpacing: '2px'}}>SHEKHAR PRATYUSH<br/><span style={{fontSize: '1rem', fontWeight: 'normal'}}>ARTIFICIAL INTELLIGENCE ENGINEER</span></h1>
            </div>
            
            <div style={{ padding: '0 24px 24px 24px', position: 'relative' }}>
              <div style={{ width: '152px', height: '152px', borderRadius: '50%', backgroundColor: '#fff', border: '4px solid #fff', marginTop: '-112px', boxShadow: '0 0 0 1px #e0dfdc', overflow: 'hidden' }}>
                <img src="linkedinpfp.jpeg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
                <div>
                  <h1 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Shekhar Pratyush <CheckCircle size={16} color="#666" /> <span style={{fontSize: '0.9rem', color: '#666', fontWeight: 'normal'}}>(He/Him)</span>
                  </h1>
                  <p style={{ margin: '5px 0 0 0', fontSize: '1rem', color: '#000', maxWidth: '500px' }}>Building with AI/ML | Vision-Language Models • Deep Learning • NLP | AWS Certified AI Practitioner | BTech CSE</p>
                  <p style={{ margin: '5px 0 10px 0', fontSize: '0.9rem', color: '#666' }}>Ghaziabad, Uttar Pradesh, India · <span style={{ color: '#0a66c2', fontWeight: '600' }}>Contact info</span></p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#0a66c2', fontWeight: '600' }}>293 connections</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: '600' }}>
                    <div style={{width:'32px', height:'32px', backgroundColor:'#d13136', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'10px'}}>INDIA<br/>TODAY</div>
                    <span>India Today</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: '600' }}>
                    <div style={{width:'32px', height:'32px', backgroundColor:'#fff', border:'1px solid #ccc', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <Building2 size={20} color="#b31b1b" />
                    </div>
                    <span>Bennett University</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button style={{ backgroundColor: '#0a66c2', color: '#fff', border: 'none', borderRadius: '16px', padding: '6px 16px', fontWeight: '600', cursor: 'pointer' }}>Open to</button>
                <button style={{ backgroundColor: '#fff', color: '#0a66c2', border: '1px solid #0a66c2', borderRadius: '16px', padding: '6px 16px', fontWeight: '600', cursor: 'pointer' }}>Add section</button>
                <button style={{ backgroundColor: '#fff', color: '#666', border: '1px solid #666', borderRadius: '16px', padding: '6px 16px', fontWeight: '600', cursor: 'pointer' }}>Enhance profile</button>
              </div>
            </div>
          </div>

          {/* Activity / Posts Section */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', border: '1px solid #e0dfdc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600' }}>Activity</h2>
                <p style={{ margin: '0', color: '#0a66c2', fontWeight: '600', fontSize: '0.9rem' }}>309 followers</p>
              </div>
              <button style={{ backgroundColor: '#fff', color: '#0a66c2', border: '1px solid #0a66c2', borderRadius: '16px', padding: '4px 12px', fontWeight: '600', cursor: 'pointer' }}>Create a post</button>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <span style={{ backgroundColor: '#057642', color: '#fff', padding: '6px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: '600' }}>Posts</span>
              <span style={{ border: '1px solid #666', color: '#666', padding: '6px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: '600' }}>Comments</span>
              <span style={{ border: '1px solid #666', color: '#666', padding: '6px 12px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: '600' }}>Videos</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Post 1 */}
              <div style={{ border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                   <div>
                     <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Shekhar Pratyush</h4>
                     <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>2w • Edited • 🌐</p>
                   </div>
                </div>
                <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>I'm thrilled to share that I've joined India Today's Open Source and Visual Investigation team as an Artificial Intelligence Intern!</p>
                <div style={{ width: '100%', height: '150px', backgroundColor: '#eef3f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                  <span style={{color: '#666'}}>Starting a new position</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #e0dfdc', paddingTop: '10px', color: '#666', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ThumbsUp size={14}/> 21</span>
                  <span>914 impressions</span>
                </div>
              </div>

              {/* Post 2 */}
              <div style={{ border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                   <div>
                     <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Shekhar Pratyush</h4>
                     <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>1mo • 🌐</p>
                   </div>
                </div>
                <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>I am pleased to share the successful completion of HateMM, a multimodal neural network architecture...</p>
                <div style={{ width: '100%', height: '150px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #e0dfdc', paddingTop: '10px', color: '#666', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ThumbsUp size={14}/> 95</span>
                  <span>5,691 impressions</span>
                </div>
              </div>

            </div>
          </div>

          {/* Experience */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', border: '1px solid #e0dfdc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600' }}>Experience</h2>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Plus size={24} color="#666" />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{width:'48px', height:'48px', backgroundColor:'#d13136', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'12px', flexShrink: 0}}>INDIA<br/>TODAY</div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '600' }}>Artificial Intelligence Intern</h3>
                <p style={{ margin: '0 0 2px 0', fontSize: '0.9rem', color: '#000' }}>India Today · Internship</p>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#666' }}>Jun 2026 - Present · 2 mos<br/>Noida, Uttar Pradesh, India · On-site</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#333' }}><strong>Skills:</strong> Artificial Intelligence (AI), Full-Stack Development and +3 skills</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', border: '1px solid #e0dfdc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600' }}>Education</h2>
              <Plus size={24} color="#666" />
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{width:'48px', height:'48px', backgroundColor:'#fff', border:'1px solid #ccc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
                 <Building2 size={24} color="#b31b1b" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '600' }}>Bennett University</h3>
                <p style={{ margin: '0 0 2px 0', fontSize: '0.9rem', color: '#000' }}>Bachelor of Technology - BTech, Computer Science</p>
                <p style={{ margin: '0 0 0 0', fontSize: '0.85rem', color: '#666' }}>Aug 2024 - Aug 2028</p>
              </div>
            </div>
          </div>

          {/* Licenses & certifications */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', border: '1px solid #e0dfdc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600' }}>Licenses & certifications</h2>
              <Plus size={24} color="#666" />
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{width:'48px', height:'48px', backgroundColor:'#232f3e', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'12px', flexShrink: 0}}>aws</div>
              <div>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1rem', fontWeight: '600' }}>AWS Certified AI Practitioner</h3>
                <p style={{ margin: '0 0 2px 0', fontSize: '0.9rem', color: '#000' }}>Amazon Web Services (AWS)</p>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#666' }}>Issued Apr 2026 · Expires Apr 2029</p>
                <button style={{ backgroundColor: '#fff', color: '#666', border: '1px solid #666', borderRadius: '16px', padding: '4px 16px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}>Show credential</button>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', border: '1px solid #e0dfdc' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', fontWeight: '600' }}>Skills (12)</h2>
            
            <div style={{ borderBottom: '1px solid #e0dfdc', paddingBottom: '15px', marginBottom: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: '600' }}>Full-Stack Development</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#333' }}>
                <div style={{width:'24px', height:'24px', backgroundColor:'#d13136', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'8px'}}>IT</div>
                Artificial Intelligence Intern at India Today
              </div>
            </div>

            <div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: '600' }}>Blender</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#333' }}>
                <div style={{width:'24px', height:'24px', backgroundColor:'#d13136', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'8px'}}>IT</div>
                Artificial Intelligence Intern at India Today
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e0dfdc' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: '600' }}>Profile language</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>English</p>
           </div>
           <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #e0dfdc' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: '600' }}>Public profile & URL</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', wordBreak: 'break-all' }}>www.linkedin.com/in/shekhar-pratyush-445362327</p>
           </div>
        </div>

      </div>
    </div>
  )
}