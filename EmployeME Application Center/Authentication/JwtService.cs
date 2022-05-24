using System;
using System.Linq;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using EmployME_Application_Center.Data;
using EmployME_Application_Center.Models.Users;
using Microsoft.IdentityModel.Tokens;

namespace EmployME_Application_Center.Authentication
{
    public class JwtService
    {
        private readonly EmployMeDbContext _context;
        private readonly string secureKey = "a2pw0wjris32q245k2i29";

        public JwtService(EmployMeDbContext context)
        {
            _context = context;
        }

        public string Generate(int userId)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credentials);

            var payload = new JwtPayload(userId.ToString(), null, null, null, DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public User Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            int id = int.Parse(validatedToken.Issuer);
            User user = _context.Users.FirstOrDefault(u => u.UserId == id);

            return user;
        }
    }
}
