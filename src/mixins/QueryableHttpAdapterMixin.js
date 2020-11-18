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

import type { HttpRequestParamsT } from '../types/HttpRequestParamsT';

import type { QueryInterface } from '../interfaces/QueryInterface';

export default (Module) => {
  const {
    assert,
    initializeMixin, meta, property, method,
    Utils: {_, inflect, request}
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin<
      R = Class<*>, T = object
    > extends BaseClass {
      @meta static object = {};

      @property queryEndpoint: string = 'query';

      @method async takeBy(acRecord: R, query: object, options: ?object = {}): Promise<T[]> {
        const params = {};
        params.requestType = 'takeBy';
        params.recordName = acRecord.name;
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
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          return body[this.recordMultipleName(acRecord.name)];
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
      }

      @method async takeMany(acRecord: R, ids: Array<string | number>): Promise<T[]> {
        const params = {};
        params.requestType = 'takeBy';
        params.recordName = acRecord.name;
        params.query = {
          $filter: {
            '@doc.id': {
              $in: ids
            }
          }
        };
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          return body[this.recordMultipleName(acRecord.name)];
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
      }

      @method async takeAll(acRecord: R): Promise<T[]> {
        const params = {};
        params.requestType = 'takeAll';
        params.recordName = acRecord.name;
        params.query = {};
        const requestObj = this.requestFor(params);
        const res = await this.makeRequest(requestObj);
        assert(res.status < 400, `Request failed with status ${res.status} ${res.message}`);
        let { body } = res;
        if ((body != null) && body !== '') {
          if (_.isString(body)) {
            body = JSON.parse(body);
          }
          return body[this.recordMultipleName(acRecord.name)];
        } else {
          assert.fail("Record payload has not existed in response body.");
        }
      }

      @method async includes(acRecord: R, id: string | number, collectionFullName: string): Promise<boolean> {
        const voQuery = {
          $forIn: {
            '@doc': collectionFullName
          },
          $filter: {
            '@doc.id': {
              $eq: id
            }
          },
          $limit: 1,
          $return: '@doc'
        };
        const result = await this.executeQuery(await this.parseQuery(voQuery));
        return result != null && result[0] != null
      }

      @method async length(acRecord: R, collectionFullName: string): Promise<number> {
        const voQuery = {
          $forIn: {
            '@doc': collectionFullName
          },
          $count: true
        };
        const result = await this.executeQuery(await this.parseQuery(voQuery));
        return result != null
          ? result[0] != null
            ? result[0].count
            : 0
          : 0;
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
        let vsUrl = super.makeURL(... arguments);
        if (isQueryable && (this.queryEndpoint != null)) {
          vsUrl += encodeURIComponent(this.queryEndpoint);
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
          case 'takeBy':
            return this.urlForTakeBy(recordName, query);
          case 'takeAll':
          case 'take':
          case 'push':
          case 'remove':
          case 'override':
          default:
            return super.buildURL(... arguments);
        }
      }

      @method async parseQuery(
        acRecord: R, aoQuery: object | QueryInterface
      ): Promise<object | string | QueryInterface> {
        const params = {};
        switch (false) {
          case aoQuery.$remove == null:
            if (aoQuery.$forIn != null) {
              params.requestType = 'removeBy';
              params.recordName = acRecord.name;
              params.query = aoQuery;
              params.isCustomReturn = true;
              return params;
            }
            break;
          case aoQuery.$patch == null:
            if (aoQuery.$forIn != null) {
              params.requestType = 'patchBy';
              params.recordName = acRecord.name;
              params.query = aoQuery;
              params.isCustomReturn = true;
              return params;
            }
            break;
          default:
            params.requestType = 'query';
            params.recordName = acRecord.name;
            params.query = aoQuery;
            params.isCustomReturn = (aoQuery.$collect != null) || (aoQuery.$count != null) || (aoQuery.$sum != null) || (aoQuery.$min != null) || (aoQuery.$max != null) || (aoQuery.$avg != null) || (aoQuery.$remove != null) || aoQuery.$return !== '@doc';
            return params;
        }
      }

      @method async executeQuery(
        acRecord: R, aoQuery: object | string | QueryInterface
      ): Promise<Array<?T>> {
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
          return body;
        } else {
          return [];
        }
      }
    }
    return Mixin;
  });
}
