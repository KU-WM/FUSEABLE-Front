export const REST_API_KEY = "a8c0f54a40e17de117e2f618394a3e20";
export const REDIRECT_URL = "http://localhost:3000/redirect";
export const LOGOUT_REDIRECT_URL = "http://localhost:3000/logout";
export const LoginURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
export const LogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URL}`