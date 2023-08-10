import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./About'));
export default function About() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Component />
    </Suspense>
  );
}
