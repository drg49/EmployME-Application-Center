using System;
using System.Linq;
using EmployME_Application_Center.Data;
using EmployME_Application_Center.Models.Users;
using EmployME_Application_Center.Security;
using Microsoft.AspNetCore.Mvc;

namespace EmployeME_Application_Center.Controllers
{
    [ApiController]
    [Route("app/users")]
    public class UserController : ControllerBase
    {
        private readonly EmployMeDbContext _context;
        private readonly JwtService jwtService;

        // TODO: Use dependency injection instead
        private readonly Validator validator = new Validator();
        public UserController(EmployMeDbContext context)
        {
            _context = context;
            jwtService = new JwtService(context);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            User existingEmail = _context.AppCenterUsers.FirstOrDefault(u => u.Email == newUser.Email);
            User existingUser = _context.AppCenterUsers.FirstOrDefault(u => u.Username == newUser.Username);

            if (existingEmail != null)
            {
                return StatusCode(400, "Email already exists");
            }
            else if (existingUser != null)
            {
                return StatusCode(400, "Username already exists");
            }
            else if (!validator.ValidateEmail(newUser.Email))
            {
                return StatusCode(400, "Issue validating email");
            }

            User _newUser = new User() 
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                Birthday = newUser.Birthday,
                Username = newUser.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password),
                UploadDate = DateTime.Now
            };

            try
            {
                _context.AppCenterUsers.Add(_newUser);
                _context.SaveChanges();
                return Created("New user successfully added", _newUser);
            }
            catch(Exception e)
            {
                return StatusCode(400, "An error occured processing your request");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginAttempt)
        {
            User existingEmail = _context.AppCenterUsers.FirstOrDefault(u => u.Email == loginAttempt.Email);
            User existingUser = _context.AppCenterUsers.FirstOrDefault(u => u.Username == loginAttempt.Username);

            if (existingEmail is null && loginAttempt.Email != string.Empty || existingUser is null && loginAttempt.Username != string.Empty)
            {
                return BadRequest("Invalid credentials");
            }
            else if (existingEmail is null && existingUser is null)
            {
                return BadRequest("Username/Email is blank");
            }

            if (existingEmail != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(loginAttempt.Password, existingEmail.Password))
                {
                    return BadRequest("Invalid credentials");
                }
                string jwtToken = jwtService.Generate(existingEmail.UserId);

                Response.Cookies.Append("jwt", jwtToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(existingEmail);
            }

            if (existingUser != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(loginAttempt.Password, existingUser.Password))
                {
                    return BadRequest("Invalid credentials");
                }

                string jwtToken = jwtService.Generate(existingUser.UserId);

                Response.Cookies.Append("jwt", jwtToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(existingUser);
            }

            return Ok("You are successfully logged in");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok("User has been logged out");
        }

        [HttpGet("validate")]
        public IActionResult ValidateUser()
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);

                return Ok(authenticatedUser);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPatch("update-user")]
        public IActionResult UpdateUser([FromBody] User updatedUser)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);
                User userToUpdate = _context.AppCenterUsers.FirstOrDefault(u => u.UserId == updatedUser.UserId);
                User existingUser = _context.AppCenterUsers.FirstOrDefault(u => u.Username == updatedUser.Username);
                User existingEmail = _context.AppCenterUsers.FirstOrDefault(u => u.Email == updatedUser.Email);

                if (existingUser != null && authenticatedUser.Username != updatedUser.Username)
                {
                    return BadRequest("Username is already taken");
                }

                if (existingEmail != null && authenticatedUser.Email != updatedUser.Email)
                {
                    return BadRequest("Email is already taken");
                }

                if (userToUpdate is null)
                {
                    return NotFound();
                }

                userToUpdate.UserId = updatedUser.UserId;
                userToUpdate.Username = updatedUser.Username;
                userToUpdate.FirstName = updatedUser.FirstName;
                userToUpdate.LastName = updatedUser.LastName;
                userToUpdate.Email = updatedUser.Email;
                _context.SaveChanges();
                return Ok(userToUpdate);
            }
            catch
            {
                return BadRequest("Could not update the user");
            }
        }

        [HttpPatch("change-password")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                User existingUser = _context.AppCenterUsers.FirstOrDefault(u => u.UserId == request.UserId);

                if (existingUser is null)
                {
                    return NotFound();
                }

                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, existingUser.Password))
                {
                    return BadRequest("Old password does not match");
                }

                existingUser.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                _context.SaveChanges();

                return Ok("Password was updated successfully");
            }
            catch
            {
                return BadRequest("Failed to change password");
            }
        }

    }
}
