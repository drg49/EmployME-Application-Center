using Microsoft.EntityFrameworkCore;
using EF6 = System.Data.Entity;
using EmployME_Application_Center.Models.JobApplications;
using EmployME_Application_Center.Data.EF;
using EmployME_Application_Center.Models.Users;

namespace EmployME_Application_Center.Data
{
    public partial class EmployMeDbContext : DbContext
    {
        public EmployMeDbContext(DbContextOptions<EmployMeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<JobApplication> JobApplications { get; set; }
        public virtual DbSet<User> AppCenterUsers { get; set; }

        protected void OnModelCreating(EF6.DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new JobApplicationConfig());
            modelBuilder.Configurations.Add(new UserConfig());
        }
    }
}
