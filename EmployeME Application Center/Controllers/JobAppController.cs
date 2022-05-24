using EmployME_Application_Center.Data;
using EmployME_Application_Center.Models.JobApplications;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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
        public IQueryable<JobApplication> JobAppSearch([FromBody] JobAppSearchRequest request)
        {
            IQueryable<JobApplication> results = Enumerable.Empty<JobApplication>().AsQueryable();

            if (!string.IsNullOrEmpty(request.JobTitle) && !string.IsNullOrEmpty(request.JobLocation))
            {
                results = from job in _context.JobApplications
                            where job.JobTitle.Contains(request.JobTitle)
                            && job.JobLocation.Contains(request.JobLocation)
                            select job;
            }
            else if (string.IsNullOrEmpty(request.JobLocation))
            {
                results = _context.JobApplications.Where((job) => job.JobTitle.Contains(request.JobTitle));
            }
            else if (string.IsNullOrEmpty(request.JobTitle))
            {
                results = _context.JobApplications.Where((job) => job.JobLocation.Contains(request.JobLocation));
            }

            return results;
        }
    }
}
