using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackingApp.Models.Entities;

[Index(nameof(Login), IsUnique = true)]
public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(40)]
    public required string Login { get; set; }

    [Required]
    public required string PasswordHash { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal ExpenseGoal { get; set; } = 100.00m;

    [Required]
    [StringLength(3, MinimumLength = 3)]
    [Column(TypeName = "char(3)")]
    public string Currency { get; set; } = "PLN";
}