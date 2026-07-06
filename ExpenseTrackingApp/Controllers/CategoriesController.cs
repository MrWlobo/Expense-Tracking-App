using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackingApp.Data;

using ExpenseTrackingApp.Models.Entities;
using ExpenseTrackingApp.Models.DTOs;

namespace ExpenseTrackingApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext appDbContext;

    public CategoriesController(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        return Ok(await appDbContext.Categories.ToListAsync());
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetCategoryById([FromRoute] int id)
    {
        var category = await appDbContext.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        var categoryDto = new GetCategoryDto
        {
            Id = category.Id,
            CategoryName = category.CategoryName
        };

        return Ok(categoryDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto categoryDto)
    {
        var category = new Category
        {
            CategoryName = categoryDto.CategoryName
        };

        await appDbContext.Categories.AddAsync(category);
        await appDbContext.SaveChangesAsync();

        return StatusCode(201, category);
    }
}