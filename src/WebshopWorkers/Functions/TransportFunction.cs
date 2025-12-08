using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using ClassLibrary.Models;
using Transportation;

namespace WebShopX.FunctionService.Api.Functions
{
    public class TransportFunction
    {
        private readonly ILogger<TransportFunction> _logger;
        private readonly Services.ITableStorageService _tableStorageService;

        public TransportFunction(
            ILogger<TransportFunction> logger,
            Services.ITableStorageService tableStorageService
        )
        {
            _logger = logger;
            _tableStorageService = tableStorageService;
        }

        [Function(nameof(ServiceBusTransportFunction))]
        public async Task ServiceBusTransportFunction(
            [ServiceBusTrigger(
                "%serviceBusTopicName%",
                "%serviceBusTransportSubscriptionName%",
                Connection = "serviceBus",
                IsSessionsEnabled = false
            )]
                ServiceBusReceivedMessage message,
            ServiceBusMessageActions messageActions
        )
        {
            _logger.LogInformation($"Received message: {message.MessageId}");
            string messageBody = message.Body.ToString();
            try
            {

                _logger.LogInformation("Order {Order}", messageBody);
                Order? sentMessage = JsonSerializer.Deserialize<Order>(messageBody);

                if (string.IsNullOrEmpty(sentMessage?.PaymentId))
                {
                    _logger.LogError("Order status is missing.");
                    return;
                }

                TransportationEntity transportationEntityMessage = new TransportationEntity
                {
                    PartitionKey = "DHLTest4",
                    RowKey = sentMessage?.PaymentId ?? string.Empty,
                    Status = sentMessage?.Status ?? string.Empty,
                    CustomerName = sentMessage?.Customer?.Name ?? string.Empty,
                    CustomerEmail = sentMessage?.Customer?.Email ?? string.Empty,
                    CustomerAddress = sentMessage?.Customer?.Address ?? string.Empty,
                };

                if (sentMessage == null)
                {
                    _logger.LogError("Message deserialization failed. Skipping processing.");
                    return;
                }

                try
                {
                    await _tableStorageService.UpdateOrderStatus(transportationEntityMessage);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error updating order status: {ex.Message}");
                    return;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError($"Error deserializing message: {ex.Message}");
                return;
            }
        }
    }
}
