import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getDocuments, uploadDocument, deleteDocument } from '../services/api';

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const fetchDocuments = async () => {
    try {
      const { data } = await getDocuments();
      setDocuments(data);
    } catch { toast.error('Failed to load documents'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a PDF file');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('title', title || file.name.replace('.pdf', ''));
      await uploadDocument(formData);
      toast.success('Document uploaded successfully!');
      setShowModal(false);
      setTitle(''); setFile(null);
      fetchDocuments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    if (!window.confirm('Delete this document?')) return;
    try {
      await deleteDocument(id);
      toast.success('Document deleted');
      setDocuments(prev => prev.filter(d => d._id !== id));
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Documents</h1>
          <p>Upload and manage your study materials</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Upload PDF
        </button>
      </div>

      {loading ? (
        <div className="grid-3">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 160 }} />)}
        </div>
      ) : documents.length === 0 ? (
        <div className="empty-state" style={{ height: '60vh' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h3>No documents yet</h3>
          <p>Upload your first PDF to get started</p>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowModal(true)}>
            Upload PDF
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {documents.map(doc => (
            <Link to={`/app/documents/${doc._id}`} key={doc._id} className="doc-card card">
              <div className="doc-icon">📄</div>
              <h3 className="doc-title">{doc.title}</h3>
              <div className="doc-meta">
                <span className="badge badge-blue">{doc.pageCount} pages</span>
                <span className="badge badge-purple">{formatBytes(doc.fileSize)}</span>
              </div>
              <p className="doc-date">{new Date(doc.createdAt).toLocaleDateString()}</p>
              <button
                className="btn btn-danger btn-sm doc-delete"
                onClick={(e) => handleDelete(doc._id, e)}
              >🗑 Delete</button>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload PDF</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label className="label">Title (optional)</label>
                <input className="input" placeholder="Document title..." value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">PDF File</label>
                <div className="file-drop" onClick={() => fileRef.current.click()}>
                  <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }}
                    onChange={e => setFile(e.target.files[0])} />
                  {file ? (
                    <div>
                      <p style={{ color: 'var(--accent)', fontWeight: 500 }}>📄 {file.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatBytes(file.size)}</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '2rem' }}>📁</p>
                      <p style={{ color: 'var(--text-secondary)' }}>Click to select PDF</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max 20MB</p>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary w-full" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
                  {uploading ? <><span className="spinner" />Uploading...</> : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .doc-card { display: flex; flex-direction: column; gap: 0.625rem; cursor: pointer; }
        .doc-icon { font-size: 2rem; }
        .doc-title { font-size: 0.95rem; font-weight: 600; line-height: 1.3; }
        .doc-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .doc-date { font-size: 0.75rem; color: var(--text-muted); margin-top: auto; }
        .doc-delete { margin-top: 0.5rem; align-self: flex-start; }
        .file-drop {
          border: 2px dashed var(--border-light);
          border-radius: var(--radius);
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .file-drop:hover { border-color: var(--accent); background: var(--accent-glow); }
      `}</style>
    </div>
  );
}