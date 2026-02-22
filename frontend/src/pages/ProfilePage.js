import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { updateProfile, updatePassword } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return toast.error('Please select an image file');
    if (file.size > 2 * 1024 * 1024) return toast.error('Image must be under 2MB');

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      setAvatarLoading(true);
      try {
        const { data } = await updateProfile({ name: user.name, email: user.email, avatar: base64 });
        updateUser(data);
        toast.success('Avatar updated!');
      } catch (err) {
        toast.error('Failed to save avatar');
      } finally { setAvatarLoading(false); }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    setAvatarLoading(true);
    try {
      const { data } = await updateProfile({ name: user.name, email: user.email, avatar: '' });
      updateUser(data);
      setAvatar('');
      toast.success('Avatar removed');
    } catch (err) {
      toast.error('Failed to remove avatar');
    } finally { setAvatarLoading(false); }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const { data } = await updateProfile({ ...profileForm, avatar });
      updateUser(data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setProfileLoading(false); }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('Passwords do not match');
    if (passwordForm.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setPasswordLoading(true);
    try {
      await updatePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      toast.success('Password updated!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally { setPasswordLoading(false); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Profile</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="profile-layout">
        {/* Avatar Card */}
        <div className="card profile-avatar-card">
          <div className="avatar-wrap">
            {avatar ? (
              <img src={avatar} alt="avatar" className="big-avatar-img" />
            ) : (
              <div className="big-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            )}
            {avatarLoading && <div className="avatar-loading-overlay"><span className="spinner" /></div>}
          </div>

          <h2 style={{ fontSize: '1.1rem', marginTop: '0.75rem' }}>{user?.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.email}</p>
          <span className="badge badge-green" style={{ marginTop: '0.5rem' }}>Active</span>

          <div className="avatar-actions">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() => fileRef.current.click()}
              disabled={avatarLoading}
            >
              📷 {avatar ? 'Change photo' : 'Upload photo'}
            </button>
            {avatar && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleRemoveAvatar}
                disabled={avatarLoading}
                style={{ color: 'var(--danger)', fontSize: '0.75rem' }}
              >
                Remove
              </button>
            )}
          </div>
          <p className="avatar-hint">JPG, PNG or GIF · Max 2MB</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Personal Info */}
          <div className="card">
            <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Personal Information</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input className="input" value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="label">Email Address</label>
                <input className="input" type="email" value={profileForm.email}
                  onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={profileLoading}>
                {profileLoading ? <><span className="spinner" />Saving...</> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card">
            <h2 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Change Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label className="label">Current Password</label>
                <input className="input" type="password" placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="label">New Password</label>
                <input className="input" type="password" placeholder="Min. 6 characters"
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="label">Confirm New Password</label>
                <input className="input" type="password" placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={passwordLoading}>
                {passwordLoading ? <><span className="spinner" />Updating...</> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout { display: grid; grid-template-columns: 260px 1fr; gap: 1.5rem; align-items: start; }
        .profile-avatar-card { display: flex; flex-direction: column; align-items: center; gap: 0.375rem; text-align: center; padding: 2rem 1.5rem; }
        .avatar-wrap { position: relative; margin-bottom: 0.25rem; }
        .big-avatar {
          width: 88px; height: 88px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-display);
          font-size: 2.2rem; font-weight: 800; color: white;
        }
        .big-avatar-img {
          width: 88px; height: 88px; border-radius: 50%;
          object-fit: cover; border: 3px solid var(--accent);
        }
        .avatar-loading-overlay {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
        }
        .avatar-actions { display: flex; flex-direction: column; gap: 0.5rem; width: 100%; margin-top: 0.75rem; }
        .avatar-hint { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; }
        @media (max-width: 768px) { .profile-layout { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}