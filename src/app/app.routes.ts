import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'starter',
    pathMatch: 'full',
  },
  {
    path: 'starter',
    loadComponent: () =>
      import('./text-based-gemini/text-based-gemini.component').then(
        (m) => m.TextBasedGeminiComponent
      ),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./feature/chat/chat.component').then((m) => m.ChatComponent),
  },
];
