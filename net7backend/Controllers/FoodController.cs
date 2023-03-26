using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using net7backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace net7backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/foods/parents
        [HttpGet("all")]
        public ActionResult<IEnumerable<Food>> GetAllFoods()
        {
            // get parents and convert them to food
            var parents = _context.ParentFoods
                .ToList()
                .Select(p => new Food { Id = p.Id, Name = p.Name })
                .ToList();
            var children = _context.ChildFoods
                .ToList()
                .Select(c => new Food { Id = c.Id, Name = c.Name })
                .ToList();

            return parents.Concat(children).ToList();
        }

        // GET: api/foods/parents
        [HttpGet("parents")]
        public ActionResult<IEnumerable<ParentFood>> GetParentFoods()
        {
            return _context.ParentFoods.ToList();
        }

        // GET: api/foods/children
        [HttpGet("children")]
        public ActionResult<IEnumerable<ChildFood>> GetChildFoods()
        {
            return _context.ChildFoods.ToList();
        }

        // GET: api/foods/parent/{parentId}/children
        [HttpGet("parent/{parentId}/children")]
        public ActionResult<IEnumerable<ChildFood>> GetChildFoodsByParent(string parentId)
        {
            var ParentChildAssociations = _context.ParentChildAssociation
                .Where(pca => pca.ParentId == parentId)
                .Select(pca => pca.ChildFood)
                .ToList();
            return ParentChildAssociations;
        }

        // GET: api/foods/child/{childId}/parents
        [HttpGet("child/{childId}/parents")]
        public ActionResult<IEnumerable<ParentFood>> GetParentFoodsByChild(string childId)
        {
            var ParentChildAssociations = _context.ParentChildAssociation
                .Where(pca => pca.ChildId == childId)
                .Select(pca => pca.ParentFood)
                .ToList();

            return ParentChildAssociations;
        }
    }
}
