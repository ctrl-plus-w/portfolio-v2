import { useEffect, useState } from 'react';

const queries = {
  sm: `(min-width: 640px)`,
  md: `(min-width: 768px)`,
  lg: `(min-width: 1024px)`,
  xl: `(min-width: 1280px)`,
  '2xl': `(min-width: 1536px) `,
};

type QueryType = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const useMediaQuery = (query: QueryType): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(queries[query]);
    console.log(queries[query]);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const onResize = () => setMatches(media.matches);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
