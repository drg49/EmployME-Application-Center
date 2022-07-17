using System;

namespace EmployME_Application_Center.Models.JobApplications
{
    public class JobAppSearchResponse
    {
        public string AppId { get; set; }
        public string CompanyName { get; set; }
        public string JobLocation { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}
