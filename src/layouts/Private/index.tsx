import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./Private'));
export default function Private() {
  return (
    <Suspense
      fallback={<RouterFallback text="Getting that amazing data to you xD" />}
    >
      <Component />
    </Suspense>
  );
}
