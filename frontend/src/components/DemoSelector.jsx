import React from 'react';
import { Play } from 'lucide-react';

export default function DemoSelector({ onSelectDemo }) {
  const demos = [
    {
      name: "Netflix Clone",
      description: "A subscription video streaming application with content categorization, catalog search, user profiles, video player controls, and Stripe billing integration.",
      project_type: "Web App",
      experience_level: "Intermediate",
      team_size: "Small Team",
      expected_users: "10K+"
    },
    {
      name: "Spotify",
      description: "An audio streaming system with song upload dashboard, search, custom playlists creation, persistent audio player widget state, and real-time social activity feed.",
      project_type: "Web App",
      experience_level: "Advanced",
      team_size: "Small Team",
      expected_users: "10K+"
    },
    {
      name: "Instagram",
      description: "A social media feed with media uploads, image resizing filters, post likes, comments, user activity timelines, and push notifications.",
      project_type: "Mobile App",
      experience_level: "Advanced",
      team_size: "Small Team",
      expected_users: "100K+"
    },
    {
      name: "Uber",
      description: "A ride-sharing application with real-time driver tracking on maps, matching algorithms, push notifications, and credit card payments.",
      project_type: "Mobile App",
      experience_level: "Advanced",
      team_size: "Large Team",
      expected_users: "100K+"
    },
    {
      name: "Swiggy",
      description: "A food delivery platform containing restaurant menus, cart management, checkout forms, driver dispatch tracking, and Stripe gateway transactions.",
      project_type: "Web App",
      experience_level: "Intermediate",
      team_size: "Small Team",
      expected_users: "10K+"
    },
    {
      name: "Hospital Management System",
      description: "An internal database dashboard for hospital personnel to schedule patient appointments, track medical logs, manage inventory, and export invoice billing reports.",
      project_type: "Dashboard",
      experience_level: "Intermediate",
      team_size: "Solo",
      expected_users: "Under 100"
    },
    {
      name: "Expense Tracker",
      description: "A personal finance calculator showing monthly limits, pie charts categorization, database records, and CSV expense history exports.",
      project_type: "SaaS",
      experience_level: "Beginner",
      team_size: "Solo",
      expected_users: "Under 100"
    },
    {
      name: "AI Chatbot",
      description: "A chatbot application leveraging LLMs to help users write code commits, explain pull request changes, and search file structures.",
      project_type: "AI Project",
      experience_level: "Intermediate",
      team_size: "Solo",
      expected_users: "1K+"
    },
    {
      name: "Portfolio Website",
      description: "A lightweight personal profile site displaying contact info, animations, projects gallery, and form inquiries.",
      project_type: "Portfolio",
      experience_level: "Beginner",
      team_size: "Solo",
      expected_users: "Under 100"
    }
  ];

  return (
    <div id="demo-presets" className="max-w-4xl mx-auto px-6 pt-4 pb-2 scroll-mt-24">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Play className="w-4 h-4 text-brandPrimary shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider font-mono">Quick Demo Presets</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo) => (
            <button
              key={demo.name}
              onClick={() => onSelectDemo(demo)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-brandCard/40 border border-brandBorder text-slate-300 hover:text-slate-100 hover:bg-brandCard hover:border-brandBorderActive transition-all duration-200"
            >
              {demo.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
