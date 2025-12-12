using Backend.Crm.Models;
using Backend.Crm.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    public class CrmController : ControllerBase
    {
        private readonly ILogger<CrmController> _logger;
        private readonly IOrderService _orderService;


        public CrmController(ILogger<CrmController> logger, IOrderService orderService)
        {
            _logger = logger;
            _orderService = orderService;
        }

        [HttpGet("crm/api/healthCheck")]
        public async Task<IActionResult> HealthCheck()
        {

            return Ok();
        }

        [HttpPost("crm/api/order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderModel model)
        {
            // Create new order
            var dto = await _orderService.CreateOrder(model);
            return Ok(dto);

        }

        [HttpGet("crm/api/order/{orderId}")]
        public async Task<IActionResult> GetOrder(string orderId)
        {

            if (string.IsNullOrWhiteSpace(orderId))
            {
                return BadRequest("Missing orderId");
            }

            var dto = await _orderService.GetOrder(orderId);


            return Ok(dto);
        }

        [HttpGet("crm/api/orders")]
        public async Task<IActionResult> GetOrders()
        {
            return Ok(await _orderService.GetOrders());
        }

        [HttpPatch("crm/api/order")]
        public async Task<IActionResult> UpdateOrderStatus()
        {

            return Ok(await _orderService.UpdateOrderStatus());
        }
    }
}
