import { type CookieKVValue, type CookieEntity } from '~/server/types';
import { db } from '~/server/utils/db';

export type CookieKVKey = string;

export async function setMpCookie(key: CookieKVKey, data: CookieKVValue): Promise<boolean> {
  try {
    await db.read();
    db.data.cookies[key] = data;
    db.data.latestAuthKey = key;
    await db.write();

    return true;
  } catch (err) {
    console.error('db.write call failed:', err);
    return false;
  }
}

export async function getMpCookie(key: CookieKVKey): Promise<CookieKVValue | null> {
  await db.read();
  const value = db.data.cookies[key];
  console.log(db.data)
  return value || null;
}
