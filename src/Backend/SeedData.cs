using Bogus;
using Backend.Models.Pim;
using Backend.Models;
using Backend.Models.Crm;
using Backend.EntityFramework;

namespace Backend
{
    public static class SeedData
    {
        public static void SeedDatabase(BackendDbContext context, int productsCount = 25, int customersCount = 10, int reviewsPerProduct = 3, int ordersPerCustomer = 2)
        {
            // Avoid duplicating data
            if (context.Products.Any() || context.Customers.Any() || context.Reviews.Any())
                return;

            // 1. Generate Products
            var productFaker = new Faker<Product>()
                .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price(10, 500)))
                .RuleFor(p => p.Stock, f => f.Random.Int(5, 100))
                .RuleFor(p => p.ImageUrl, f => f.Image.PicsumUrl());
            var products = productFaker.Generate(productsCount);
            context.Products.AddRange(products);
            context.SaveChanges();

            // 2. Generate Customers
            var customerFaker = new Faker<Customer>()
                .RuleFor(c => c.Name, f => f.Name.FullName())
                .RuleFor(c => c.Address, f => f.Address.FullAddress())
                .RuleFor(c => c.Email, f => f.Internet.Email());
            var customers = customerFaker.Generate(customersCount);
            context.Customers.AddRange(customers);
            context.SaveChanges();

            // 3. Generate Reviews for Products
            var reviewFaker = new Faker<Review>()
                .RuleFor(r => r.Name, f => f.Name.FirstName())
                .RuleFor(r => r.Rating, f => f.Random.Int(1, 5))
                .RuleFor(r => r.Comment, f => f.Rant.Review())
                .RuleFor(r => r.Date, f => DateTime.SpecifyKind(f.Date.Past(2, DateTime.UtcNow), DateTimeKind.Utc));
            var allReviews = new List<Review>();
            foreach (var product in context.Products.ToList())
            {
                var reviews = reviewFaker.Generate(reviewsPerProduct);
                allReviews.AddRange(reviews);
            }
            context.Reviews.AddRange(allReviews);
            context.SaveChanges();

            // 4. Generate Orders & OrderLines
            var orderFaker = new Faker<Order>()
                .RuleFor(o => o.Status, f => f.PickRandom("Pending", "Shipped", "Delivered", "Cancelled"))
                .RuleFor(o => o.PaymentId, f => f.Random.Guid().ToString())
                .Ignore(o => o.Customer) // will assign below
                .Ignore(o => o.OrderLines); // will assign below
            var orderLineFaker = new Faker<OrderLine>()
                .RuleFor(ol => ol.ProdRef, f => f.Random.ListItem(products).Id.ToString())
                .RuleFor(ol => ol.ItemCount, f => f.Random.Int(1, 5));

            var orders = new List<Order>();
            foreach (var customer in context.Customers.ToList())
            {
                for (int i = 0; i < ordersPerCustomer; i++)
                {
                    var order = orderFaker.Generate();
                    order.Customer = customer;
                    order.CustomerId = customer.Id;

                    // Each order has 1-4 order lines
                    var orderLines = orderLineFaker.GenerateBetween(1, 4);
                    foreach (var ol in orderLines)
                    {
                        ol.Order = order;
                        // OrderId auto-set after save
                    }
                    order.OrderLines = orderLines;

                    orders.Add(order);
                }
            }
            context.Orders.AddRange(orders);
            context.SaveChanges();
        }
    }
}
