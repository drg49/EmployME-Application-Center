
namespace EmployME_Application_Center.Models.JobApplications
{
    public class JobAppSearchRequest
    {
        public string JobTitle { get; set; }

        public string JobLocation { get; set; }

        public int PageSize { get; set; }

        public int Page { get; set; }

    }
}
