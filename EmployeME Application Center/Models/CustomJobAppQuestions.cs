using EmployeME_Application_Center.Models.JobApplications;
using System;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Models
{
    public partial class CustomJobAppQuestions
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string InputFieldType { get; set; }
        public bool Required { get; set; }
        public DateTime? UploadDate { get; set; }
        public string AppId { get; set; }

        public virtual JobApplication App { get; set; }
    }
}
