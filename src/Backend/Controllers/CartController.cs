using Microsoft.AspNetCore.Mvc;
using XProjectIntegrationsBackend.Models;

namespace Backend.Controllers;

[Route("/cart")]
[ApiController]
public class CartController : ControllerBase
{

    public CartController()
    {
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart(
        [FromQuery] string sessionId,
        [FromBody] CartItem item
    )
    {
        if (string.IsNullOrEmpty(sessionId))
            return BadRequest("Session ID is required.");

        return Ok(new { message = "Item added to cart." });
    }

    [HttpGet]
    public async Task<IActionResult> GetCart([FromQuery] string sessionId)
    {
        if (string.IsNullOrEmpty(sessionId))
            return BadRequest("Session ID is required.");

        return Ok();
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveFromCart(
        [FromQuery] string sessionId,
        [FromQuery] string productId
    )
    {
        if (string.IsNullOrEmpty(sessionId) || string.IsNullOrEmpty(productId))
            return BadRequest("Session ID and Product ID are required.");

        return Ok(new { message = "Item removed from cart." });
    }

    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart([FromQuery] string sessionId)
    {
        if (string.IsNullOrEmpty(sessionId))
            return BadRequest("Session ID is required.");

        return Ok(new { message = "Cart cleared." });
    }
}
