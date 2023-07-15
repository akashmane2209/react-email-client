import urlJoin from "url-join";

export const BASE_URL = "https://flipkart-email-mock.vercel.app/";

export const EMAIL_URLS = {
  EMAIL: () => urlJoin(BASE_URL),
};
