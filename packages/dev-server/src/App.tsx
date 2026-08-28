import { RouterProvider } from '@tanstack/solid-router';
import { createAppRouter } from './router';
import './app.css';

const router = createAppRouter();

if (typeof window !== 'undefined') {
  await router.load();
}

export default function App() {
  return <RouterProvider router={router} />;
}
