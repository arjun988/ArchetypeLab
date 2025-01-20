import React, { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { 
  Zap, 
  Layout, 
  Code, 
  FileCode, 
  Share2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ProductPage = ({ onGetStarted }) => {
  const { isDark } = useTheme();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '20px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Generate diagrams in seconds with our optimized processing engine.',
      gradient: 'from-violet-600 to-fuchsia-600'
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Multiple Formats',
      description: 'Export your diagrams in PNG, SVG, or PDF formats for any use case.',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Multiple Diagram Types',
      description: 'Support for PlantUML, Graphviz, Mermaid, Vega, and more.',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: <FileCode className="w-6 h-6" />,
      title: 'Code to Diagram',
      description: 'Convert your textual descriptions into beautiful, professional diagrams.',
      gradient: 'from-rose-600 to-pink-600'
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Easy Sharing',
      description: 'Download and share your diagrams with teammates instantly.',
      gradient: 'from-amber-600 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 fade-in">
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            <span className="text-sm font-medium text-gray-300">AI-Powered Diagram Generator</span>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Transform Text to Diagrams
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-400">
            ArchetypeLab converts your textual descriptions into professional diagrams using
            multiple diagram types and formats.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl backdrop-blur-sm fade-in
                bg-white/5 hover:bg-white/10
                border border-white/10
                transition-all duration-300 hover:scale-105
                shadow-lg hover:shadow-xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${feature.gradient}
                transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl fade-in
          bg-white/5 backdrop-blur-sm
          border border-white/10
          shadow-2xl">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Create Beautiful Diagrams?
          </h2>
          <p className="text-lg mb-8 text-gray-400">
            Start converting your ideas into visual representations today.
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl
              bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
              text-white font-medium 
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-105 hover:bg-[length:200%_200%]
              animate-gradient-x"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;