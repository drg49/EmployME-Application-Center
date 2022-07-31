using EmployME_Application_Center.Models.JobApplications;
using System.Data.Entity.ModelConfiguration;

namespace EmployME_Application_Center.Data.EF
{
    public class CustomJobAppQuestionsConfig : EntityTypeConfiguration<CustomJobAppQuestion>
    {
        public CustomJobAppQuestionsConfig()
        {
            this.ToTable("CustomJobAppQuestions");

            this.HasKey<int>(e => e.Id);

            this.Property(e => e.Question)
                    .HasColumnName("Question")
                    .HasMaxLength(200);

            this.Property(e => e.InputFieldType)
                    .HasColumnName("InputFieldType")
                    .HasMaxLength(20);

            this.Property(e => e.Required)
                    .HasColumnName("Required");

            this.Property(e => e.AppId)
                   .HasColumnName("AppId")
                   .HasMaxLength(10);

            this.Property(e => e.UploadDate)
                .HasColumnType("datetime");
        }
    }
}
