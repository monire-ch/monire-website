import { useEffect, useState } from 'react';

export function useFontsLoaded() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setLoaded(true));
    } else {
      setTimeout(() => setLoaded(true), 500);
    }
  }, []);

  return loaded;
}
