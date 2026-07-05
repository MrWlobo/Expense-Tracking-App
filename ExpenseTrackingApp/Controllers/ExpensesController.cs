using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackingApp.Data;

using ExpenseTrackingApp.Models.Entities;
using ExpenseTrackingApp.Models.DTOs;

namespace ExpenseTrackingApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly AppDbContext appDbContext;

    public ExpensesController(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllExpenses()
    {
        return Ok(await appDbContext.Expenses.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseDto expenseDto)
    {

    var expense = new Expense
    {
        Amount = expenseDto.Amount,
        Comments = expenseDto.Comments,
        Date = expenseDto.Date,
        CategoryId = expenseDto.CategoryId
    };

    await appDbContext.Expenses.AddAsync(expense);
    await appDbContext.SaveChangesAsync();

    return StatusCode(201, expense);
}
}