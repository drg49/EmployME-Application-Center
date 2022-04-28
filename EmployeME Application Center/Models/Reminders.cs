using System;
using System.Collections.Generic;

namespace EmployeME_Application_Center.Models
{
    public partial class Reminders
    {
        public int ReminderKey { get; set; }
        public string ReminderMessage { get; set; }
        public DateTime? UploadDate { get; set; }
        public int? UserId { get; set; }
        public int? CheckStatus { get; set; }

        public virtual Users User { get; set; }
    }
}
