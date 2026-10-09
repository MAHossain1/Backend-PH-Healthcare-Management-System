import { CookieOptions, Request, Response } from 'express';

const setCookie = (
  res: Response,
  key: string,
  value: string,
  options: CookieOptions,
) => {
  res.cookie(key, value, options);
};

const getCookie = (req: Request, key: string) => {
  if (!req?.cookies) return null; // guard
  return req.cookies[key] ?? null;
};

const clearCookie = (res: Response, key: string, options: CookieOptions) => {
  res.clearCookie(key, options);
};

export const CookieUtils = {
  setCookie,
  getCookie,
  clearCookie,
};
