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

import QueryTF from './query/Query';

import GenerateAutoincrementIdMixinTF from './mixins/GenerateAutoincrementIdMixin';
import QueryableCollectionMixinTF from './mixins/QueryableCollectionMixin';
import QueryableHttpAdapterMixinTF from './mixins/QueryableHttpAdapterMixin';
import QueryableResourceMixinTF from './mixins/QueryableResourceMixin';

export type { QueryInterface } from './interfaces/QueryInterface';
export type { QueryableCollectionInterface } from './interfaces/QueryableCollectionInterface';

export default (Module) => {
  const {
    Module: BaseModule,
    initializeMixin, meta,
  } = Module.NS;

  return ['QueryableAddon', (BaseClass: Class<BaseModule>) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @decorator hasEmbed = hasEmbed;
      @decorator hasEmbeds = hasEmbeds;
      @decorator relatedEmbed = relatedEmbed;
      @decorator relatedEmbeds = relatedEmbeds;
    }

    QueryTF(Mixin);

    GenerateAutoincrementIdMixinTF(Mixin);
    QueryableCollectionMixinTF(Mixin);
    QueryableHttpAdapterMixinTF(Mixin);
    QueryableResourceMixinTF(Mixin);

    return Mixin;
  }]
}
