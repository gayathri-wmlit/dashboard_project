import Cookie from 'js-cookie';

const isProd = process.env.NODE_ENV === 'production';
const cookieName = process.env.COOKIE_NAME || 'hawk-eye-token';

export const setCookie = (value, keepLoggedIn) => {
  if (keepLoggedIn) {
    Cookie.set(cookieName, value, { expires: 30, secure: isProd });
  } else {
    Cookie.set(cookieName, value, { expires: 1, secure: isProd });
  }
};

export const getCookieValue = (name) => (
  Cookie.get(name)
);

export const setCookieParams = (name, value) => (
  Cookie.set(name, value, { expires: 1 })
);

export const setFarExpireCookieParams = (name, valueny) => (
  Cookie.set(name, value, { expires: 365 })
);

export const deleteCookie = () => { Cookie.remove(cookieName); };
