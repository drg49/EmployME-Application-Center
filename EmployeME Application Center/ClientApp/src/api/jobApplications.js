export function searchForJobApplications(jobTitle, jobLocation) {
  return fetch(`app/job-applications/search/${jobTitle}/${jobLocation}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
      }
  }).then((response) => response.ok ? response.json() : Promise.reject(response))
}