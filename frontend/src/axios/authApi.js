import axiosInstance from "./axiosInstance";

export const loginUser = (formData) => {
  return axiosInstance.post("/auth/login", formData);
};

export const signupUser = (formData) => {
  return axiosInstance.post("/auth/signup", formData, { headers: { "Content-Type": "application/json" } });
}

export const twoFactorAuth = (formdata) => {
  return axiosInstance.post("/auth/two-factor-auth", formdata  );
}

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/get-current-user");
}