using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net7backend.Models;
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class FoodsDataController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodsDataController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/foods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodData>>> GetFoods()
    {
        return await _context.FoodData.ToListAsync();
    }

    // GET: api/foods/5
    [HttpGet("{id}")]
    public async Task<ActionResult<FoodData>> GetFood(int id)
    {
        var food = await _context.FoodData.FindAsync(id);

        if (food == null)
        {
            return NotFound();
        }

        return food;
    }

    // POST: api/foods
    [HttpPost]
    public async Task<ActionResult<FoodData>> PostFood(FoodData food)
    {
        _context.FoodData.Add(food);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFood), new { id = food.Id }, food);
    }

    // PUT: api/foods/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFood(int id, FoodData food)
    {
        if (id != food.Id)
        {
            return BadRequest();
        }

        _context.Entry(food).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FoodExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/foods/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFood(int id)
    {
        var food = await _context.FoodData.FindAsync(id);
        if (food == null)
        {
            return NotFound();
        }

        _context.FoodData.Remove(food);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FoodExists(int id)
    {
        return _context.FoodData.Any(e => e.Id == id);
    }
}
