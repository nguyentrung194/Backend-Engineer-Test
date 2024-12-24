import { chunk as lodashChunk } from 'lodash';

/**
 * executeAsyncChunk
 * @param array
 * @param chunkSize
 * @param asyncExecutor
 * @param callback: Hàm này thực thi sau khi asyncExecutor thực thi xong cho mỗi chunk
 */
export const executeAsyncChunk = async function <T, R, C>(
  array: T[],
  chunkSize: number,
  asyncExecutor: (chunk: T[]) => Promise<R>,
  callback?: (rs: R, chunk: T[]) => Promise<C> | C,
) {
  if (chunkSize < 1) {
    throw Error('Chunk size must be greater than 0');
  }

  const chunks = lodashChunk(array, chunkSize);
  const result: R[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const rs = await asyncExecutor(chunk);

    // exec callback
    if (callback) {
      const callbackResult = callback(rs, chunk);
      if (callbackResult instanceof Promise) {
        await callbackResult;
      }
    }

    result.push(rs);
  }

  return result;
};

export const sleep = async (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
