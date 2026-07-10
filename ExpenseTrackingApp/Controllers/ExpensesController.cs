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
        var expensesDto = await appDbContext.Expenses
            .Select(expense => new GetExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Comments = expense.Comments ?? string.Empty,
                Date = expense.Date,
                CategoryId = expense.CategoryId
            })
            .ToListAsync();

        return Ok(expensesDto);
    }

    [HttpGet]
    [Route("{month:int}/{year:int}")]
    public async Task<IActionResult> GetExpensesByMonth([FromRoute] int month, [FromRoute] int year)
    {
        var expensesDto = await appDbContext.Expenses
            .Where(expense => expense.Date.Year == year && expense.Date.Month == month)
            .Select(expense => new GetExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Comments = expense.Comments ?? string.Empty,
                Date = expense.Date,
                CategoryId = expense.CategoryId
            })
            .ToListAsync();

        return Ok(expensesDto);
    }

    [HttpGet]
    [Route("{month:int}/{year:int}/total")]
    public async Task<IActionResult> GetMonthlyTotal([FromRoute] int month, [FromRoute] int year)
    {
        var total = await appDbContext.Expenses
            .Where(expense => expense.Date.Year == year && expense.Date.Month == month)
            .SumAsync(expense => expense.Amount);

        return Ok(total);
    }

    [HttpGet]
    [Route("recent/{count:int}")]
    public async Task<IActionResult> GetRecentExpenses([FromRoute] int count)
    {
        var expensesDto = await appDbContext.Expenses
            .OrderByDescending(expense => expense.Date)
            .Take(5)
            .Select(expense => new GetExpenseDto
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Comments = expense.Comments ?? string.Empty,
                Date = expense.Date,
                CategoryId = expense.CategoryId
            })
            .ToListAsync();

        return Ok(expensesDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetExpenseById([FromRoute] int id)
    {
        var expense = await appDbContext.Expenses.FindAsync(id);

        if (expense == null)
        {
            return NotFound();
        }

        var expenseDto = new GetExpenseDto
        {
            Id = expense.Id,
            Amount = expense.Amount,
            Comments = expense.Comments ?? string.Empty,
            Date = expense.Date,
            CategoryId = expense.CategoryId
        };

        return Ok(expenseDto);
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

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> updateExpense([FromBody] UpdateExpenseDto expenseDto, [FromRoute] int id)
    {
        var existingExpense = await appDbContext.Expenses.FindAsync(id);

        if (existingExpense == null)
        {
            return NotFound();
        }

        existingExpense.Amount = expenseDto.Amount;
        existingExpense.CategoryId = expenseDto.CategoryId;
        existingExpense.Comments = expenseDto.Comments;
        existingExpense.Date = expenseDto.Date;

        await appDbContext.SaveChangesAsync();

        return StatusCode(204);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> deleteExpense([FromRoute] int id)
    {
        var expense = await appDbContext.Expenses.FindAsync(id);

        if (expense == null)
        {
            return NotFound();
        }

        appDbContext.Remove(expense);
        await appDbContext.SaveChangesAsync();

        return StatusCode(204);
    }
}