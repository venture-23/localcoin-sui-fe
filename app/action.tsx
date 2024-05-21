'use server';

import { cookies } from 'next/headers';

async function setCookieData(data: any) {
  try {
    const oneDay = 30 * 24 * 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneDay);
    console.log(data);
    cookies().set({
      name: 'local-coin',
      value: data,
      httpOnly: true,
      path: '/',
      expires: expirationDate
    });
  } catch (error) {
    throw new Error();
  }
}

async function getCookiedata() {
  try {
    const cookieStore = cookies();
    const data: any = cookieStore.get('local-coin');
    if (data?.value) {
      return data?.value;
    }
    return '';
  } catch (error) {
    throw new Error();
  }
}

async function deleteCookieData() {
  try {
    cookies().set({
      name: 'local-coin',
      value: '',
      httpOnly: true,
      path: '/',
      expires: new Date(0) // Setting expiration date to a past date to delete the cookie
    });
  } catch (error) {
    throw new Error();
  }
}

export { deleteCookieData, getCookiedata, setCookieData };

