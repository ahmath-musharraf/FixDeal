import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Plus, Image as ImageIcon, MapPin, DollarSign, Tag, FileText, X, AlertCircle, CheckCircle } from 'lucide-react';
import { postAd, uploadImage } from '../services/db';
import { AdCategory } from '../types';

export const PostAd = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<AdCategory>('Vehicles');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file as Blob));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');
    
    try {
      // 1. Upload images
      const imageUrls = await Promise.all(
        images.map(img => uploadImage(img, user.uid))
      );
      
      // 2. Post ad
      await postAd({
        title,
        description,
        price: Number(price),
        category,
        location,
        images: imageUrls,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to post ad');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-50 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-[40px] p-12 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-emerald-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-4">Ad Submitted!</h2>
          <p className="text-zinc-500">Your ad is now pending approval from our moderators. Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">Post a New Ad</h1>
          <p className="text-zinc-500">Fill in the details below to list your item on FIX DEAL.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-dark" /> Photos
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-brand-dark hover:bg-zinc-50 transition-all">
                <Plus className="text-zinc-400 w-8 h-8 mb-2" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Add Photo</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          {/* Ad Details */}
          <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-dark" /> Ad Details
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Title</label>
              <input 
                type="text" 
                placeholder="e.g. 2022 Porsche 911 Turbo S" 
                required
                className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <select 
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all appearance-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AdCategory)}
                  >
                    <option value="Vehicles">Vehicles</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Price (LKR)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="e.g. Dubai Marina" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Description</label>
              <textarea 
                rows={6}
                placeholder="Describe your item in detail..." 
                required
                className="w-full px-6 py-4 bg-zinc-50 rounded-2xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-6 bg-brand-dark text-white rounded-[32px] font-black text-xl hover:bg-brand-primary transition-all shadow-2xl shadow-brand-dark/20 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                Posting Ad...
              </>
            ) : (
              'Submit Ad for Review'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
