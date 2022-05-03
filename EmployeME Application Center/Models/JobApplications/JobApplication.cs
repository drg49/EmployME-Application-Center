using System;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Models.JobApplications
{
    public partial class JobApplication
    {
        public JobApplication()
        {
            CustomJobAppQuestions = new HashSet<CustomJobAppQuestions>();
        }

        public string AppId { get; set; }
        public string DefaultQuestions { get; set; }
        public string CompanyName { get; set; }
        public string JobLocation { get; set; }
        public string JobTitle { get; set; }
        public DateTime? UploadDate { get; set; }
        public int? UserId { get; set; }
        public string Status { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<CustomJobAppQuestions> CustomJobAppQuestions { get; set; }
    }
}
