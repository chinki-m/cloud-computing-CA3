import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';

export default function GeneratorForm({
  description,
  setDescription,
  projectType,
  setProjectType,
  experience,
  setExperience,
  teamSize,
  setTeamSize,
  expectedUsers,
  setExpectedUsers,
  isGenerating,
  onSubmit,
  onClear
}) {
  const projectTypes = [
    "Web App", "Mobile App", "SaaS", "AI Project", 
    "Dashboard", "Portfolio", "DevOps Tool", "Desktop App", "Other"
  ];
  const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
  const teamSizes = ["Solo", "Small Team", "Large Team"];
  const userScales = ["Under 100", "1K+", "10K+", "100K+"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit();
  };

  return (
    <div id="generator-form" className="max-w-4xl mx-auto px-6 py-4 scroll-mt-24">
      <form onSubmit={handleFormSubmit} className="glass-panel p-6 md:p-8 rounded-3xl shadow-premium text-left relative overflow-hidden">
        {/* Glow corners */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-brandPrimary/10 blur-xl pointer-events-none" />

        {/* Text Area */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="description" className="text-sm font-semibold text-slate-200 font-sans">
            Project Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I want to build an AI-powered food delivery application with real-time tracking and online payments."
            className="w-full px-4 py-3 rounded-xl border border-brandBorder bg-[#0F0B1F]/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brandBorderActive focus:ring-1 focus:ring-brandPrimary/20 transition-all font-sans text-sm resize-none leading-relaxed"
            required
            disabled={isGenerating}
          />
        </div>

        {/* Grid Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Project Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="project-type" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Project Type
            </label>
            <select
              id="project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-[#0F0B1F]/80 text-slate-200 focus:outline-none focus:border-brandBorderActive transition-all font-sans text-sm cursor-pointer"
              disabled={isGenerating}
            >
              {projectTypes.map(type => (
                <option key={type} value={type} className="bg-brandCard text-slate-100">{type}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-2">
            <label htmlFor="experience" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Experience Level
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-[#0F0B1F]/80 text-slate-200 focus:outline-none focus:border-brandBorderActive transition-all font-sans text-sm cursor-pointer"
              disabled={isGenerating}
            >
              {experienceLevels.map(lvl => (
                <option key={lvl} value={lvl} className="bg-brandCard text-slate-100">{lvl}</option>
              ))}
            </select>
          </div>

          {/* Team Size */}
          <div className="flex flex-col gap-2">
            <label htmlFor="team-size" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Team Size
            </label>
            <select
              id="team-size"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-[#0F0B1F]/80 text-slate-200 focus:outline-none focus:border-brandBorderActive transition-all font-sans text-sm cursor-pointer"
              disabled={isGenerating}
            >
              {teamSizes.map(size => (
                <option key={size} value={size} className="bg-brandCard text-slate-100">{size}</option>
              ))}
            </select>
          </div>

          {/* Expected Users */}
          <div className="flex flex-col gap-2">
            <label htmlFor="expected-users" className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Expected Scale
            </label>
            <select
              id="expected-users"
              value={expectedUsers}
              onChange={(e) => setExpectedUsers(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brandBorder bg-[#0F0B1F]/80 text-slate-200 focus:outline-none focus:border-brandBorderActive transition-all font-sans text-sm cursor-pointer"
              disabled={isGenerating}
            >
              {userScales.map(scale => (
                <option key={scale} value={scale} className="bg-brandCard text-slate-100">{scale}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isGenerating || !description.trim()}
            className="flex-grow py-3.5 rounded-xl font-bold bg-brandPrimary hover:bg-brandHover text-white flex items-center justify-center gap-2 shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-brandSecondary animate-pulse" />
            <span>Generate Stack</span>
          </button>
          
          <button
            type="button"
            onClick={onClear}
            disabled={isGenerating}
            className="p-3.5 rounded-xl border border-brandBorder bg-brandCard hover:bg-brandCard/60 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear Form"
            aria-label="Clear Form"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
