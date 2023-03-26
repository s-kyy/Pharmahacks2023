using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net7backend.Models;

[ApiController]
[Route("api/[controller]")]
public class PredictionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PredictionsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/predictions
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PredictedContribution>>> GetPredictions()
    {
        return await _context.PredictedContributions.ToListAsync();
    }

    // GET: api/predictions/5
    [HttpGet("{id}")]
    public async Task<ActionResult<PredictedContribution>> GetPrediction(int id)
    {
        var prediction = await _context.PredictedContributions.FindAsync(id);

        if (prediction == null)
        {
            return NotFound();
        }

        return prediction;
    }

    // POST: api/predictions
    [HttpPost]
    public async Task<ActionResult<PredictedContribution>> PostPrediction(
        PredictedContribution prediction
    )
    {
        _context.PredictedContributions.Add(prediction);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPrediction), new { id = prediction.Id }, prediction);
    }

    // PUT: api/predictions/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPrediction(int id, PredictedContribution prediction)
    {
        if (id != prediction.Id)
        {
            return BadRequest();
        }

        _context.Entry(prediction).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PredictionExists(id))
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

    // DELETE: api/predictions/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrediction(int id)
    {
        var prediction = await _context.PredictedContributions.FindAsync(id);
        if (prediction == null)
        {
            return NotFound();
        }

        _context.PredictedContributions.Remove(prediction);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PredictionExists(int id)
    {
        return _context.PredictedContributions.Any(e => e.Id == id);
    }
}
