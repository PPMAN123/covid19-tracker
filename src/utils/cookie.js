const checkCookieExistence = (key) =>
  document.cookie.split(';').some((item) => item.trim().startsWith(`${key}=`));

const getCookieValue = (key) => {
  if (checkCookieExistence(key)) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      .split('=')[1];
  } else {
    return false;
  }
};

const setCookieValue = (key, value) => {
  document.cookie = `${key}=${value};`;
};

export { checkCookieExistence, getCookieValue, setCookieValue };
