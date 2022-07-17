using System.Collections.Generic;
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

            //int pageSize = 10;
            //int page = 1;
            //int skip

            return query.Select(job => new JobAppSearchResponse
            {
                AppId = job.AppId,
                CompanyName = job.CompanyName,
                Description = job.Description,
                JobLocation = job.JobLocation,
                JobTitle = job.JobTitle,
                UploadDate = job.UploadDate
            }).ToList();
        }
    }
}
