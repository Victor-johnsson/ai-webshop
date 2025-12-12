using Backend.EntityFramework;
using Backend.Pim.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace XProjectIntegrationsBackend.Controllers;

[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly BackendDbContext _context;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(BackendDbContext context, ILogger<ProductsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();
        return Ok(product);
    }

    [HttpPost]
    // [Authorize(Policy = "MustBeAdmin")]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProduct model)
    {
        if (string.IsNullOrWhiteSpace(model.Name))
            return BadRequest("Product name is required.");
        if (model.Price < 0)
            return BadRequest("Price must be non-negative.");
        if (model.Stock < 0)
            return BadRequest("Stock must be non-negative.");

        // Check for unique name
        if (await _context.Products.AnyAsync(p => p.Name == model.Name))
            return Conflict("A product with this name already exists.");

        var product = new Product
        {
            Id = Guid.CreateVersion7(),
            Name = model.Name,
            Price = model.Price,
            Stock = model.Stock,
            ImageUrl = model.ImageUrl
        };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
    }

    [HttpPut("{id:guid}/stock")]
    // [Authorize(Policy = "MustBeAdmin")]
    public async Task<IActionResult> DecrementStock(Guid id, [FromQuery] int stockCount)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();
        if (stockCount <= 0)
            return BadRequest("Stock count must be positive.");
        if (product.Stock < stockCount)
            return BadRequest($"Insufficient stock. Available: {product.Stock}, Requested: {stockCount}");
        product.Stock -= stockCount;
        await _context.SaveChangesAsync();
        return Ok(product);
    }

    [HttpDelete("{id:guid}")]
    // [Authorize(Policy = "MustBeAdmin")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return NotFound();
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
