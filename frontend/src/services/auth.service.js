import * as baseHttpService from "./base-http.service";

export const signin = async (email, password) => {
  const result = await baseHttpService.post(`auth`, {
    email,
    password,
  });
  const accessToken = result.data.access_token;
  // const user = jwt(accessToken); // decode the user token
  // console.log(user);
  // localStorage.setItem("user", JSON.stringify(user));
  // baseHttpService.saveToken(accessToken);
  return accessToken;
};

export const signup = async (...createUserdata) => {
  await baseHttpService.post(`users`, { ...createUserdata });
};

export const signout = async () => {
  baseHttpService.removeToken();
};

export const forgotPassword = async (data) => {
  return baseHttpService.post(`auth/forgot-password`, {
    ...data,
    base_url: data.BASE_URL,
  });
};

export const resetPassword = async (data) => {
  return baseHttpService.post(`auth/reset-password`, data);
};
