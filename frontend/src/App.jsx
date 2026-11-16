import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DemoSelector from './components/DemoSelector';
import GeneratorForm from './components/GeneratorForm';
import LoadingScreen from './components/LoadingScreen';
import ResultsDisplay from './components/ResultsDisplay';
import Toast from './components/Toast';

export default function App() {
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState('Web App');
  const [experience, setExperience] = useState('Intermediate');
  const [teamSize, setTeamSize] = useState('Solo');
  const [expectedUsers, setExpectedUsers] = useState('Under 100');

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  const handleSelectDemo = (demo) => {
    setDescription(demo.description);
    setProjectType(demo.project_type);
    setExperience(demo.experience_level);
    setTeamSize(demo.team_size);
    setExpectedUsers(demo.expected_users);
    showToast(`Loaded ${demo.name} presets.`, 'info');

    // Smooth scroll to the form after setting presets
    setTimeout(() => {
      const formEl = document.getElementById('generator-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleClear = () => {
    setDescription('');
    setProjectType('Web App');
    setExperience('Intermediate');
    setTeamSize('Solo');
    setExpectedUsers('Under 100');
    setResult(null);
    showToast('Form cleared successfully.', 'info');
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setResult(null);

    // Scroll to the loading area
    setTimeout(() => {
      const loaderEl = document.getElementById('loading-screen');
      if (loaderEl) {
        loaderEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    const payload = {
      project_description: description,
      project_type: projectType,
      experience_level: experience,
      team_size: teamSize,
      expected_users: expectedUsers
    };

    // Read backend URL from environment variables, fallback to local default
    let apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      apiUrl = 'https://stackwise-p33f.onrender.com';
    }
    // Remove trailing slash if present
    apiUrl = apiUrl.replace(/\/$/, "");

    try {
      const response = await fetch(`${apiUrl}/generate-stack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResult(data);
      showToast('Architecture recommendation generated!', 'success');

      // Scroll to the results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      console.error(err);
      showToast(err.message || 'Failed to connect to backend service.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    if (!result) return;

    const formatted = `StackWise Architecture Recommendation
==========================================
Tagline: Build Smarter. Choose Better.
------------------------------------------
Frontend: ${result.frontend?.recommendation || 'N/A'}
- Reason: ${result.frontend?.reason || 'N/A'}
- Alternative: ${result.frontend?.alternative || 'N/A'}

Backend: ${result.backend?.recommendation || 'N/A'}
- Reason: ${result.backend?.reason || 'N/A'}
- Alternative: ${result.backend?.alternative || 'N/A'}

Database: ${result.database?.recommendation || 'N/A'}
- Reason: ${result.database?.reason || 'N/A'}

Authentication: ${result.authentication?.recommendation || 'N/A'}

APIs & Services:
${result.apis_integrations?.recommended_services?.map(api => `  - ${api}`).join('\n') || '  None'}

Hosting Strategy:
- Frontend: ${result.hosting?.frontend || 'N/A'}
- Backend: ${result.hosting?.backend || 'N/A'}

Deployment Pipeline:
- CI/CD: ${result.deployment?.cicd || 'N/A'}
- Container: ${result.deployment?.docker || 'N/A'}

Difficulty Level: ${result.difficulty?.level || 'N/A'}
Estimated Timeline: ${result.timeline?.estimate || 'N/A'}
Monthly Hosting Costs: ${result.cost?.estimate || 'N/A'}
Scalability Standard: ${result.scalability?.level || 'N/A'}

Overall suitability rating: ${result.score?.overall || 90}/100
(Perf: ${result.score?.performance || 90}%, Scalability: ${result.score?.scalability || 90}%, Learning Curve: ${result.score?.learning_curve || 90}%)
------------------------------------------
Generated by StackWise Tech stack planner.
`;

    navigator.clipboard.writeText(formatted);
    showToast('Copied stack to clipboard!', 'success');
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brandBg text-slate-100 flex flex-col font-sans grid-bg relative">
      <Header />

      <main className="flex-grow pb-16">
        <Hero onScrollToSection={handleScrollToSection} />
        <Features />
        <DemoSelector onSelectDemo={handleSelectDemo} />

        <GeneratorForm
          description={description}
          setDescription={setDescription}
          projectType={projectType}
          setProjectType={setProjectType}
          experience={experience}
          setExperience={setExperience}
          teamSize={teamSize}
          setTeamSize={setTeamSize}
          expectedUsers={expectedUsers}
          setExpectedUsers={setExpectedUsers}
          isGenerating={isGenerating}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />

        {isGenerating && <LoadingScreen />}

        {result && !isGenerating && (
          <ResultsDisplay data={result} onCopy={handleCopyText} />
        )}
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-brandBorder/40 bg-brandCard/20 py-8 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} StackWise. Build Smarter. Choose Better.</p>
          <p className="text-slate-600">
            Powered by FastAPI & Google Gemini API
          </p>
        </div>
      </footer>

      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
