using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Controllers
{
    [ApiController]
    [Route("app/job-applications")]
    public class JobAppController : ControllerBase
    {
        [HttpGet("search/{jobTitle}/{jobLocation}")]
        public List<string> JobAppSearch([FromRoute] string jobTitle, [FromRoute] string jobLocation)
        {
            return new List<string>() { "11", "22", "33" };
        }
    }
}
