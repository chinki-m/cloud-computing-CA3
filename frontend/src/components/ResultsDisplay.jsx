import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, Server, Database, Lock, Network, Cloud, Terminal, 
  FolderOpen, GitMerge, Milestone, Gauge, Clock, DollarSign, 
  TrendingUp, HelpCircle, Copy, Check, Award, EyeOff
} from 'lucide-react';

export default function ResultsDisplay({ data, onCopy }) {
  const [copied, setCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      case 'hard': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      default: return 'text-slate-300 border-brandBorder bg-brandCard';
    }
  };

  const getScalabilityColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'mvp': return 'text-slate-300 border-brandBorder bg-brandCard';
      case 'startup': return 'text-brandSecondary border-brandSecondary/25 bg-brandSecondary/10';
      case 'production': return 'text-brandPrimary border-brandPrimary/25 bg-brandPrimary/10';
      default: return 'text-slate-300 border-brandBorder bg-brandCard';
    }
  };

  // Safely grab nested structures
  const frontend = data.frontend || {};
  const backend = data.backend || {};
  const db = data.database || {};
  const auth = data.authentication || {};
  const apis = data.apis_integrations?.recommended_services || [];
  const hosting = data.hosting || {};
  const deploy = data.deployment || {};
  const folder = data.folder_structure?.hierarchy || '';
  const architecture = data.architecture?.explanation || '';
  const roadmap = data.roadmap || {};
  const difficulty = data.difficulty?.level || 'Medium';
  const timeline = data.timeline?.estimate || '4 weeks';
  const cost = data.cost?.estimate || 'Free Tier';
  const scalability = data.scalability?.level || 'MVP';
  const rationale = data.why_these_choices?.explanation || '';
  const whyNot = data.why_not_these || [];
  const score = data.score || { overall: 90, performance: 90, scalability: 90, learning_curve: 90, community_support: 90, cost: 90 };

  return (
    <div id="results-section" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24 text-left">
      {/* Result Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brandPrimary font-mono">Analysis Report</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 font-sans mt-1">Your Customized Stack</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-brandBorder bg-brandCard hover:border-brandBorderActive text-slate-300 hover:text-slate-100 flex items-center gap-2 transition-all duration-200"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-brandSecondary" />}
            <span>{copied ? 'Copied Stack' : 'Copy Recommendation'}</span>
          </button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Row 1: High Level Metrics */}
        <motion.div variants={cardVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase font-mono tracking-wider">Difficulty</span>
              <Gauge className="w-4 h-4 text-brandPrimary" />
            </div>
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border w-fit font-sans mt-2 ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase font-mono tracking-wider">Est. Timeline</span>
              <Clock className="w-4 h-4 text-brandSecondary" />
            </div>
            <span className="text-base font-extrabold text-slate-100 font-sans mt-2">{timeline}</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase font-mono tracking-wider">Monthly Cost</span>
              <DollarSign className="w-4 h-4 text-brandPrimary" />
            </div>
            <span className="text-base font-extrabold text-slate-100 font-sans mt-2">{cost}</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase font-mono tracking-wider">Scalability</span>
              <TrendingUp className="w-4 h-4 text-brandSecondary" />
            </div>
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border w-fit font-sans mt-2 ${getScalabilityColor(scalability)}`}>
              {scalability}
            </span>
          </div>
        </motion.div>

        {/* Row 2: Core Stack Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend Card */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brandPrimary mb-4">
                <Layers className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-100 font-sans">Frontend</h3>
              </div>
              <p className="text-lg font-bold text-slate-200 mb-2 font-sans">{frontend.recommendation || 'React (Vite)'}</p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">{frontend.reason}</p>
            </div>
            {frontend.alternative && (
              <div className="mt-4 pt-4 border-t border-brandBorder">
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block mb-1">Alternative Option</span>
                <span className="text-xs text-slate-400 font-sans">{frontend.alternative}</span>
              </div>
            )}
          </motion.div>

          {/* Backend Card */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brandSecondary mb-4">
                <Server className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-100 font-sans">Backend</h3>
              </div>
              <p className="text-lg font-bold text-slate-200 mb-2 font-sans">{backend.recommendation || 'FastAPI'}</p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">{backend.reason}</p>
            </div>
            {backend.alternative && (
              <div className="mt-4 pt-4 border-t border-brandBorder">
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block mb-1">Alternative Option</span>
                <span className="text-xs text-slate-400 font-sans">{backend.alternative}</span>
              </div>
            )}
          </motion.div>

          {/* Database & Auth Card */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-brandPrimary mb-4">
                <Database className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-100 font-sans">Database & Auth</h3>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-200 mb-1 font-sans">{db.recommendation || 'PostgreSQL'}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{db.reason}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-brandBorder flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brandMuted/40 border border-brandBorder">
                <Lock className="w-4 h-4 text-brandSecondary" />
              </div>
              <div>
                <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block">Authentication</span>
                <span className="text-xs font-semibold text-slate-300 font-sans">{auth.recommendation || 'Supabase Auth'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 3: APIs, Hosting, and Deployment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* APIs & Integrations */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl md:col-span-1 flex flex-col">
            <div className="flex items-center gap-2 text-brandSecondary mb-4">
              <Network className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-slate-100 font-sans">APIs & Services</h3>
            </div>
            {apis.length > 0 ? (
              <ul className="space-y-3 flex-grow">
                {apis.map((api, idx) => (
                  <li key={idx} className="text-xs text-slate-350 leading-relaxed font-sans flex items-start gap-2">
                    <span className="text-brandPrimary mt-1 shrink-0">•</span>
                    <span>{api}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 font-sans">No additional APIs recommended.</p>
            )}
          </motion.div>

          {/* Hosting */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brandPrimary mb-4">
                <Cloud className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-100 font-sans">Hosting Strategy</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block">Frontend Host</span>
                  <span className="text-xs font-semibold text-slate-300 font-sans">{hosting.frontend || 'Vercel'}</span>
                </div>
                <div>
                  <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block">Backend Host</span>
                  <span className="text-xs font-semibold text-slate-300 font-sans">{hosting.backend || 'Render'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deployment (Docker & CI/CD) */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-brandSecondary mb-4">
                <Terminal className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-100 font-sans">Deployment Workflow</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block">CI/CD Setup</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{deploy.cicd || 'GitHub Actions'}</p>
                </div>
                <div>
                  <span className="text-2xs font-mono uppercase tracking-wider text-slate-500 block">Docker Advice</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{deploy.docker || 'Not required for MVP'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 4: Folder Structure & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Folder Structure */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col">
            <div className="flex items-center gap-2 text-brandPrimary mb-4">
              <FolderOpen className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-slate-100 font-sans">Folder Structure</h3>
            </div>
            <pre className="p-4 rounded-xl border border-brandBorder/80 bg-[#070410]/85 text-xs text-[#C4B5FD] font-mono leading-relaxed overflow-x-auto whitespace-pre flex-grow text-left">
              {folder || 'src/\n├── components/\n├── App.jsx\n└── index.css'}
            </pre>
          </motion.div>

          {/* Architecture Layout */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl flex flex-col">
            <div className="flex items-center gap-2 text-brandSecondary mb-4">
              <GitMerge className="w-5 h-5 shrink-0 animate-pulse" />
              <h3 className="text-base font-bold text-slate-100 font-sans">Architecture Explanation</h3>
            </div>
            <div className="p-4 rounded-xl border border-brandBorder/80 bg-[#070410]/40 flex-grow text-left">
              <p className="text-xs text-slate-350 leading-relaxed font-sans whitespace-pre-wrap">{architecture}</p>
            </div>
          </motion.div>
        </div>

        {/* Row 5: Development Roadmap */}
        <motion.div variants={cardVariants} className="glass-panel p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-2 text-brandPrimary mb-6">
            <Milestone className="w-5 h-5 shrink-0" />
            <h3 className="text-base font-bold text-slate-100 font-sans">Development Roadmap</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-brandBorder/40 bg-brandCard/40">
              <span className="text-2xs font-mono uppercase tracking-wider text-brandSecondary block mb-1">Phase 1</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{roadmap.phase_1 || 'Repo initiation'}</p>
            </div>
            <div className="p-4 rounded-xl border border-brandBorder/40 bg-brandCard/40">
              <span className="text-2xs font-mono uppercase tracking-wider text-brandSecondary block mb-1">Phase 2</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{roadmap.phase_2 || 'APIs development'}</p>
            </div>
            <div className="p-4 rounded-xl border border-brandBorder/40 bg-brandCard/40">
              <span className="text-2xs font-mono uppercase tracking-wider text-brandSecondary block mb-1">Phase 3</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{roadmap.phase_3 || 'Frontend wiring'}</p>
            </div>
            <div className="p-4 rounded-xl border border-brandBorder/40 bg-brandCard/40">
              <span className="text-2xs font-mono uppercase tracking-wider text-brandSecondary block mb-1">Phase 4</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{roadmap.phase_4 || 'Production tests'}</p>
            </div>
          </div>
        </motion.div>

        {/* Row 6: Advisory & Why Not Alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why These Choices */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl text-left">
            <div className="flex items-center gap-2 text-brandPrimary mb-4">
              <HelpCircle className="w-5 h-5 shrink-0 text-brandSecondary" />
              <h3 className="text-base font-bold text-slate-100 font-sans">Why These Choices?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{rationale}</p>
          </motion.div>

          {/* Why NOT These? */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-3xl text-left">
            <div className="flex items-center gap-2 text-brandPrimary mb-4">
              <EyeOff className="w-5 h-5 shrink-0 text-brandPrimary" />
              <h3 className="text-base font-bold text-slate-100 font-sans">Why NOT These?</h3>
            </div>
            <ul className="space-y-3">
              {whyNot.length > 0 ? (
                whyNot.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-300 leading-relaxed font-sans flex items-start gap-2">
                    <span className="text-brandPrimary mt-0.5 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400 font-sans">Standard stacks recommended with standard reasoning.</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Row 7: Stack Scoring */}
        <motion.div variants={cardVariants} className="glass-panel p-6 md:p-8 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-brandSecondary">
              <Award className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-slate-100 font-sans">Architecture Assessment</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans uppercase font-mono tracking-wider">Overall Suitability Score</span>
              <span className="text-xl font-extrabold text-brandPrimary font-sans">{score.overall}/100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Performance</span>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-2 rounded-full bg-brandMuted border border-brandBorder overflow-hidden">
                  <div className="h-full bg-brandPrimary rounded-full" style={{ width: `${score.performance}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-200 font-mono w-8 text-right">{score.performance}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Scalability</span>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-2 rounded-full bg-brandMuted border border-brandBorder overflow-hidden">
                  <div className="h-full bg-brandSecondary rounded-full" style={{ width: `${score.scalability}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-200 font-mono w-8 text-right">{score.scalability}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Learning Curve</span>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-2 rounded-full bg-brandMuted border border-brandBorder overflow-hidden">
                  <div className="h-full bg-brandPrimary rounded-full" style={{ width: `${score.learning_curve}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-200 font-mono w-8 text-right">{score.learning_curve}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Community Support</span>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-2 rounded-full bg-brandMuted border border-brandBorder overflow-hidden">
                  <div className="h-full bg-brandSecondary rounded-full" style={{ width: `${score.community_support}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-200 font-mono w-8 text-right">{score.community_support}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <span className="text-2xs font-mono uppercase tracking-wider text-slate-400">Cost Efficiency</span>
              <div className="flex items-center gap-3">
                <div className="flex-grow h-2 rounded-full bg-brandMuted border border-brandBorder overflow-hidden">
                  <div className="h-full bg-brandPrimary rounded-full" style={{ width: `${score.cost}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-200 font-mono w-8 text-right">{score.cost}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
