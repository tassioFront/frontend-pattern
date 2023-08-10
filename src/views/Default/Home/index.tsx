import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./Home'));
export default function Home() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Component />
    </Suspense>
  );
}
