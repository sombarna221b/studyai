import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getAllQuizzes, deleteQuiz, getDocuments, generateQuiz } from '../services/api';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    getAllQuizzes()
      .then(res => setQuizzes(res.data))
      .catch(() => toast.error('Failed to load quizzes'))
      .finally(() => setLoading(false));
  }, []);

  const openModal = async () => {
    setShowModal(true);
    setDocsLoading(true);
    try {
      const res = await getDocuments();
      setDocuments(res.data);
      if (res.data.length > 0) setSelectedDoc(res.data[0]._id);
    } catch { toast.error('Failed to load documents'); }
    finally { setDocsLoading(false); }
  };

  const handleGenerate = async () => {
    if (!selectedDoc) return toast.error('Please select a document');
    setGenerating(true);
    try {
      const res = await generateQuiz(selectedDoc, questionCount);
      setQuizzes(prev => [res.data, ...prev]);
      setShowModal(false);
      toast.success(`Generated ${questionCount}-question quiz!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Generation failed — check Gemini quota');
    } finally { setGenerating(false); }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault(); e.stopPropagation();
    if (!window.confirm('Delete this quiz?')) return;
    try {
      await deleteQuiz(id);
      setQuizzes(prev => prev.filter(q => q._id !== id));
      toast.success('Quiz deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--accent-4)';
    return 'var(--danger)';
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Quizzes</h1>
          <p>Test your knowledge with AI-generated quizzes</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>✨ Generate New</button>
      </div>

      {loading ? (
        <div className="grid-3">{[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}</div>
      ) : quizzes.length === 0 ? (
        <div className="empty-state" style={{ height: '55vh' }}>
          <div style={{ fontSize: '3rem' }}>🎯</div>
          <h3>No quizzes yet</h3>
          <p>Generate your first quiz from any uploaded document</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={openModal}>✨ Generate Quiz</button>
        </div>
      ) : (
        <div className="grid-3">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="card quiz-card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h3 className="quiz-title">{quiz.title}</h3>
              {quiz.document && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📄 {quiz.document.title}</p>}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-purple">{quiz.totalQuestions} questions</span>
                {quiz.bestScore > 0 && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: getScoreColor(quiz.bestScore) }}>
                    Best: {quiz.bestScore}%
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
                <Link to={`/app/quizzes/${quiz._id}/take`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  {quiz.results?.length > 0 ? 'Retake' : 'Start Quiz'}
                </Link>
                {quiz.results?.length > 0 && (
                  <Link to={`/app/quizzes/${quiz._id}/results`} className="btn btn-secondary btn-sm">Results</Link>
                )}
                <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(quiz._id, e)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !generating && setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✨ Generate Quiz</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} disabled={generating}>✕</button>
            </div>
            {docsLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}><span className="spinner" /></div>
            ) : documents.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No documents uploaded yet.</p>
                <Link to="/app/documents" className="btn btn-primary btn-sm">Upload a document →</Link>
              </div>
            ) : (
              <>
                <div className="modal-field">
                  <label>Select Document</label>
                  <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}>
                    {documents.map(d => (
                      <option key={d._id} value={d._id}>{d.title}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-field">
                  <label>Number of Questions</label>
                  <div className="count-pills">
                    {[5, 10, 15, 20, 30].map(n => (
                      <button key={n} className={`count-pill ${questionCount === n ? 'active' : ''}`}
                        onClick={() => setQuestionCount(n)}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)} disabled={generating}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleGenerate} disabled={generating}>
                    {generating ? <><span className="spinner" /> Generating...</> : `Generate ${questionCount} questions`}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .quiz-card { display: flex; flex-direction: column; gap: 0.375rem; }
        .quiz-title { font-size: 0.95rem; font-weight: 600; line-height: 1.3; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 200; }
        .modal-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; width: 100%; max-width: 480px; padding: 1.75rem; box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .modal-header h2 { font-size: 1.1rem; font-weight: 700; }
        .modal-close { background: none; border: none; color: var(--text-muted); font-size: 1.1rem; cursor: pointer; padding: 0.25rem; }
        .modal-close:hover { color: var(--text-primary); }
        .modal-field { margin-bottom: 1.25rem; }
        .modal-field label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.5rem; }
        .modal-field select { width: 100%; padding: 0.7rem 1rem; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-size: 0.875rem; font-family: inherit; outline: none; }
        .modal-field select:focus { border-color: var(--accent); }
        .count-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .count-pill { padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-muted); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .count-pill:hover { border-color: var(--accent); color: var(--accent); }
        .count-pill.active { background: var(--accent); border-color: var(--accent); color: white; }
        .modal-footer { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border); }
      `}</style>
    </div>
  );
}