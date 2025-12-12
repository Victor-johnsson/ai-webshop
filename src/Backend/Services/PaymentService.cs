
namespace XProjectIntegrationsBackend.Services;

public interface IPaymentsService
{
    Task<IResult> CreatePaymentsAsync();
}

public class PaymentsService : IPaymentsService
{
    public async Task<IResult> CreatePaymentsAsync()
    {
        return Results.Ok(1);
    }
}
