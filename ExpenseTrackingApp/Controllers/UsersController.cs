using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackingApp.Data;

using ExpenseTrackingApp.Models.Entities;
using ExpenseTrackingApp.Models.DTOs;
using Microsoft.EntityFrameworkCore.Internal;

namespace ExpenseTrackingApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext appDbContext;

    public UserController(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetUserById([FromRoute] int id)
    {
        var user = await appDbContext.Users
        .FromSqlInterpolated($"SELECT Id, Login, ExpenseGoal, Currency FROM Users WHERE Id = {id}")
        .Select(user => new GetUserDto
        {
            Id = user.Id,
            Login = user.Login,
            ExpenseGoal = user.ExpenseGoal,
            Currency = user.Currency
            
        })
        .FirstOrDefaultAsync();

        if (user == null)
        {
            return NotFound(new { message = $"User with ID {id} was not found." });
        }

        return Ok(user);
    }
}