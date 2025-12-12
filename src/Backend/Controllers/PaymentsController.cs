using Microsoft.AspNetCore.Mvc;
using XProjectIntegrationsBackend.Services;

namespace XProjectIntegrationsBackend.Controllers;

[Route("/payments")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentsService _paymentsService;

    public PaymentsController(IPaymentsService paymentsService)
    {
        _paymentsService = paymentsService;
    }

    [HttpPost]
    public async Task<IResult> CreatePayments()
    {
        return await _paymentsService.CreatePaymentsAsync();
    }

}
