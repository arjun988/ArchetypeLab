import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Moon, Code, Settings } from 'lucide-react';
import DiagramGenerator from './components/DiagramGenerator';
import DiagramOptions from './components/DiagramOptions';
import ProductPage from './components/ProductPage';
import { ThemeProvider, useTheme } from './ThemeContext';

const ArchetypeLabPage = () => {
  const [diagramText, setDiagramText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [format, setFormat] = useState('png');
  const { toggleTheme } = useTheme(); // Remove isDark from useTheme()

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Settings button */}
      <button
        className="fixed top-4 left-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700/50 
                   backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-purple-500"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      <main className="container mx-auto px-4 py-10 relative">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Code className="w-6 h-6 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ArchetypeLab
            </h1>
          </div>
          <p className="text-gray-400">Generate and visualize diagrams with ease</p>
        </header>

        {/* Flex container for left and right sections */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <textarea
              value={diagramText}
              onChange={(e) => setDiagramText(e.target.value)}
              placeholder="Enter diagram code here ..."
              className="w-full h-40 p-4 rounded-lg bg-gray-900/50 border border-gray-700/50 
                         text-white placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-purple-500
                         transition-all duration-200"
            />
            <DiagramOptions
              setImageSrc={setImageSrc}
              diagramText={{ description: diagramText }}
              setDiagramText={setDiagramText}
              setFormat={setFormat}
            />
          </div>

          {/* Right Column */}
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
            <DiagramGenerator imageSrc={imageSrc} format={format} />
          </div>
        </div>
      </main>
    </div>
  );
};

const AppContent = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductPage onGetStarted={() => navigate('/archetypelabs')} />
        }
      />
      <Route path="/archetypelabs" element={<ArchetypeLabPage />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
