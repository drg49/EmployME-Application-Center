using EmployME_Application_Center.Models.Users;
using System.Data.Entity.ModelConfiguration;

namespace EmployME_Application_Center.Data.EF
{
    public class UserConfig : EntityTypeConfiguration<User>
    {
        public UserConfig()
        {
            this.ToTable("AppCenterUsers");

            this.HasKey<int>(e => e.UserId);

            this.Property(e => e.FirstName)
                    .HasColumnName("FirstName")
                    .HasMaxLength(50);

            this.Property(e => e.LastName)
                    .HasColumnName("LastName")
                    .HasMaxLength(50);

            this.Property(e => e.Username)
                    .HasColumnName("Username")
                    .HasMaxLength(15);

            this.Property(e => e.Email)
                    .HasColumnName("Email")
                    .HasMaxLength(320);

            this.Property(e => e.Password)
                   .HasColumnName("Password")
                   .HasMaxLength(100);

            this.Property(e => e.Birthday)
                   .HasColumnName("Birthday")
                   .HasMaxLength(10);

            this.Property(e => e.UploadDate)
                .HasColumnType("datetime");
        }
    }
}
