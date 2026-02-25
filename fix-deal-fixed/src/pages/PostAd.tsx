import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, LOCATIONS } from '../types';
import { Camera, MapPin, Tag, Info, DollarSign, Image as ImageIcon, X, Loader2, Wand2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { generateAdDescription } from '../services/aiService';

const PostAd: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    phoneNumber: profile?.phoneNumber || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      const totalImages = images.length + newFiles.length;
      
      if (totalImages > 8) {
        toast.error('You can only upload up to 8 images');
        const allowedCount = 8 - images.length;
        if (allowedCount <= 0) return;
        newFiles.splice(allowedCount);
      }

      setImages([...images, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles: File[] = Array.from(e.dataTransfer.files);
      const totalImages = images.length + newFiles.length;
      
      if (totalImages > 8) {
        toast.error('You can only upload up to 8 images');
        const allowedCount = 8 - images.length;
        if (allowedCount <= 0) return;
        newFiles.splice(allowedCount);
      }

      setImages([...images, ...newFiles]);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleAIGenerate = async () => {
    if (!formData.title || !formData.category) {
      toast.error('Please enter a title and category first');
      return;
    }

    setGeneratingAI(true);
    try {
      const description = await generateAdDescription(formData.title, formData.category);
      if (description) {
        setFormData(prev => ({ ...prev, description }));
        toast.success('AI description generated!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate description');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      // 1. Upload Images
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `ads/${Date.now()}-${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      // 2. Create Ad in Firestore
      await addDoc(collection(db, 'ads'), {
        ...formData,
        price: parseFloat(formData.price),
        images: imageUrls,
        userId: user.uid,
        userName: profile?.name || 'User',
        status: 'pending',
        isVerified: false,
        isFeatured: false,
        isPremium: false,
        createdAt: serverTimestamp(),
      });

      toast.success('Ad submitted for review!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to post ad');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Post a New Ad</h1>
        <p className="text-slate-500">Fill in the details below to list your item on FIX DEAL</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="text-primary w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">Upload Photos</h2>
          </div>
          
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
                    COVER
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {previews.length < 8 && (
              <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-slate-500">Add Photo</span>
                  <span className="block text-[10px] text-slate-400">or drag & drop</span>
                </div>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <p className="mt-4 text-xs text-slate-400">Upload up to 8 clear photos of your item. First photo will be the cover.</p>
        </div>

        {/* Basic Details */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <Info className="text-primary w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">Item Details</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ad Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Toyota Prius 2018 for sale"
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                  <select
                    required
                    className="input-field pl-12 appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Price (Rs.)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    className="input-field pl-12"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <select
                  required
                  className="input-field pl-12 appearance-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="">Select Location</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Description</label>
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={generatingAI}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors disabled:opacity-50"
                >
                  {generatingAI ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5" />
                  )}
                  {generatingAI ? 'Generating...' : 'Magic Description (AI)'}
                </button>
              </div>
              <textarea
                required
                rows={6}
                placeholder="Describe your item in detail..."
                className="input-field resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
              <input
                type="text"
                required
                placeholder="e.g. 077 123 4567"
                className="input-field"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-10 py-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Posting Ad...
              </>
            ) : 'Submit Ad for Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAd;
