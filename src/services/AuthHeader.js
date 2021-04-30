export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Access token auth header method ", user.accessToken);
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
