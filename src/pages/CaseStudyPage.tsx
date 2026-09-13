import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CaseStudyTemplate from '@/components/case-studies/CaseStudyTemplate';
import { caseStudiesBySlug, type CaseStudyConfig } from '@/config/caseStudies';
import NotFound from './NotFound';

const mergeCaseStudyTranslation = (
  project: CaseStudyConfig,
  translatedProject: Partial<CaseStudyConfig> | string
): CaseStudyConfig => {
  if (!translatedProject || typeof translatedProject === 'string') return project;

  return {
    ...project,
    ...translatedProject,
    image: project.image,
    imageScrollable: project.imageScrollable,
    websiteUrl: project.websiteUrl,
    tools: translatedProject.tools ?? project.tools,
    sections: project.sections?.map((section, index) => {
      const translatedSection = translatedProject.sections?.[index];
      if (!translatedSection) return section;

      return {
        ...section,
        ...translatedSection,
        visualImage: section.visualImage
          ? {
              ...section.visualImage,
              ...translatedSection.visualImage,
              src: section.visualImage.src,
              scrollable: section.visualImage.scrollable,
            }
          : translatedSection.visualImage,
      };
    }),
    metrics: project.metrics?.map((metric, index) => ({
      ...metric,
      ...translatedProject.metrics?.[index],
    })),
    testimonial: project.testimonial
      ? {
          ...project.testimonial,
          ...translatedProject.testimonial,
        }
      : translatedProject.testimonial,
  };
};

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const project = slug ? caseStudiesBySlug[slug] : undefined;

  if (!project) return <NotFound />;

  const translatedProject = t(`caseStudiesContent.${slug}`, { returnObjects: true }) as Partial<CaseStudyConfig> | string;

  return <CaseStudyTemplate project={mergeCaseStudyTranslation(project, translatedProject)} />;
};

export default CaseStudyPage;
