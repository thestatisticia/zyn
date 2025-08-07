import React, { useState } from 'react';
import { X, Calendar, Tag, AlertCircle } from 'lucide-react';

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMarket: (market: any) => void;
}

export function CreateMarketModal({ isOpen, onClose, onCreateMarket }: CreateMarketModalProps) {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('crypto');
  const [resolutionDate, setResolutionDate] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const marketData = {
        question,
        description,
        category,
        resolutionDate: new Date(resolutionDate),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      await onCreateMarket(marketData);
      
      // Reset form
      setQuestion('');
      setDescription('');
      setCategory('crypto');
      setResolutionDate('');
      setTags('');
      onClose();
    } catch (error) {
      console.error('Market creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().slice(0, 16);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl border border-white/20 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create New Market</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
              Market Question *
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Will Bitcoin reach $100,000 by December 2024?"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed context and resolution criteria..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="crypto">Crypto</option>
                <option value="sports">Sports</option>
                <option value="tech">Tech</option>
                <option value="politics">Politics</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            <div>
              <label htmlFor="resolutionDate" className="block text-sm font-medium text-gray-300 mb-2">
                Resolution Date *
              </label>
              <input
                type="datetime-local"
                id="resolutionDate"
                value={resolutionDate}
                onChange={(e) => setResolutionDate(e.target.value)}
                min={minDateString}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
              Tags (optional)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="bitcoin, cryptocurrency, price prediction"
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Separate multiple tags with commas</p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-200">
                <div className="font-medium mb-1">Market Creation Guidelines:</div>
                <ul className="space-y-1">
                  <li>• Questions must have clear YES/NO outcomes</li>
                  <li>• Resolution criteria should be objective and verifiable</li>
                  <li>• Markets cannot be resolved before the specified date</li>
                  <li>• A small fee will be charged for market creation</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!question || !description || !resolutionDate || isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isSubmitting ? 'Creating Market...' : 'Create Market'}
          </button>
        </form>
      </div>
    </div>
  );
}