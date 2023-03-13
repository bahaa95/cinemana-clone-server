import 'dotenv/config';
import 'module-alias/register';
import { App } from './app';
import { setupStaffRoles } from '@/features/staffRoles';
import { setupStaff } from '@/features/staff';
import { setupCategories } from '@/features/categories';
import { setupAdministrators } from '@/features/administrators';
import { setupVideos } from '@/features/videos';
import { setupSeasons } from '@/features/seasons';
import { setupEpisodes } from '@/features/episodes';
import { setupGroups } from '@/features/groups';

const app = new App(3030, [
  setupStaffRoles(),
  setupStaff(),
  setupCategories(),
  setupAdministrators(),
  setupVideos(),
  setupSeasons(),
  setupEpisodes(),
  setupGroups(),
]);
app.listen();
