import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getFlashcardById, markFlashcardReviewed, toggleFavorite } from '../services/api';

export default function FlashcardViewerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [set, setSet] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getFlashcardById(id)
      .then(res => setSet(res.data))
      .catch(() => toast.error('Failed to load flashcards'))
      .finally(() => setLoading(false));
  }, [id]);

  const currentCard = set?.cards?.[currentIndex];
  const progress = set ? ((currentIndex + 1) / set.cards.length) * 100 : 0;

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentIndex < set.cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCompleted(true);
        markFlashcardReviewed(id).catch(() => {});
      }
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    }, 150);
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(id, currentCard._id);
      setSet(prev => ({
        ...prev,
        cards: prev.cards.map((c, i) =>
          i === currentIndex ? { ...c, isFavorite: !c.isFavorite } : c
        )
      }));
    } catch { toast.error('Failed to update favorite'); }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted(false);
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!set) return <div className="page"><p>Flashcard set not found</p></div>;

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/flashcards')}>← Back</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.3rem' }}>{set.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{set.totalCards} cards</p>
        </div>
      </div>

      {completed ? (
        <div className="completion-screen">
          <div style={{ fontSize: '4rem' }}>🎉</div>
          <h2>Set Complete!</h2>
          <p>You've reviewed all {set.totalCards} flashcards</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button className="btn btn-secondary" onClick={handleRestart}>Restart</button>
            <button className="btn btn-primary" onClick={() => navigate('/app/flashcards')}>Done</button>
          </div>
        </div>
      ) : (
        <div className="flashcard-viewer">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {currentIndex + 1} / {set.cards.length}
          </p>

          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <span className="card-label">Question</span>
                <p className="card-text">{currentCard?.question}</p>
                <span className="flip-hint">Click to reveal answer</span>
              </div>
              <div className="flashcard-back">
                <span className="card-label">Answer</span>
                <p className="card-text">{currentCard?.answer}</p>
              </div>
            </div>
          </div>

          <div className="flashcard-controls">
            <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>← Prev</button>
            <button
              className={`btn ${currentCard?.isFavorite ? 'btn-primary' : 'btn-ghost'}`}
              onClick={handleToggleFavorite}
            >
              {currentCard?.isFavorite ? '★ Favorited' : '☆ Favorite'}
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIndex === set.cards.length - 1 ? 'Finish ✓' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .flashcard-viewer { max-width: 640px; margin: 0 auto; }
        .progress-bar { height: 4px; background: var(--border); border-radius: 2px; margin-bottom: 0.75rem; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 0.3s ease; }
        .flashcard { height: 320px; cursor: pointer; perspective: 1000px; margin-bottom: 1.5rem; }
        .flashcard-inner { position: relative; width: 100%; height: 100%; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .flashcard.flipped .flashcard-inner { transform: rotateY(180deg); }
        .flashcard-front, .flashcard-back {
          position: absolute; inset: 0;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem; text-align: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flashcard-back {
          background: linear-gradient(135deg, rgba(79,142,247,0.1), rgba(167,139,250,0.1));
          border-color: var(--accent);
          transform: rotateY(180deg);
        }
        .card-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 1rem; font-weight: 600; }
        .card-text { font-size: 1.1rem; line-height: 1.6; color: var(--text-primary); font-weight: 500; }
        .flip-hint { font-size: 0.72rem; color: var(--text-muted); margin-top: 1.5rem; }
        .flashcard-controls { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .completion-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; gap: 0.75rem; }
        .completion-screen h2 { font-size: 1.75rem; }
        .completion-screen p { color: var(--text-muted); }
      `}</style>
    </div>
  );
}