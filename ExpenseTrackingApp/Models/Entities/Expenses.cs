namespace ExpenseTrackingApp.Models.Entities;

public class Expenses
{
    public int id { get; set;}
    public int categoryId { get; set;}
    public decimal amount { get; set; }
    public DateTime date { get; set; }
    public string comments { get; set; }
}