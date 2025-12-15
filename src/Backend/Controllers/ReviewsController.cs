using Backend.EntityFramework;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private readonly BackendDbContext _dbContext;
        public ReviewsController(BackendDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            var reviews = await _dbContext.Reviews
                .OrderByDescending(r => r.Date)
                .ToListAsync();
            return Ok(reviews);
        }

        // POST: api/reviews
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            review.Date = DateTime.UtcNow;
            _dbContext.Reviews.Add(review);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReviews), new { id = review.Id }, review);
        }
    }
}
