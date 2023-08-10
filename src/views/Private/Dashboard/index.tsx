import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./Dashboard'));
export default function Dashboard() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Component />
    </Suspense>
  );
}
