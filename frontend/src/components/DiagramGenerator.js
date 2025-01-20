import React, { useState } from 'react';
import { Download, Image, Loader2, Eye } from 'lucide-react';

const DiagramGenerator = ({ imageSrc, format }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const handleDownload = async () => {
    if (!imageSrc) return;

    try {
      setLoading(true);
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = `diagram-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download the diagram. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePreviewModal = () => {
    setPreviewModalOpen(!previewModalOpen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {imageSrc ? (
        <div className="space-y-6 animate-fade-in">
          {/* File Info Section */}
          <div className="relative group rounded-xl overflow-hidden border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
            <div className="p-4 text-sm text-gray-300">
              <p>File Generated: <span className="font-medium text-white">{`diagram-${Date.now()}.${format.toUpperCase()}`}</span></p>
              {/* Only show preview button for PNG format */}
              {format === 'png' && (
                <button 
                  onClick={togglePreviewModal}
                  className="mt-2 text-blue-400 hover:text-blue-500 flex items-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
              )}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                Format: <span className="font-medium text-white">{format.toUpperCase()}</span>
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-lg
                       bg-gradient-to-r from-purple-600 to-pink-600
                       text-white font-medium shadow-lg
                       transition-all duration-300 hover:scale-105
                       disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              Download
            </button>
          </div>

          {/* Error Section */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 
                        flex items-center gap-2 animate-fade-in">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Modal for Preview */}
          {previewModalOpen && format === 'png' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-3xl w-full">
                <button
                  onClick={togglePreviewModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <div className="max-h-[80vh] overflow-auto flex justify-center items-center">
                  <img
                    src={imageSrc}
                    alt="Generated Diagram"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 rounded-xl border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm
                      flex flex-col items-center justify-center gap-4 animate-fade-in">
          <Image className="w-12 h-12 text-gray-500" />
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              Your diagram will appear here once generated.
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PNG, SVG, PDF
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagramGenerator;
