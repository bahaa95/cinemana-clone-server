import 'dotenv/config';
import 'module-alias/register';
import { App } from './app';
import { setupStaffRoles } from '@/features/staffRoles';

const app = new App(3030, [setupStaffRoles()]);
app.listen();
