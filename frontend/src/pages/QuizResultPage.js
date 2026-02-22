import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizResults, submitQuiz, getQuizById } from '../services/api';

export default function QuizResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizResults(id)
      .then(res => setResults(res.data))
      .catch(() => toast.error('Failed to load results'))
      .finally(() => setLoading(false));
  }, [id]);

  const getScoreColor = (pct) => {
    if (pct >= 80) return 'var(--success)';
    if (pct >= 60) return 'var(--accent-4)';
    return 'var(--danger)';
  };

  const getScoreEmoji = (pct) => {
    if (pct >= 80) return '🏆';
    if (pct >= 60) return '👍';
    return '💪';
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!results) return <div className="page"><p>Results not found</p></div>;

  const latestResult = results.results?.[results.results.length - 1];

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/quizzes')}>← Back to Quizzes</button>
      </div>

      <div className="results-container">
        <div className="score-card card">
          <div style={{ fontSize: '3rem' }}>{getScoreEmoji(latestResult?.percentage || 0)}</div>
          <h1 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{results.title}</h1>
          <div className="score-circle" style={{ '--score-color': getScoreColor(latestResult?.percentage || 0) }}>
            <span className="score-number">{latestResult?.percentage || 0}%</span>
            <span className="score-label">Score</span>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            {latestResult?.score} out of {latestResult?.totalQuestions} correct
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Best score: <strong style={{ color: getScoreColor(results.bestScore) }}>{results.bestScore}%</strong>
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => navigate(`/app/quizzes/${id}/take`)}>Retake Quiz</button>
            <button className="btn btn-primary" onClick={() => navigate('/app/quizzes')}>All Quizzes</button>
          </div>
        </div>

        {results.results?.length > 1 && (
          <div className="card">
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Attempt History</h2>
            <div className="history-list">
              {results.results.map((r, i) => (
                <div key={i} className="history-item">
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Attempt {i + 1}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="history-bar">
                      <div className="history-fill" style={{ width: `${r.percentage}%`, background: getScoreColor(r.percentage) }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: getScoreColor(r.percentage), minWidth: '40px' }}>
                      {r.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .results-container { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .score-card { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2.5rem; }
        .score-circle {
          width: 120px; height: 120px;
          border: 4px solid var(--score-color);
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          margin: 0.5rem 0;
          box-shadow: 0 0 30px rgba(0,0,0,0.2);
        }
        .score-number { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--score-color); line-height: 1; }
        .score-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .history-list { display: flex; flex-direction: column; gap: 0.625rem; }
        .history-item { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .history-bar { flex: 1; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
        .history-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
      `}</style>
    </div>
  );
}