const handleResponse = response => response.ok ? response.json() : Promise.reject(response);

export function login(loginParams) {
  return fetch("app/users/login", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(loginParams)
  }).then(handleResponse)
}

export function signUp(signUpParams) {
  return fetch("app/users/register", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(signUpParams)
  })
}

export function validateUser() {
  return fetch("app/users/validate", {
    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
  }).then(handleResponse)
}

export function logout() {
  return fetch("app/users/logout", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
  }).then(handleResponse)
}

export function updateUser(editData) {
  return fetch("app/users/update-user", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editData)
  }).then(handleResponse)
}