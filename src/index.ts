import 'dotenv/config';
import 'module-alias/register';
import { App } from './app';
import { setupStaffRoles } from '@/features/staffRoles';
import { setupStaff } from '@/features/staff';
import { setupCategories } from '@/features/categories';
import { setupAdministrators } from '@/features/administrators';

const app = new App(3030, [
  setupStaffRoles(),
  setupStaff(),
  setupCategories(),
  setupAdministrators(),
]);
app.listen();
