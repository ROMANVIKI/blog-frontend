// utils/auth.js
export const getTokens = () => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  }
  return { accessToken: null, refreshToken: null };
};

export const isAuthenticated = () => {
  const { accessToken } = getTokens();
  return !!accessToken;
};

export const logout = () => {
  localStorage.clear();
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.href = "/login";
};
