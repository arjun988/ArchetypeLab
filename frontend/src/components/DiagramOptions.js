import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { FileDown, AlertCircle, Loader2 } from 'lucide-react';
import createDiagram from '../services/krokiService';

const DiagramOptions = ({ setImageSrc, diagramText, setDiagramText, setFormat }) => {
  const [localFormat, setLocalFormat] = useState('png');
  const [type, setType] = useState('plantuml');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setFormat(localFormat);
      const imageDataUri = await createDiagram({ ...diagramText, type }, localFormat);
      setImageSrc(imageDataUri);
      setError(null);
    } catch (error) {
      console.error('Error creating diagram:', error.message);
      setError(`Failed to generate diagram: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 animate-fade-in">
          <label className="block text-sm font-medium text-gray-300">
            Diagram Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700/50 
                     text-white shadow-lg backdrop-blur-sm
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200 hover:bg-gray-700/80"
          >
            <option value="plantuml">PlantUML</option>
            <option value="graphviz">Graphviz</option>
            <option value="mermaid">Mermaid</option>
            <option value="vega">Vega</option>
            <option value="vegalite">Vega-Lite</option>
          </select>
        </div>

        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <label className="block text-sm font-medium text-gray-300">
            Format
          </label>
          <select
            value={localFormat}
            onChange={(e) => setLocalFormat(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/80 border border-gray-700/50 
                     text-white shadow-lg backdrop-blur-sm
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200 hover:bg-gray-700/80"
          >
            <option value="png">PNG</option>
            <option value="svg">SVG</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                 text-white font-medium shadow-lg
                 transition-all duration-300 hover:scale-105
                 disabled:opacity-50 disabled:hover:scale-100
                 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <FileDown className="w-5 h-5" />
        )}
        Generate Diagram
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 
                    flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DiagramOptions;
