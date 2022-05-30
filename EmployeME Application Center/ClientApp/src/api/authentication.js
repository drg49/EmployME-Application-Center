export function login(loginParams) {
  return fetch("app/users/login", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(loginParams)
  }).then((response) => response.ok ? response.json() : Promise.reject(response))
}