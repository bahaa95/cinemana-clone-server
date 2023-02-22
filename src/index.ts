import 'dotenv/config';
import 'module-alias/register';
import { App } from './app';
import { setupStaffRoles } from '@/features/staffRoles';
import { setupStaff } from '@/features/staff';

const app = new App(3030, [setupStaffRoles(), setupStaff()]);
app.listen();
