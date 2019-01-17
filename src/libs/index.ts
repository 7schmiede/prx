export * from './files';
export * from './editors';

import Store from './config/store/store';
import { Injector } from '@common';

export const store = Injector.resolve<Store>(Store);
