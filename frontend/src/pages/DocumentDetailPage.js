import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  getDocumentById, generateFlashcards, generateQuiz,
  generateSummary, explainConcept, sendChatMessage,
  getChatHistory, clearChatHistory, getFlashcardsByDocument, getQuizzesByDocument
} from '../services/api';

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [quizSets, setQuizSets] = useState([]);
  const [flashcardCount, setFlashcardCount] = useState(10);
  const [quizCount, setQuizCount] = useState(5);
  const chatEndRef = useRef();

  useEffect(() => {
    Promise.all([
      getDocumentById(id),
      getChatHistory(id),
      getFlashcardsByDocument(id),
      getQuizzesByDocument(id)
    ]).then(([docRes, chatRes, fcRes, qRes]) => {
      setDoc(docRes.data);
      setChatMessages(chatRes.data);
      setFlashcardSets(fcRes.data);
      setQuizSets(qRes.data);
      if (docRes.data.summary) setSummary(docRes.data.summary);
    }).catch(() => toast.error('Failed to load document'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
    setAiLoading(true);
    try {
      const { data } = await sendChatMessage(id, msg);
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch { toast.error('AI chat failed'); }
    finally { setAiLoading(false); }
  };

  const handleGenerateSummary = async () => {
    setAiLoading(true);
    try {
      const { data } = await generateSummary(id);
      setSummary(data.summary);
      toast.success('Summary generated!');
    } catch { toast.error('Failed to generate summary'); }
    finally { setAiLoading(false); }
  };

  const handleExplain = async () => {
    if (!concept.trim()) return toast.error('Enter a concept first');
    setAiLoading(true);
    try {
      const { data } = await explainConcept(id, concept);
      setExplanation(data.explanation);
    } catch { toast.error('Failed to explain concept'); }
    finally { setAiLoading(false); }
  };

  const handleGenerateFlashcards = async () => {
    setAiLoading(true);
    try {
      const { data } = await generateFlashcards(id, flashcardCount);
      setFlashcardSets(prev => [data, ...prev]);
      toast.success(`${data.totalCards} flashcards generated!`);
      setActiveTab('flashcards');
    } catch { toast.error('Failed to generate flashcards'); }
    finally { setAiLoading(false); }
  };

  const handleGenerateQuiz = async () => {
    setAiLoading(true);
    try {
      const { data } = await generateQuiz(id, quizCount);
      setQuizSets(prev => [data, ...prev]);
      toast.success(`Quiz with ${data.totalQuestions} questions generated!`);
      setActiveTab('quizzes');
    } catch { toast.error('Failed to generate quiz'); }
    finally { setAiLoading(false); }
  };

  const handleClearChat = async () => {
    await clearChatHistory(id);
    setChatMessages([]);
    toast.success('Chat cleared');
  };

  if (loading) return <div className="page"><div className="spinner" /></div>;
  if (!doc) return <div className="page"><p>Document not found</p></div>;

  return (
    <div className="page">
      <div className="doc-detail-header">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/app/documents')}>← Back</button>
        <div>
          <h1>{doc.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {doc.pageCount} pages • {new Date(doc.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className={`doc-layout ${(activeTab === "chat" || activeTab === "summary") ? "full-ai" : ""}`}>
        <div className={`pdf-viewer-panel${(activeTab === "chat" || activeTab === "summary") ? " hidden" : ""}`}>
          <div className="pdf-viewer-header">
            <h3>PDF Viewer</h3>
            <a
              href={doc.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm open-tab-btn"
            >
              ↗ Open in new tab
            </a>
          </div>
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(doc.filePath)}&embedded=true`}
            title="PDF Viewer"
            className="pdf-frame"
          />
        </div>

        <div className="ai-panel">
          <div className="tabs">
            {['chat', 'summary', 'flashcards', 'quizzes'].map(tab => (
              <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === 'chat' ? '💬 Chat' : tab === 'summary' ? '📝 Summary' : tab === 'flashcards' ? '🃏 Flashcards' : '🎯 Quizzes'}
              </button>
            ))}
          </div>

          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 && (
                  <div className="chat-welcome">
                    <div style={{ fontSize: '2rem' }}>🤖</div>
                    <p>Ask me anything about this document!</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.role}`}>
                    <div className="chat-bubble">{msg.content}</div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="chat-msg assistant">
                    <div className="chat-bubble"><span className="animate-pulse">Thinking...</span></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="chat-actions">
                {chatMessages.length > 0 && (
                  <button className="btn btn-ghost btn-sm" onClick={handleClearChat}>Clear chat</button>
                )}
              </div>
              <form className="chat-input-form" onSubmit={handleSendChat}>
                <input className="input" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask about this document..." disabled={aiLoading} />
                <button className="btn btn-primary" type="submit" disabled={aiLoading || !chatInput.trim()}>Send</button>
              </form>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="tab-content">
              {!summary ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Generate an AI summary of this document</p>
                  <button className="btn btn-primary" onClick={handleGenerateSummary} disabled={aiLoading}>
                    {aiLoading ? <><span className="spinner" />Generating...</> : 'Generate Summary'}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="summary-content">{summary}</div>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={handleGenerateSummary} disabled={aiLoading}>
                    Regenerate
                  </button>
                </div>
              )}
              <hr className="divider" />
              <div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>💡 Explain a Concept</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input className="input" placeholder="e.g. machine learning, CNN..." value={concept} onChange={e => setConcept(e.target.value)} />
                  <button className="btn btn-primary" onClick={handleExplain} disabled={aiLoading}>Explain</button>
                </div>
                {explanation && <div className="summary-content" style={{ marginTop: '1rem' }}>{explanation}</div>}
              </div>
            </div>
          )}

          {activeTab === 'flashcards' && (
            <div className="tab-content">
              <div className="generate-section">
                <h3>Generate Flashcards</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem' }}>
                  <input type="number" className="input" value={flashcardCount}
                    onChange={e => setFlashcardCount(Number(e.target.value))}
                    min={5} max={30} style={{ width: 80 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>cards</span>
                  <button className="btn btn-primary" onClick={handleGenerateFlashcards} disabled={aiLoading}>
                    {aiLoading ? <><span className="spinner" />Generating...</> : '⚡ Generate'}
                  </button>
                </div>
              </div>
              {flashcardSets.length > 0 && (
                <div className="sets-list">
                  {flashcardSets.map(fc => (
                    <a key={fc._id} href={`/app/flashcards/${fc._id}`} className="set-item">
                      <span>🃏 {fc.title}</span>
                      <span className="badge badge-blue">{fc.totalCards} cards</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="tab-content">
              <div className="generate-section">
                <h3>Generate Quiz</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem' }}>
                  <input type="number" className="input" value={quizCount}
                    onChange={e => setQuizCount(Number(e.target.value))}
                    min={3} max={20} style={{ width: 80 }} />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>questions</span>
                  <button className="btn btn-primary" onClick={handleGenerateQuiz} disabled={aiLoading}>
                    {aiLoading ? <><span className="spinner" />Generating...</> : '⚡ Generate'}
                  </button>
                </div>
              </div>
              {quizSets.length > 0 && (
                <div className="sets-list">
                  {quizSets.map(q => (
                    <a key={q._id} href={`/app/quizzes/${q._id}/take`} className="set-item">
                      <span>🎯 {q.title}</span>
                      <span className="badge badge-purple">{q.totalQuestions} Qs</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .doc-detail-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .doc-detail-header h1 { font-size: 1.4rem; }
        .doc-layout { display: grid; grid-template-columns: 1fr 1.1fr; gap: 1.5rem; height: calc(100vh - 200px); transition: grid-template-columns 0.3s ease; }
        .doc-layout.full-ai { grid-template-columns: 0fr 1fr; gap: 0; }
        .doc-layout.full-ai .pdf-viewer-panel { overflow: hidden; opacity: 0; pointer-events: none; }
        .pdf-viewer-panel { display: flex; flex-direction: column; gap: 0.5rem; transition: opacity 0.3s ease; min-width: 0; }
        .pdf-viewer-header { display: flex; align-items: center; justify-content: space-between; }
        .pdf-viewer-header h3 { font-size: 0.875rem; color: var(--text-secondary); font-weight: 500; }
        .open-tab-btn { font-size: 0.75rem !important; padding: 0.3rem 0.625rem !important; }
        .pdf-frame { flex: 1; width: 100%; border: 1px solid var(--border); border-radius: var(--radius-lg); background: white; }
        .ai-panel { display: flex; flex-direction: column; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; overflow: hidden; }
        .chat-container { display: flex; flex-direction: column; flex: 1; min-height: 0; }
        .chat-messages { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem; padding-bottom: 0.5rem; min-height: 0; max-height: calc(100vh - 330px); }
        .chat-welcome { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 0.75rem; color: var(--text-muted); text-align: center; }
        .chat-msg { display: flex; }
        .chat-msg.user { justify-content: flex-end; }
        .chat-msg.assistant { justify-content: flex-start; }
        .chat-bubble { max-width: 85%; padding: 0.625rem 0.875rem; border-radius: 12px; font-size: 0.85rem; line-height: 1.5; white-space: pre-wrap; }
        .chat-msg.user .chat-bubble { background: var(--accent); color: white; border-bottom-right-radius: 4px; }
        .chat-msg.assistant .chat-bubble { background: var(--bg-secondary); color: var(--text-primary); border-bottom-left-radius: 4px; }
        .chat-actions { display: flex; justify-content: flex-end; padding: 0.25rem 0; }
        .chat-input-form { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
        .tab-content { flex: 1; overflow-y: auto; }
        .summary-content { background: var(--bg-secondary); border-radius: var(--radius); padding: 1rem; font-size: 0.85rem; line-height: 1.7; color: var(--text-secondary); white-space: pre-wrap; }
        .generate-section { background: var(--bg-secondary); border-radius: var(--radius); padding: 1rem; margin-bottom: 1rem; }
        .generate-section h3 { font-size: 0.9rem; }
        .sets-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .set-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-secondary); border-radius: var(--radius); font-size: 0.85rem; transition: var(--transition); }
        .set-item:hover { background: var(--bg-card-hover); }
        @media (max-width: 1024px) { .doc-layout { grid-template-columns: 1fr; height: auto; } .pdf-frame { height: 400px; } }
      `}</style>
    </div>
  );
}