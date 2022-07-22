export function searchForJobApplications(jobTitle, jobLocation, pageSize, page) {
  return fetch("app/job-applications/search", {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ jobTitle, jobLocation, pageSize, page })
  }).then((response) => response.ok ? response.json() : Promise.reject(response))
}

export function getjobApplication(appId) {
  return fetch(`app/job-applications/get-job-app/${appId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
      },
  })
}
