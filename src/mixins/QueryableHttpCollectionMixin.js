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
  CollectionInterface, RecordInterface, CursorInterface,
  HttpRequestParamsT,
} from '@leansdk/leanes-mapper-addon/src';
// import type {
//  RequestArgumentsT, LegacyResponseInterface, AxiosResponse,
// } from '@leansdk/leanes/src/types/RequestT';

import type { QueryInterface } from '../interfaces/QueryInterface';

export default (Module) => {
  const {
    Collection, Cursor,
    assert,
    initializeMixin, meta, property, method,
    Utils: {_, inflect, request}
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass: Class<Collection>) => {
    @initializeMixin
    class Mixin<
      D = RecordInterface
    > extends BaseClass {
      @meta static object = {};

      @property queryEndpoint: string = 'query';

      @method async takeBy(query: object, options: ?object = {}): Promise<CursorInterface<CollectionInterface<D>, D>> {
        const params = {};
        params.requestType = 'takeBy';
        params.recordName = this.delegate.name;
        params.query = {
          $filter: query
        };
        if (options.$sort != null) {
          params.query.$sort = options.$sort;
        }
        if (options.$limit != null) {
          params.query.$limit = options.$limit;
        }
        if (options.$offset != null) {
          params.query.$offset = options.$offset;
        }
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        let voCursor;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          const vhRecordsData = body[this.recordMultipleName()];
          voCursor = Cursor.new(this, vhRecordsData);
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
        return voCursor;
      }

      @method async includes(id: string | number): Promise<boolean> {
        const voQuery = {
          $forIn: {
            '@doc': this.collectionFullName()
          },
          $filter: {
            '@doc.id': {
              $eq: id
            }
          },
          $limit: 1,
          $return: '@doc'
        };
        // console.log('>?>?> HttpCollectionMixin::includes before query');
        return await (await this.query(voQuery)).hasNext();
      }

      @method async length(): Promise<number> {
        const voQuery = {
          $forIn: {
            '@doc': this.collectionFullName()
          },
          $count: true
        };
        return (await (await this.query(voQuery)).first()).count;
      }

      @method methodForRequest(params: HttpRequestParamsT): string {
        const { requestType } = params;
        switch (requestType) {
          case 'query':
            return 'POST';
          case 'patchBy':
            return 'POST';
          case 'removeBy':
            return 'POST';
          case 'takeBy':
            return 'GET';
          default:
            return super.methodForRequest(params);
        }
      }

      @method dataForRequest(params: HttpRequestParamsT): ?object {
        const { recordName, snapshot, requestType, query } = params;
        if (requestType === 'query' || requestType === 'patchBy' || requestType === 'removeBy') {
          return {query};
        } else {
          return super.dataForRequest(params);
        }
      }

      @method makeURL(recordName: string, query: ?object, id: ?(number | string), isQueryable: ?boolean): string {
        const url = [];
        const prefix = this.urlPrefix();
        if (recordName) {
          const path = this.pathForType(recordName);
          if (path) {
            url.push(path);
          }
        }
        if (isQueryable && (this.queryEndpoint != null)) {
          url.push(encodeURIComponent(this.queryEndpoint));
        }
        if (prefix) {
          url.unshift(prefix);
        }
        if (id != null) {
          url.push(id);
        }
        let vsUrl = url.join('/');
        if (!this.host && vsUrl && vsUrl.charAt(0) !== '/') {
          vsUrl = '/' + vsUrl;
        }
        if (query != null) {
          query = encodeURIComponent(JSON.stringify(query != null ? query : ''));
          vsUrl += `?query=${query}`;
        }
        return vsUrl;
      }

      @method urlForQuery(recordName: string, query: ?object): string {
        return this.makeURL(recordName, null, null, true);
      }

      @method urlForPatchBy(recordName: string, query: ?object): string {
        return this.makeURL(recordName, null, null, true);
      }

      @method urlForRemoveBy(recordName: string, query: ?object): string {
        return this.makeURL(recordName, null, null, true);
      }

      @method urlForTakeBy(recordName: string, query: ?object): string {
        return this.makeURL(recordName, query, null, false);
      }

      @method buildURL(
        recordName: string,
        snapshot: ?object,
        id: ?(number | string),
        requestType: string,
        query: ?object
      ): string {
        switch (requestType) {
          case 'query':
            return this.urlForQuery(recordName, query);
          case 'patchBy':
            return this.urlForPatchBy(recordName, query);
          case 'removeBy':
            return this.urlForRemoveBy(recordName, query);
          case 'takeAll':
            return this.urlForTakeAll(recordName, query);
          case 'takeBy':
            return this.urlForTakeBy(recordName, query);
          case 'take':
            return this.urlForTake(recordName, id);
          case 'push':
            return this.urlForPush(recordName, snapshot);
          case 'remove':
            return this.urlForRemove(recordName, id);
          case 'override':
            return this.urlForOverride(recordName, snapshot, id);
          default:
            const vsMethod = `urlFor${inflect.camelize(requestType)}`;
            return typeof this[vsMethod] === "function" ? this[vsMethod](recordName, query, snapshot, id) : undefined;
        }
      }

      @method async parseQuery(
        aoQuery: object | QueryInterface
      ): Promise<object | string | QueryInterface> {
        // console.log('>>?? HttpCollectionMixin::parseQuery enter');
        const params = {};
        switch (false) {
          case aoQuery.$remove == null:
            if (aoQuery.$forIn != null) {
              params.requestType = 'removeBy';
              params.recordName = this.delegate.name;
              params.query = aoQuery;
              params.isCustomReturn = true;
              return params;
            }
            break;
          case aoQuery.$patch == null:
            if (aoQuery.$forIn != null) {
              params.requestType = 'patchBy';
              params.recordName = this.delegate.name;
              params.query = aoQuery;
              params.isCustomReturn = true;
              return params;
            }
            break;
          default:
            params.requestType = 'query';
            params.recordName = this.delegate.name;
            params.query = aoQuery;
            params.isCustomReturn = (aoQuery.$collect != null) || (aoQuery.$count != null) || (aoQuery.$sum != null) || (aoQuery.$min != null) || (aoQuery.$max != null) || (aoQuery.$avg != null) || (aoQuery.$remove != null) || aoQuery.$return !== '@doc';
            return params;
        }
      }

      @method async executeQuery(
        aoQuery: object | string | QueryInterface
      ): Promise<CursorInterface<?CollectionInterface<D>, *>> {
        // console.log('>>?? HttpCollectionMixin::executeQuery enter');
        const requestObj = this.requestFor(aoQuery);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          if (!_.isArray(body)) {
            body = [body];
          }
          if (aoQuery.isCustomReturn) {
            // console.log('>>?? HttpCollectionMixin::executeQuery aoQuery.isCustomReturn');
            return (Cursor.new(null, body): Cursor<null, *>);
          } else {
            // console.log('>>?? HttpCollectionMixin::executeQuery NOT aoQuery.isCustomReturn');
            return (Cursor.new(this, body): Cursor<CollectionInterface<D>, D>);
          }
        } else {
          // console.log('>>?? HttpCollectionMixin::executeQuery EMPTY CURSOR');
          return (Cursor.new(null, []): Cursor<null, *>);
        }
      }
    }
    return Mixin;
  });
}
