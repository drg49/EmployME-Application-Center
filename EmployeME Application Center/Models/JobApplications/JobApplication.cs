using System;
using System.ComponentModel.DataAnnotations;

namespace EmployME_Application_Center.Models.JobApplications
{
    /// <summary>
    /// Job applications posted by companies
    /// </summary>
    public partial class JobApplication
    {
        [Key]
        public string AppId { get; set; }
        public string DefaultQuestions { get; set; }
        public string CompanyName { get; set; }
        public string JobLocation { get; set; }
        public string JobTitle { get; set; }
        public DateTime? UploadDate { get; set; }
        public int? UserId { get; set; }
        public string Status { get; set; }
        //public virtual Users User { get; set; }
        //public virtual ICollection<CustomJobAppQuestions> CustomJobAppQuestions { get; set; }
    }
}
