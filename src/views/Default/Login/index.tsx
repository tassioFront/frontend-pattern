import RouterFallback from '@/components/RouterFallback/RouterFallback';
import { Suspense, lazy } from 'react';

const Component = lazy(async () => await import('./Login'));
export default function Login() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Component />
    </Suspense>
  );
}
