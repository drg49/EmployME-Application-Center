using EmployeME_Application_Center.Data;
using EmployeME_Application_Center.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EmployeME_Application_Center.Controllers
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

        [HttpGet("search/{jobTitle}/{jobLocation}")]
        public List<string> JobAppSearch([FromRoute] string jobTitle, [FromRoute] string jobLocation)
        {
            Users test = _context.Users.FirstOrDefault((record) => record.FirstName == "Daniel");
            return new List<string>() { "11", "22", "33" };
        }
    }
}
