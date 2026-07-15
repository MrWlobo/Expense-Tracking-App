namespace ExpenseTrackingApp.Models.DTOs;

public class CreateExpenseDto
{
    public decimal Amount { get; set; }
    public string? Comments { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
}

public class GetExpenseDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string? Comments { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
}

public class UpdateExpenseDto
{
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
    public int Id { get; set; }
    public required string CategoryName { get; set; }
}

public class UpdateCategoryDto
{
    public required string CategoryName { get; set; }
}

public class GetSpendingsByCategoryDto
{
    public required string CategoryName { get; set; }
    public decimal TotalAmount { get; set; }
}

public class GetExpenseWithCategoryNameDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string? Comments { get; set; }
    public DateTime Date { get; set; }
    public required string CategoryName { get; set; }
}

public class GetExpenseByMonthDto
{
    public int Id { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Comments { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public required string CategoryName { get; set; }
}