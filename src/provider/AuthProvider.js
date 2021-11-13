import axios from "axios";
import decodeJwt from "jwt-decode";

export const AuthProvider = {
  login: ({ username, devicetoken, devicetype, otpCode }) => {
    const request = {
      method: "POST",
      url: "https://kgdevnode.khelgully.com/noauth-api/v1/login/user",
      data: {
        username,
        devicetoken,
        devicetype,
        otp: otpCode,
      },
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    return axios(request)
      .then((response) => {
        if (response?.data?.results?.token) {
          const token = response?.data?.results?.token;

          const decodedToken = decodeJwt(token);
          localStorage.setItem("token", token);
          localStorage.setItem("permissions", decodedToken.permissions);

          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
        } else {
          //   alert("Please enter your OTP");
        }

        return response?.data?.results?.json();
      })
      .catch((err) => {});
  },

  checkError: (error) => {
    /* ... */
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    return Promise.resolve();
  },
  getIdentity: () => {
    /* ... */
  },
  getPermissions: () => {
    const role = localStorage.getItem("permissions");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
