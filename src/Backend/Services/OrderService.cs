using Microsoft.EntityFrameworkCore;
using Backend.Models.Crm;

namespace Backend.Services;

public interface IOrderService
{
    Task<OrderDTO> CreateOrder(CreateOrderModel model);
    Task<ICollection<OrderDTO>> GetOrders();
    Task<OrderDTO> GetOrder(string id);
    Task<List<OrderDTO>> UpdateOrderStatus();
}
public class OrderService : IOrderService
{
    readonly EntityFramework.BackendDbContext _context;

    public OrderService(EntityFramework.BackendDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDTO> CreateOrder(CreateOrderModel model)
    {
        Customer customer = new()
        {
            Name = model.Customer?.Name ?? string.Empty,
            Address = model.Customer?.Address ?? string.Empty,
            Email = model.Customer?.Email ?? string.Empty,
            Order = new Order()
            {
                Status = OrderStatusEnum.OrderReceived.ToString(),
                OrderLines = model.OrderLines?.Select(p => new OrderLine
                {
                    ItemCount = p.ItemCount
                }).ToList() ?? []
            }
        };

        _context.Customers.Add(customer);
        var v = await _context.SaveChangesAsync();
        if (v > 1)
        {
            OrderDTO orderDTO = new()
            {
                OrderId = customer.Order!.Id,
                CustomerName = customer.Name,
                CustomerAddress = customer.Address,
                CustomerEmail = customer.Email,
                OrderStatus = OrderStatusEnum.OrderReceived.ToString(),
            };
            return orderDTO;
        }

        throw new Exception();
    }

    public async Task<OrderDTO> GetOrder(string id)
    {
        var order = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderLines).FirstOrDefaultAsync(o => o.Id.ToString() == id);
        if (order != null)
        {
            var dtoObj = new OrderDTO
            {
                OrderId = order.Id,
                CustomerName = order.Customer?.Name,
                OrderStatus = order.Status,
                CustomerEmail = order.Customer?.Email,
                CustomerAddress = order.Customer?.Address
            };
            return dtoObj;
        }

        throw new Exception("Order not found");
    }

    public async Task<ICollection<OrderDTO>> GetOrders()
    {
        var orders = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderLines).ToListAsync();
        var dtoList = new List<OrderDTO>();
        foreach (var order in orders)
        {
            var dtoObj = new OrderDTO
            {
                OrderId = order.Id,
                CustomerName = order.Customer?.Name,
                OrderStatus = order.Status,
                CustomerEmail = order.Customer?.Email,
                CustomerAddress = order.Customer?.Address
            };
            dtoList.Add(dtoObj);
        }

        return dtoList;
    }

    public async Task<List<OrderDTO>> UpdateOrderStatus()
    {
        var orders = await _context.Orders.Where(x => x.Status == OrderStatusEnum.OrderReceived.ToString()).ToListAsync();
        foreach (var order in orders)
        {
            order.Status = OrderStatusEnum.OrderReadyForPickUp.ToString();
        }

        await _context.SaveChangesAsync();

        var allOrders = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderLines).Where(x => x.Status == OrderStatusEnum.OrderReadyForPickUp.ToString()).ToListAsync();
        var dtoList = new List<OrderDTO>();
        foreach (var order in allOrders)
        {
            var dtoObj = new OrderDTO
            {
                OrderId = order.Id,
                CustomerName = order.Customer?.Name,
                OrderStatus = order.Status,
                CustomerEmail = order.Customer?.Email,
                CustomerAddress = order.Customer?.Address
            };
            dtoList.Add(dtoObj);
        }

        return dtoList;
    }
}

