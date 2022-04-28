using System;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Models
{
    public partial class Users
    {
        public Users()
        {
            Employee = new HashSet<Employee>();
            JobApplications = new HashSet<JobApplications>();
            Reminders = new HashSet<Reminders>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public DateTime? UploadDate { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<JobApplications> JobApplications { get; set; }
        public virtual ICollection<Reminders> Reminders { get; set; }
    }
}
