using Backend.Models.Crm;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/orders")]
[ApiController]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    private readonly IOrderService _orderService = orderService;

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderModel model)
    {
        var dto = await _orderService.CreateOrder(model);
        return Ok(dto);
    }

    [HttpGet("/{orderId}")]
    public async Task<IActionResult> GetOrder(string orderId)
    {
        if (string.IsNullOrWhiteSpace(orderId))
        {
            return BadRequest("Missing orderId");
        }
        var dto = await _orderService.GetOrder(orderId);
        return Ok(dto);
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        return Ok(await _orderService.GetOrders());
    }

    [HttpPatch]
    public async Task<IActionResult> UpdateOrderStatus()
    {
        return Ok(await _orderService.UpdateOrderStatus());
    }
}
