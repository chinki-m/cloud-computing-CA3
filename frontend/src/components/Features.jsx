import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, ShieldCheck, GitBranch } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: <Layers className="w-5 h-5 text-brandPrimary" />,
      title: "Smart Stack Recommendation",
      description: "Tailored combination of libraries, frameworks, and databases matching team size, expertise, and target scale."
    },
    {
      icon: <Cpu className="w-5 h-5 text-brandSecondary" />,
      title: "Architecture Planning",
      description: "Simple architecture definitions explaining system interaction layers, data directions, and hosting boundaries."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brandPrimary" />,
      title: "Deployment Guidance",
      description: "Actionable hosting suggestions for frontend/backend, Docker configuration guides, and CI/CD parameters."
    },
    {
      icon: <GitBranch className="w-5 h-5 text-brandSecondary" />,
      title: "Project Roadmap",
      description: "Four-phase, time-estimated action plan laying out steps from initial repository creation to a successful deployment."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-brandMuted/40 border border-brandBorder flex items-center justify-center mb-1 shrink-0">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
