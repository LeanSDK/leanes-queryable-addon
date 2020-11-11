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

import type {
  ContextInterface, ResourceListResultT,
} from '@leansdk/leanes-restful-addon/src';

export default (Module) => {
  const {
    initializeMixin, meta, method, action, chains, property,
    Utils: { _, joi, assert }
  } = Module.NS;

  const MAX_LIMIT = 50;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    @chains(['query', 'list'], function () {
      // this.initialHook('requiredAuthorizationHeader', {
      //   only: ['query']
      // });
      this.initialHook('parseBody', {
        only: ['query']
      });
      this.beforeHook('getQuery', {
        only: ['list']
      });
      this.beforeHook('showNoHiddenByDefault', {
        only: ['list']
      });
    })
    class Mixin extends BaseClass {
      @meta static object = {};

      @property needsLimitation: boolean = true;
      @property listQuery: object = {};

      @method getQuery(...args) {
        this.listQuery = JSON.parse(this.context.query['query'] || "{}");
        return args;
      }

      // удалить т.к. узкоспециализированный метод и может быть вынесен в миксин для работы с транзакциями в аддоне поддерживающем транзакции
      // @method async writeTransaction(asAction: string, aoContext: ContextInterface): Promise<boolean> {
      //   let result = await super.writeTransaction(asAction, aoContext);
      //   if (result) {
      //     if (asAction === 'query') {
      //       const parse = require('co-body'); // TODO
      //       const body = await parse(aoContext.req);
      //       const { query } = body != null ? body : {};
      //       if (query != null) {
      //         const key = _.findKey(query, (v, k) =>
      //           k === '$patch' || k === '$remove'
      //         );
      //         result = key != null;
      //       }
      //     }
      //   }
      //   return result;
      // }

      @method async showNoHiddenByDefault(...args) {
        if (this.listQuery.$filter != null) {
          if (!/.*\@doc\.isHidden.*/.test(JSON.stringify(this.listQuery.$filter))) {
            this.listQuery.$filter = {
              $and: [
                this.listQuery.$filter,
                {
                  '@doc.isHidden': false
                }
              ]
            };
          }
        } else {
          this.listQuery.$filter = {
            '@doc.isHidden': false
          };
        }
        return args;
      }

      @action async list(): Promise<ResourceListResultT> {
        const receivedQuery = _.pick(this.listQuery, ['$filter', '$sort', '$limit', '$offset']);
        // console.log('dfdfdf', receivedQuery);
        const voQuery = Module.NS.Query.new().forIn({
          '@doc': this.collection.collectionFullName()
        }).return('@doc');
        if (receivedQuery.$filter) {
          (() => {
            const { error } = joi.validate(receivedQuery.$filter, joi.object());
            if (error != null) {
              return this.context.throw(400, 'ValidationError: `$filter` must be an object', error.stack);
            }
          })();
          voQuery.filter(receivedQuery.$filter);
        }
        if (receivedQuery.$sort) {
          (() => {
            const { error } = joi.validate(receivedQuery.$sort, joi.array().items(joi.object()));
            if (error != null) {
              return this.context.throw(400, 'ValidationError: `$sort` must be an array');
            }
          })();
          receivedQuery.$sort.forEach(function(item) {
            return voQuery.sort(item);
          });
        }
        if (receivedQuery.$limit) {
          (() => {
            const { error } = joi.validate(receivedQuery.$limit, joi.number());
            if (error != null) {
              return this.context.throw(400, 'ValidationError: `$limit` must be a number', error.stack);
            }
          })();
          voQuery.limit(receivedQuery.$limit);
        }
        if (receivedQuery.$offset) {
          (() => {
            const { error } = joi.validate(receivedQuery.$offset, joi.number());
            if (error != null) {
              return this.context.throw(400, 'ValidationError: `$offset` must be a number', error.stack);
            }
          })();
          voQuery.offset(receivedQuery.$offset);
        }
        const limit = voQuery.$limit != null ? Number(voQuery.$limit) : MAX_LIMIT;
        // console.log('sdfsdfsd voQuery', voQuery, limit);
        if (this.needsLimitation) {
          voQuery.limit((() => {
            switch (false) {
              case !(limit > MAX_LIMIT):
              case !(limit < 0):
              case !isNaN(limit):
                return MAX_LIMIT;
              default:
                return limit;
            }
          })());
        } else if (!isNaN(limit)) {
          voQuery.limit(limit);
        }
        // console.log('sdfsdfsd voQuery 22', voQuery);
        const skip = voQuery.$offset != null ? Number(voQuery.$offset) : 0;
        voQuery.offset((() => {
          switch (false) {
            case !(skip < 0):
            case !isNaN(skip):
              return 0;
            default:
              return skip;
          }
        })());
        // console.log('sdfsdfsd voQuery 33', voQuery, voQuery.$offset);
        const vlItems = await (await this.collection.query(voQuery)).toArray();
        return {
          meta: {
            pagination: {
              limit: voQuery.$limit != null ? voQuery.$limit : 'not defined',
              offset: voQuery.$offset != null ? voQuery.$offset : 'not defined'
            }
          },
          items: vlItems
        };
      }

      @action async query(): Promise<Array> {
        const { body } = this.context.request;
        return await (await this.collection.query(body.query)).toArray();
      }
    }
    return Mixin;
  });
}
