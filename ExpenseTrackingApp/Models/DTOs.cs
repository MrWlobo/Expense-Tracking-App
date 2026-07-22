namespace ExpenseTrackingApp.Models.DTOs;

public class CreateExpenseDto
{
    public required string Name { get; set; }
    public required decimal Amount { get; set; }
    public string? Comments { get; set; }
    public required DateTime Date { get; set; }
    public required int CategoryId { get; set; }
}

public class GetExpenseDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required decimal Amount { get; set; }
    public string? Comments { get; set; }
    public required DateTime Date { get; set; }
    public required int CategoryId { get; set; }
}

public class UpdateExpenseDto
{
    public string? Name { get; set; }
    public decimal Amount { get; set; }
    public string? Comments { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
}

public class CreateCategoryDto
{
    public required string CategoryName { get; set; }
}

public class GetCategoryDto
{
    public required int Id { get; set; }
    public required string CategoryName { get; set; }
}

public class UpdateCategoryDto
{
    public required string CategoryName { get; set; }
}

public class GetSpendingsByCategoryDto
{
    public required string CategoryName { get; set; }
    public required decimal TotalAmount { get; set; }
}

public class GetExpenseWithCategoryNameDto
{
    public required int Id { get; set; }
    public required decimal Amount { get; set; }
    public string? Comments { get; set; }
    public required DateTime Date { get; set; }
    public required string CategoryName { get; set; }
}

public class GetExpenseByMonthDto
{
    public required decimal TotalAmount { get; set; }
    public string? Comments { get; set; }
    public required int Month { get; set; }
    public required int Year { get; set; }
    public required string CategoryName { get; set; }
}

public class CreateUserDto
{
    public required string Login { get; set; }
    public required string PasswordHash { get; set; }
    public decimal ExpenseGoal { get; set; }
    public required string Currency { get; set; }
}

public class GetUserDto
{
    public required int Id { get; set; }
    public required string Login { get; set; }
    public required string PasswordHash { get; set; }
    public decimal ExpenseGoal { get; set; }
    public required string Currency { get; set; }
}

public class UpdateUserDto
{
    public required string Login { get; set; }
    public required string PasswordHash { get; set; }
    public decimal ExpenseGoal { get; set; }
    public required string Currency { get; set; }
}