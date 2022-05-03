export function searchForJobApplications(jobTitle, jobLocation) {
  return fetch("app/job-applications/search", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({jobTitle, jobLocation})
  }).then((response) => response.ok ? response.json() : Promise.reject(response))
}
