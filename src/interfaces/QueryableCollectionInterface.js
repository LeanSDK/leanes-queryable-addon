// This file is part of leanes-queryable-addon.
//
// leanes-queryable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-queryable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-queryable-addon.  If not, see <https://www.gnu.org/licenses/>.

import type { QueryInterface } from './QueryInterface';
import type { CursorInterface } from '@leansdk/leanes-mapper-addon/src';

export interface QueryableCollectionInterface<
  C, D
> {
  findBy(query: object, options: ?object): Promise<CursorInterface<C, D>>;

  takeBy(query: object, options: ?object): Promise<CursorInterface<C, D>>;

  deleteBy(query: object): Promise<void>;

  destroyBy(query: object): Promise<void>;

  removeBy(query: object): Promise<void>;

  updateBy(query: object, properties: object): Promise<void>;

  patchBy(query: object, properties: object): Promise<void>;

  exists(query: object): Promise<boolean>;

  query(aoQuery: object | QueryInterface): Promise<QueryInterface>;

  parseQuery(aoQuery: object | QueryInterface): Promise<object | string | QueryInterface>;

  executeQuery(query: object | string | QueryInterface): Promise<CursorInterface<?C, *>>;
}
