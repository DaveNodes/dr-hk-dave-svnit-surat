import { Bot, Cpu, Layers, Settings } from "lucide-react";
import { motion } from "motion/react";
import { useResearchInterests } from "../hooks/useQueries";

const FALLBACK_INTERESTS = [
  "Additive Manufacturing Processes",
  "3D printing filaments & raw materials",
  "Composite polymer extrusion",
  "Clay and concrete 3D printing",
  "Unconventional Machining processes",
  "Micro machining processes",
  "Modeling & optimization of machining processes",
  "Robotics & Automation",
];

const researchGroups = [
  {
    label: "Additive Manufacturing",
    icon: Layers,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    indices: [0, 1, 2, 3],
  },
  {
    label: "Machining & Automation",
    icon: Settings,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    indices: [4, 5, 6, 7],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ResearchSection() {
  const { data: interests } = useResearchInterests();
  const allInterests =
    interests && interests.length > 0 ? interests : FALLBACK_INTERESTS;

  return (
    <section className="py-20 bg-section-alt pt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-gold font-body text-sm uppercase tracking-widest font-semibold mb-2">
            Areas of Expertise
          </p>
          <h2 className="section-title text-3xl sm:text-4xl text-navy mb-4 gold-underline inline-block">
            Research Interests
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-2xl mt-6">
            Spanning advanced manufacturing technologies, precision machining,
            and intelligent automation systems — with a focus on materials,
            processes, and process optimization.
          </p>
        </motion.div>

        {/* Research Groups */}
        <div className="grid md:grid-cols-2 gap-8">
          {researchGroups.map((group, groupIdx) => {
            const Icon = group.icon;
            const groupInterests = group.indices
              .map((i) => allInterests[i])
              .filter(Boolean);

            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: groupIdx * 0.15 }}
                className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden"
              >
                {/* Group Header */}
                <div className="px-6 pt-6 pb-4 border-b border-border flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${group.bgColor} ${group.borderColor} border flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${group.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-navy text-lg">
                    {group.label}
                  </h3>
                </div>

                {/* Interest Tags */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-6 flex flex-wrap gap-2.5"
                >
                  {groupInterests.map((interest) => (
                    <motion.span
                      key={interest}
                      variants={itemVariants}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-section-alt border border-border text-foreground text-sm font-body font-medium hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 cursor-default"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "8+", label: "Research Areas" },
            { value: "20+", label: "Years Experience" },
            { value: "100+", label: "Publications" },
            { value: "30+", label: "PhD Students" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-border p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-navy">
                {stat.value}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
