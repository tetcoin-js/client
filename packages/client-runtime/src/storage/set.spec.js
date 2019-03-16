// Copyright 2017-2019 @polkadot/client-runtime authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
/* eslint camelcase: 0 */

import { logger } from '@polkadot/util';

import index from '.';

const l = logger('test');

describe('set_storage', () => {
  let heap;
  let db;
  let set_storage;

  beforeEach(() => {
    const uint8 = new Uint8Array([0x53, 0x61, 0x79, 0x48, 0x65, 0x6c, 0x6c, 0x6f]);

    heap = {
      get: (ptr, len) => uint8.subarray(ptr, ptr + len)
    };

    db = {
      put: jest.fn()
    };

    set_storage = index({ l, heap, db }).set_storage;
  });

  it('sets the value into storage', () => {
    set_storage(0, 3, 3, 5);

    expect(
      db.put
    ).toHaveBeenCalledWith(
      new Uint8Array([0x53, 0x61, 0x79]),
      new Uint8Array([72, 101, 108, 108, 111])
    );
  });
});
