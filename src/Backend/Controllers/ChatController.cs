using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/chat")]
[ApiController]
public class ChatController(ChatService chatService) : ControllerBase
{
    private readonly ChatService _orderService = chatService;

    [HttpPost]
    public async Task<IActionResult> Chat([FromBody] Message prompt)
    {
        return Ok(await _orderService.GetChatResponseAsync(prompt));
    }
}
