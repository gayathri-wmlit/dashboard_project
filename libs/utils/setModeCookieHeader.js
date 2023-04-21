const cookieName = process.env.MODE_COOKIE_NAME;
const cookieMaxAge = process.env.COOKIE_MAX_AGE;
const cookiePath = '/';
const SameSite = 'Strict';
const cookieSecure = process.env.COOKIE_SECURE;

export default function setModeCookieHeader(mode = '') {
  let cookie;

  if (mode) {
    cookie = `${cookieName}=${mode};Max-Age=${cookieMaxAge};Path=${cookiePath};HttpOnly;SameSite=${SameSite};`;
  } else {
    cookie = `${cookieName}='';Max-Age=0;Path=${cookiePath};HttpOnly;SameSite=${SameSite};Secure`;
  }

  if (cookieSecure) {
    cookie = `${cookie}Secure;`;
  }
  return [cookie];
}
