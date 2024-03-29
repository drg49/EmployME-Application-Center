﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using EmployME_Application_Center.Data;
using EmployME_Application_Center.Models.JobApplications;

namespace EmployME_Application_Center.Controllers
{
    [ApiController]
    [Route("app/job-applications")]
    public class JobAppController : ControllerBase
    {
        private readonly EmployMeDbContext _context;
        public JobAppController(EmployMeDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Search for live job applications
        /// </summary>
        /// <param name="request">The search request containing the job app name & location</param>
        /// <returns>Job application search results</returns>
        [HttpPost("search")]
        public List<JobAppSearchResponse> JobAppSearch([FromBody] JobAppSearchRequest request)
        {
            var query = from job in _context.JobApplications
                        where job.Status == "Live"
                        select job;

            if (!string.IsNullOrEmpty(request.JobTitle))
            {
                query = query.Where((job) => job.JobTitle.Contains(request.JobTitle));
            }

            if (!string.IsNullOrEmpty(request.JobLocation))
            {
                query = query.Where((job) => job.JobLocation.Contains(request.JobLocation));
            }

            var result = query.Select(job => new JobAppSearchResponse
            {
                AppId = job.AppId,
                CompanyName = job.CompanyName,
                Description = job.Description,
                JobLocation = job.JobLocation,
                JobTitle = job.JobTitle,
                UploadDate = job.UploadDate
            });

            int total = result.Count();
            
            var skip = request.PageSize * (request.Page - 1);

            var canPage = skip < total;

            if (!canPage) {
                return new List<JobAppSearchResponse>();
            }

            return result.Skip(skip).Take(request.PageSize).ToList();
        }

        /// <summary>
        /// Search for a job by its app ID
        /// </summary>
        /// <returns>A job application</returns>
        [HttpGet("get-job-app/{appId}")]
        public IActionResult SelectJobApp([FromRoute] string appId)
        {
            try
            {
                var jobApp = _context.JobApplications.FirstOrDefault(x => x.AppId == appId && x.Status == "Live");

                if (jobApp != null)
                {
                    return Ok(jobApp);
                }
                else
                {
                    return BadRequest("This job application does not exist");
                }
            }
            catch
            {
                return BadRequest("The request has failed.");
            }
        }

        /// <summary>
        /// Get the custom questions of a job application
        /// </summary>
        /// <returns>A list of custom job app questions</returns>
        [HttpGet("get-custom-questions/{appId}")]
        public IActionResult GetCustomQuestions([FromRoute] string appId)
        {
            List<CustomJobAppQuestion> results = new List<CustomJobAppQuestion>();
            try
            {
                var query = from cjaq in _context.CustomJobAppQuestions
                            where cjaq.AppId == appId
                            select cjaq;

                results.AddRange(query);

                return Ok(results);
            }
            catch
            {
                return BadRequest("The request has failed.");
            }
        }

        /// <summary>
        /// User (job applicant) has filled out all fields and is submitting the job application
        /// </summary>
        /// <param name="jobAppForm">The filled out job application to be submitted</param>
        /// <returns>A status code of 200 if the request succeeded, or 400 if it failed</returns>
        [HttpPost("complete-job-app")]
        public IActionResult CompleteJobApplication([FromBody] JobApplicationForm jobAppForm)
        {
            
            try
            {

                return Ok();
            }
            catch
            {
                return BadRequest("The request has failed.");
            }
        }
    }
}
