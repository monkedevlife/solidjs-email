import type { RequestEvent } from '@solidjs/web';
import { createMemoryHistory, RouterProvider } from '@tanstack/solid-router';
import { createAppRouter } from './router';

export default async function setup(event: RequestEvent) {
  const url = new URL(event.request.url);
  const router = createAppRouter(
    createMemoryHistory({ initialEntries: [url.pathname + url.search] }),
  );

  await router.load();

  return () => <RouterProvider router={router} />;
}
