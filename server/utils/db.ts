import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { type CookieKVValue } from '~/server/types';

export interface Data {
    cookies: Record<string, CookieKVValue>;
    latestAuthKey: string;
}

const defaultData: Data = { cookies: {}, latestAuthKey: '' };
const adapter = new JSONFile<Data>('server/data/db.json');
export const db = new Low<Data>(adapter, defaultData);
