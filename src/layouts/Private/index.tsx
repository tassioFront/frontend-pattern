import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./Private'));
export default function Private() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Component />
    </Suspense>
  );
}
