using Backend.EntityFramework;
using Backend.Models.Crm;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public interface IOrderService
{
    Task<OrderDTO> CreateOrder(CreateOrderModel model);
    Task<ICollection<OrderDTO>> GetOrders();
    Task<OrderDTO> GetOrder(string id);
    Task<List<OrderDTO>> UpdateOrderStatus();
}
public class OrderService(BackendDbContext context) : IOrderService
{
    readonly BackendDbContext _context = context;

    public async Task<OrderDTO> CreateOrder(CreateOrderModel model)
    {
        Customer customer = new()
        {
            Name = model.Customer.Name,
            Address = model.Customer.Address,
            Email = model.Customer.Email,
            Order = new Order()
            {
                Status = OrderStatusEnum.OrderReceived.ToString(),
                OrderLines = [.. model.OrderLines.Select(p => new OrderLine
                {
                    ItemCount = p.ItemCount
                })]
            }
        };

        _context.Customers.Add(customer);
        var v = await _context.SaveChangesAsync();
        if (v == 0)
        {
            throw new Exception();
        }
        OrderDTO orderDTO = new()
        {
            OrderId = customer.Order.Id,
            CustomerName = customer.Name,
            CustomerAddress = customer.Address,
            CustomerEmail = customer.Email,
            OrderStatus = OrderStatusEnum.OrderReceived.ToString(),
        };
        return orderDTO;

    }

    public async Task<OrderDTO> GetOrder(string id)
    {
        var order = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderLines).FirstOrDefaultAsync(o => o.Id.ToString() == id);
        if (order is null)
        {
            throw new Exception("Order not found");
        }
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

    public async Task<ICollection<OrderDTO>> GetOrders()
    {
        var orders = await _context.Orders.Include(o => o.Customer).Include(o => o.OrderLines).ToListAsync();
        var dtos = orders.Select(order => new OrderDTO
        {
            OrderId = order.Id,
            CustomerName = order.Customer?.Name,
            OrderStatus = order.Status,
            CustomerEmail = order.Customer?.Email,
            CustomerAddress = order.Customer?.Address
        }).ToList();

        return dtos;
    }

    public async Task<List<OrderDTO>> UpdateOrderStatus()
    {
        var orders = await _context.Orders.Where(x => x.Status == OrderStatusEnum.OrderReceived.ToString()).ToListAsync();
        foreach (var order in orders)
        {
            order.Status = OrderStatusEnum.OrderReadyForPickUp.ToString();
        }

        await _context.SaveChangesAsync();

        var allOrders = await _context.Orders.Include(o => o.Customer)
            .Include(o => o.OrderLines)
            .Where(x => x.Status == OrderStatusEnum.OrderReadyForPickUp.ToString())
            .ToListAsync();
        var dtos = allOrders.Select(order => new OrderDTO
        {
            OrderId = order.Id,
            CustomerName = order.Customer?.Name,
            OrderStatus = order.Status,
            CustomerEmail = order.Customer?.Email,
            CustomerAddress = order.Customer?.Address
        }).ToList();

        return dtos;
    }
}

