using System;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Models
{
    public partial class Employee
    {
        public int EmployeeKey { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public int? Age { get; set; }
        public string Department { get; set; }
        public int? Salary { get; set; }
        public DateTime? UploadDate { get; set; }
        public int? UserId { get; set; }

        public virtual Users User { get; set; }
    }
}
