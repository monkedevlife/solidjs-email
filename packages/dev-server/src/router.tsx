import type { RouterHistory } from '@tanstack/solid-router';
import { createRouter } from '@tanstack/solid-router';
import { routeTree } from './routeTree.gen';

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routeTree,
    history,
    defaultPreload: 'intent',
    defaultErrorComponent: (err) => <p>{err.error.message}</p>,
    defaultNotFoundComponent: () => <p>Not found</p>,
    disableGlobalCatchBoundary: true,
  });
}

declare module '@tanstack/solid-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
