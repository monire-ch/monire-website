import { useParams } from 'react-router-dom';
import CaseStudyTemplate from '@/components/case-studies/CaseStudyTemplate';
import { caseStudiesBySlug } from '@/config/caseStudies';
import NotFound from './NotFound';

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? caseStudiesBySlug[slug] : undefined;

  if (!project) return <NotFound />;

  return <CaseStudyTemplate project={project} />;
};

export default CaseStudyPage;
