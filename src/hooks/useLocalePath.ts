import { useLocation } from 'react-router-dom';
import { getLocalizedPath } from '@/lib/localeRouting';

export const useLocalePath = () => {
  const location = useLocation();

  return (path: string) => getLocalizedPath(path, location.pathname);
};
