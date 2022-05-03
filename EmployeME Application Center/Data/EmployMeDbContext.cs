using EmployeME_Application_Center.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeME_Application_Center.Data
{
    public partial class EmployMeDbContext : DbContext
    {

        public EmployMeDbContext(DbContextOptions<EmployMeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CustomJobAppQuestions> CustomJobAppQuestions { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<JobApplications> JobApplications { get; set; }
        public virtual DbSet<Reminders> Reminders { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomJobAppQuestions>(entity =>
            {
                entity.Property(e => e.AppId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.InputFieldType)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Question)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.App)
                    .WithMany(p => p.CustomJobAppQuestions)
                    .HasForeignKey(d => d.AppId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomJob__AppId__208CD6FA");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeKey)
                    .HasName("PK__Employee__8749E50AA064ECDD");

                entity.Property(e => e.Department).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Employee__UserId__31EC6D26");
            });

            modelBuilder.Entity<JobApplications>(entity =>
            {
                entity.HasKey(e => e.AppId)
                    .HasName("PK__JobAppli__8E2CF7F9E637457E");

                entity.Property(e => e.AppId).HasMaxLength(50);

                entity.Property(e => e.CompanyName).HasMaxLength(150);

                entity.Property(e => e.JobLocation).HasMaxLength(150);

                entity.Property(e => e.JobTitle).HasMaxLength(150);

                entity.Property(e => e.Status)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.JobApplications)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__JobApplic__UserI__05D8E0BE");
            });

            modelBuilder.Entity<Reminders>(entity =>
            {
                entity.HasKey(e => e.ReminderKey)
                    .HasName("PK__Reminder__742D5E4FE7863789");

                entity.Property(e => e.ReminderMessage).HasMaxLength(500);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reminders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Reminders__UserI__35BCFE0A");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__Users__1788CCACC4D6440E");

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Users__A9D10534DC649D61")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("UQ__Users__536C85E4E62E0513")
                    .IsUnique();

                entity.Property(e => e.CompanyName).HasMaxLength(150);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(320);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(15);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
