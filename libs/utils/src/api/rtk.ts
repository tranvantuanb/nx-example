import { CommonInterfaces } from '../interfaces/index';

export type GenerateTagOptions = 'General' | 'WithIDs';

function generalWithIds<
  R extends CommonInterfaces.ApiResponse<K> | undefined,
  T extends string,
  K extends Array<{ id: string | number }>
>(result: R, tagType: T) {
  return result?.data
    ? [...result.data.map(({ id }) => ({ type: tagType, id })), tagType]
    : [tagType];
}

function listWithIds<
  R extends CommonInterfaces.ApiResponse<K> | undefined,
  T extends string,
  K extends Array<{ id: string | number }>
>(result: R, tagType: T) {
  return result?.data
    ? [
        ...result.data.map(({ id }) => ({ type: tagType, id })),
        { type: tagType, id: 'LIST' },
      ]
    : [{ type: tagType, id: 'LIST' }];
}

function single<
  R extends CommonInterfaces.ApiResponse<K> | undefined,
  T extends string,
  K extends { id: string | number }
>(result: R, tagType: T) {
  return result?.data ? [{ type: tagType, id: result.data.id }] : [tagType];
}

function general<T extends string>(...tagType) {
  return tagType;
}

function list<T extends string>(tagType: T) {
  return [{ type: tagType, id: 'LIST' }];
}

export const generateTags = {
  general,
  generalWithIds,
  list,
  listWithIds,
  single,
};
