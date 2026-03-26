import AiCaseStudyTemplate from '@/components/case-studies/AiCaseStudyTemplate';
import { aiCaseStudies } from '@/config/caseStudies';

const CaseStudyExpenseReceipt = () => (
  <AiCaseStudyTemplate project={aiCaseStudies.expenseReceiptAutomation} />
);

export default CaseStudyExpenseReceipt;
