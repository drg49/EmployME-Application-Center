﻿using System.Net.Mail;

namespace EmployME_Application_Center.Security
{
    public class Validator
    {
        public bool ValidateEmail(string email)
        {
            if (email.Trim().EndsWith("."))
            {
                return false; 
            }
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
