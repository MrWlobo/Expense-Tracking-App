using ExpenseTrackingApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackingApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Category> Categories { get; set; }
}