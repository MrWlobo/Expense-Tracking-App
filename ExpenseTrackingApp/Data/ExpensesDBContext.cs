using ExpenseTrackingApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackingApp.Data;

public class ExpensesDBContext : DbContext
{
    public ExpensesDBContext(DbContextOptions<ExpensesDBContext> options) : base(options)
    {
        
    }

    public DbSet<Expense> Expenses { get; set; }
}