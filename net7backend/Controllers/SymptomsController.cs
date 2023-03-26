using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net7backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace net7backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SymptomsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SymptomsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/symptoms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SymptomData>>> GetSymptoms()
        {
            return await _context.SymptomData.ToListAsync();
        }

        // GET: api/symptoms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SymptomData>> GetSymptom(int id)
        {
            var symptom = await _context.SymptomData.FindAsync(id);

            if (symptom == null)
            {
                return NotFound();
            }

            return symptom;
        }

        // POST: api/symptoms
        [HttpPost]
        public async Task<ActionResult<SymptomData>> PostSymptom(SymptomData symptom)
        {
            _context.SymptomData.Add(symptom);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSymptom), new { id = symptom.Id }, symptom);
        }

        // PUT: api/symptoms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSymptom(int id, SymptomData symptom)
        {
            if (id != symptom.Id)
            {
                return BadRequest();
            }

            _context.Entry(symptom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SymptomExists(id))
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

        // DELETE: api/symptoms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSymptom(int id)
        {
            var symptom = await _context.SymptomData.FindAsync(id);
            if (symptom == null)
            {
                return NotFound();
            }

            _context.SymptomData.Remove(symptom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SymptomExists(int id)
        {
            return _context.SymptomData.Any(e => e.Id == id);
        }
    }
}
