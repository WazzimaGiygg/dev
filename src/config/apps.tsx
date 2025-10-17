import React from 'react';
import RecentArticles from '@/components/apps/RecentArticles';
import CreateArticle from '@/components/apps/CreateArticle';
import SearchArticles from '@/components/apps/SearchArticles';
import MyContributions from '@/components/apps/MyContributions';
import AdvancedSearch from '@/components/apps/AdvancedSearch';
import UserProfile from '@/components/apps/UserProfile';
import { AppWindow, FilePlus, Search, User, ListChecks, SearchCode } from 'lucide-react';

export interface AppConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ReactNode;
  defaultSize: { width: number; height: number };
}

export const APPS_CONFIG: Record<string, AppConfig> = {
  'artigos': {
    id: 'artigos',
    title: 'Artigos Recentes',
    icon: AppWindow,
    component: <RecentArticles />,
    defaultSize: { width: 800, height: 500 },
  },
  'novo-artigo': {
    id: 'novo-artigo',
    title: 'Criar Artigo',
    icon: FilePlus,
    component: <CreateArticle />,
    defaultSize: { width: 600, height: 550 },
  },
  'buscar-artigos': {
    id: 'buscar-artigos',
    title: 'Buscar Artigos',
    icon: Search,
    component: <SearchArticles />,
    defaultSize: { width: 900, height: 600 },
  },
  'minhas-contribuicoes': {
    id: 'minhas-contribuicoes',
    title: 'Contribuições',
    icon: ListChecks,
    component: <MyContributions />,
    defaultSize: { width: 600, height: 500 },
  },
  'busca-avancada': {
    id: 'busca-avancada',
    title: 'Busca Avançada',
    icon: SearchCode,
    component: <AdvancedSearch />,
    defaultSize: { width: 500, height: 400 },
  },
  'perfil': {
    id: 'perfil',
    title: 'Meu Perfil',
    icon: User,
    component: <UserProfile />,
    defaultSize: { width: 700, height: 550 },
  },
};
