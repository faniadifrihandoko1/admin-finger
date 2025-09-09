// lib/axios.ts
import axios from "axios";

export const axiosInterceptor = axios.create();

// // Flag to prevent multiple 401 modal triggers
// let hasTriggered401 = false;

// // Function to reset the 401 flag - should be called on logout and successful login
// export const reset401Flag = () => {
//   hasTriggered401 = false;
// };

axiosInterceptor.interceptors.request.use(config => {
  // const apiKey = Cookies.get("token");

    config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm91ZmFiZDk0QGdtYWlsLmNvbSIsImlhdCI6MTc1NzM5MzgxOCwiZXhwIjoxMDAwMTc1NjM5MzgxOH0.mkTvVaK1SECLiM9g-z6c5SsnTHvWTDxUs4Kl3AK20LQ`;

  return config;
});

// Response interceptor to handle token expiration
// axiosInterceptor.interceptors.response.use(
//   response => response,
//   error => {
//     const statusCode = error?.response?.status;

//     if (statusCode === 401 && !hasTriggered401) {
//       hasTriggered401 = true;
//       setTokenExpiredModal();
//     }

//     return Promise.reject(error);
//   }
// );
