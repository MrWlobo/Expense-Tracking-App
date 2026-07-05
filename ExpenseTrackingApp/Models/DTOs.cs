namespace ExpenseTrackingApp.Models.DTOs;

public class CreateExpenseDto
{
    public decimal Amount { get; set; }
    public string Comments { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
}