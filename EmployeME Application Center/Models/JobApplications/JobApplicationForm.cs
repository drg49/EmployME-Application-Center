namespace EmployME_Application_Center.Models.JobApplications
{
    /// <summary>
    /// A filled out job application form, submitted by the user
    /// </summary>
    public class JobApplicationForm
    {
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public int Age { get; set; }

        public string AvailableStartDate { get; set; }

        public string Certifications { get; set; }

        public bool ContactPreviousEmployer { get; set; }
    }
}
