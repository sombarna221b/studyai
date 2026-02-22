import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ background: color }}>{icon}</div>
    <div className="stat-info">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const timeAgo = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="page">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 100 }} />)}
      </div>
    </div>
  );

  const { stats, recentDocuments, recentFlashcards, recentQuizzes } = data || {};

  return (
    <div className="page">
      <div className="page-header">
        <h1>Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's your learning progress at a glance</p>
      </div>

      <div className="stats-grid">
        <StatCard icon="📄" label="Documents" value={stats?.totalDocuments || 0} color="rgba(79,142,247,0.15)" />
        <StatCard icon="🃏" label="Flashcard Sets" value={stats?.totalFlashcardSets || 0} color="rgba(167,139,250,0.15)" />
        <StatCard icon="📚" label="Total Cards" value={stats?.totalFlashcards || 0} color="rgba(52,211,153,0.15)" />
        <StatCard icon="🎯" label="Quizzes Taken" value={stats?.totalQuizzes || 0} color="rgba(251,146,60,0.15)" />
      </div>

      {stats?.averageQuizScore > 0 && (
        <div className="score-banner">
          <span>🏆</span>
          <span>Your average quiz score: <strong>{stats.averageQuizScore}%</strong></span>
        </div>
      )}

      {/* Top row: Documents + Flashcards */}
      <div className="dashboard-grid-top">
        <div className="card">
          <div className="section-header">
            <h2>Recent Documents</h2>
            <Link to="/app/documents" className="btn btn-ghost btn-sm">View all →</Link>
          </div>
          {recentDocuments?.length > 0 ? (
            <div className="recent-list">
              {recentDocuments.map(doc => (
                <Link to={`/app/documents/${doc._id}`} key={doc._id} className="recent-item">
                  <div className="recent-icon">📄</div>
                  <div className="recent-info">
                    <p className="recent-title">{doc.title}</p>
                    <p className="recent-meta">{doc.pageCount} pages • {formatBytes(doc.fileSize)} • {timeAgo(doc.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <p>No documents yet</p>
              <Link to="/app/documents" className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>Upload PDF</Link>
            </div>
          )}
        </div>

        <div className="card">
          <div className="section-header">
            <h2>Recent Flashcards</h2>
            <Link to="/app/flashcards" className="btn btn-ghost btn-sm">View all →</Link>
          </div>
          {recentFlashcards?.length > 0 ? (
            <div className="recent-list">
              {recentFlashcards.map(fc => (
                <Link to={`/app/flashcards/${fc._id}`} key={fc._id} className="recent-item">
                  <div className="recent-icon">🃏</div>
                  <div className="recent-info">
                    <p className="recent-title">{fc.title}</p>
                    <p className="recent-meta">{fc.totalCards} cards • {timeAgo(fc.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <p>No flashcards yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: Quizzes full width */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="section-header">
          <h2>Recent Quizzes</h2>
          <Link to="/app/quizzes" className="btn btn-ghost btn-sm">View all →</Link>
        </div>
        {recentQuizzes?.length > 0 ? (
          <div className="recent-list-hz">
            {recentQuizzes.map(quiz => (
              <Link to={`/app/quizzes/${quiz._id}/take`} key={quiz._id} className="recent-item-card">
                <div className="recent-icon" style={{ fontSize: '1.5rem', width: 44, height: 44 }}>🎯</div>
                <div className="recent-info">
                  <p className="recent-title">{quiz.title}</p>
                  <p className="recent-meta">{quiz.totalQuestions} questions • Best: {quiz.bestScore}%</p>
                  <p className="recent-meta">{timeAgo(quiz.createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: '1.5rem' }}>
            <p>No quizzes yet — generate one from a document!</p>
          </div>
        )}
      </div>

      {/* Recent Activity Timeline */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="section-header">
          <h2>⏱ Recent Activity</h2>
        </div>
        {(() => {
          const activities = [
            ...(recentDocuments || []).map(d => ({ type: 'document', icon: '📄', label: 'Uploaded document', title: d.title, meta: `${d.pageCount} pages • ${formatBytes(d.fileSize)}`, time: d.createdAt, link: `/app/documents/${d._id}` })),
            ...(recentFlashcards || []).map(f => ({ type: 'flashcard', icon: '🃏', label: 'Created flashcards', title: f.title, meta: `${f.totalCards} cards`, time: f.createdAt, link: `/app/flashcards/${f._id}` })),
            ...(recentQuizzes || []).map(q => ({ type: 'quiz', icon: '🎯', label: 'Took quiz', title: q.title, meta: `${q.totalQuestions} questions • Best: ${q.bestScore}%`, time: q.createdAt, link: `/app/quizzes/${q._id}/take` })),
          ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

          return activities.length > 0 ? (
            <div className="activity-list">
              {activities.map((act, i) => (
                <Link to={act.link} key={i} className="activity-item">
                  <div className="activity-dot" data-type={act.type} />
                  <div className="activity-icon">{act.icon}</div>
                  <div className="activity-info">
                    <span className="activity-label">{act.label}:</span>
                    <span className="activity-title"> {act.title}</span>
                    <p className="activity-meta">{act.meta} · {timeAgo(act.time)}</p>
                  </div>
                  <span className="activity-view">View →</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '1.5rem' }}>
              <p>No activity yet — upload a document to get started!</p>
            </div>
          );
        })()}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: var(--transition);
        }
        .stat-card:hover { border-color: var(--border-light); transform: translateY(-2px); }
        .stat-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }
        .stat-value {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1;
        }
        .stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; }
        .score-banner {
          background: linear-gradient(135deg, rgba(79,142,247,0.1), rgba(167,139,250,0.1));
          border: 1px solid var(--border-light);
          border-radius: var(--radius);
          padding: 0.875rem 1.25rem;
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .score-banner strong { color: var(--accent); }
        .dashboard-grid-top {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 0;
        }
        .recent-list-hz {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .recent-item-card {
          display: flex; align-items: flex-start; gap: 0.75rem;
          padding: 0.875rem;
          border-radius: 10px;
          background: var(--bg-secondary);
          transition: var(--transition);
        }
        .recent-item-card:hover { background: var(--bg-card-hover); }
        .section-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1rem;
        }
        .section-header h2 { font-size: 1rem; }
        .recent-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .recent-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.625rem;
          border-radius: 10px;
          transition: var(--transition);
        }
        .recent-item:hover { background: var(--bg-secondary); }
        .recent-icon {
          width: 36px; height: 36px;
          background: var(--bg-secondary);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .recent-title { font-size: 0.85rem; font-weight: 500; margin-bottom: 0.125rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .recent-meta { font-size: 0.72rem; color: var(--text-muted); }
        /* ACTIVITY */
        .activity-list { display: flex; flex-direction: column; }
        .activity-item {
          display: flex; align-items: center; gap: 0.875rem;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid var(--border);
          text-decoration: none; transition: var(--transition);
          border-radius: 8px;
        }
        .activity-item:last-child { border-bottom: none; }
        .activity-item:hover { background: var(--bg-secondary); }
        .activity-item:hover .activity-view { opacity: 1; }
        .activity-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .activity-dot[data-type="document"] { background: #4f8ef7; }
        .activity-dot[data-type="flashcard"] { background: #a78bfa; }
        .activity-dot[data-type="quiz"] { background: #34d399; }
        .activity-icon { font-size: 1.1rem; flex-shrink: 0; }
        .activity-info { flex: 1; min-width: 0; }
        .activity-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
        .activity-title { font-size: 0.8rem; color: var(--text-primary); font-weight: 600; }
        .activity-meta { font-size: 0.72rem; color: var(--text-muted); margin-top: 0.1rem; }
        .activity-view { font-size: 0.75rem; color: var(--accent); font-weight: 600; opacity: 0; transition: var(--transition); white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .dashboard-grid-top { grid-template-columns: 1fr; } .recent-list-hz { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}