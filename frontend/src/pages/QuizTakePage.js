import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getQuizById, submitQuiz } from '../services/api';

export default function QuizTakePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  useEffect(() => {
    getQuizById(id)
      .then(res => {
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      })
      .catch(() => toast.error('Failed to load quiz'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswer = (optionIndex) => {
    const updated = [...answers];
    updated[currentQ] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) return toast.error('Please answer all questions');
    setSubmitting(true);
    try {
      await submitQuiz(id, answers);
      toast.success('Quiz submitted!');
      navigate(`/app/quizzes/${id}/results`);
    } catch { toast.error('Failed to submit quiz'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!quiz) return <div className="page"><p>Quiz not found</p></div>;
  if (!quiz.questions || quiz.questions.length === 0) return (
    <div className="page">
      <div className="empty-state" style={{ height: '60vh' }}>
        <div style={{ fontSize: '3rem' }}>🎯</div>
        <h3>No questions found</h3>
        <p>This quiz has no questions. Regenerate it from your document once AI quota resets.</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/app/quizzes')}>
          Back to Quizzes
        </button>
      </div>
    </div>
  );

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/quizzes')}>← Exit</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.3rem' }}>{quiz.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            {answeredCount}/{quiz.questions.length} answered
          </p>
        </div>
      </div>

      <div className="quiz-layout">
        <div className="quiz-main">
          <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="card question-card">
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Question {currentQ + 1} of {quiz.questions.length}
            </p>
            <h2 className="question-text">{question.question}</h2>
            <div className="options-list">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className={`option-btn ${answers[currentQ] === i ? 'selected' : ''}`}
                  onClick={() => handleAnswer(i)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="quiz-nav">
            <button className="btn btn-secondary" onClick={() => setCurrentQ(p => p - 1)} disabled={currentQ === 0}>
              ← Previous
            </button>
            {currentQ < quiz.questions.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setCurrentQ(p => p + 1)}>
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><span className="spinner" />Submitting...</> : 'Submit Quiz ✓'}
              </button>
            )}
          </div>
        </div>

        <div className="question-grid-panel card">
          <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Questions</p>
          <div className="question-grid">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                className={`q-dot ${i === currentQ ? 'current' : ''} ${answers[i] !== null ? 'answered' : ''}`}
                onClick={() => setCurrentQ(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {answeredCount === quiz.questions.length && (
            <button className="btn btn-primary w-full" style={{ marginTop: '1rem' }} onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>

      <style>{`
        .quiz-layout { display: grid; grid-template-columns: 1fr 200px; gap: 1.5rem; }
        .quiz-main { display: flex; flex-direction: column; gap: 1rem; }
        .progress-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s ease; }
        .question-card { padding: 2rem; }
        .question-text { font-size: 1.1rem; line-height: 1.5; margin-bottom: 1.5rem; font-weight: 600; }
        .options-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .option-btn {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.875rem 1rem;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          font-size: 0.9rem;
          text-align: left;
          transition: var(--transition);
          cursor: pointer;
        }
        .option-btn:hover { border-color: var(--border-light); background: var(--bg-card-hover); }
        .option-btn.selected { border-color: var(--accent); background: var(--accent-glow); color: var(--text-primary); }
        .option-letter {
          width: 28px; height: 28px;
          background: var(--border);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700;
          flex-shrink: 0;
        }
        .option-btn.selected .option-letter { background: var(--accent); color: white; }
        .quiz-nav { display: flex; justify-content: space-between; }
        .question-grid-panel { align-self: flex-start; position: sticky; top: 2rem; }
        .question-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.375rem; }
        .q-dot {
          width: 100%; aspect-ratio: 1;
          border-radius: 6px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.72rem; font-weight: 600;
          transition: var(--transition);
          cursor: pointer;
        }
        .q-dot.answered { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
        .q-dot.current { background: var(--accent); border-color: var(--accent); color: white; }
        @media (max-width: 768px) { .quiz-layout { grid-template-columns: 1fr; } .question-grid-panel { position: static; } }
      `}</style>
    </div>
  );
}