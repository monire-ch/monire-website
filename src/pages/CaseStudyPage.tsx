import { useParams } from 'react-router-dom';
import AiCaseStudyTemplate from '@/components/case-studies/AiCaseStudyTemplate';
import WebCaseStudyTemplate from '@/components/case-studies/WebCaseStudyTemplate';
import { caseStudiesBySlug } from '@/config/caseStudies';
import NotFound from './NotFound';

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? caseStudiesBySlug[slug] : undefined;

  if (!project) return <NotFound />;

  if (project.kind === 'ai') {
    return <AiCaseStudyTemplate project={project} />;
  }

  return <WebCaseStudyTemplate project={project} />;
};

export default CaseStudyPage;
