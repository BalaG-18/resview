import type { AnalysisResult } from '@/lib/types';
import ScoreCard from './score-card';
import SummaryCard from './summary-card';
import GapsCard from './gaps-card';
import RecommendationsCard from './recommendations-card';
import { motion } from 'framer-motion';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <motion.div variants={itemVariants}>
        <ScoreCard score={result.score} reasoning={result.reasoning} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SummaryCard summary={result.matchSummary} />
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-2">
         <GapsCard skillGaps={result.skillGaps} />
      </motion.div>
      <motion.div variants={itemVariants} className="md:col-span-2">
        <RecommendationsCard recommendations={result.recommendations} />
      </motion.div>
    </motion.div>
  );
};

export default ResultsDashboard;
