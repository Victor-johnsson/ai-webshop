using Backend.Models.Crm;
using Microsoft.EntityFrameworkCore;

namespace Backend.EntityFramework;

public class BackendDbContext : DbContext
{
    public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options) { }

    public DbSet<Customer> Customers { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderLine> OrderLines { get; set; } = null!;
    public DbSet<Pim.Models.Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // CRM
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Id).ValueGeneratedOnAdd();
            entity.Property(c => c.Name).IsRequired();
            entity.Property(c => c.Email).IsRequired();
            entity.Property(c => c.Address).IsRequired();
        });
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.Id).ValueGeneratedOnAdd();
            entity.HasOne(o => o.Customer)
                  .WithOne(c => c.Order)
                  .HasForeignKey<Order>(o => o.CustomerId);
            entity.Property(o => o.Status).IsRequired();
        });
        modelBuilder.Entity<OrderLine>(entity =>
        {
            entity.HasKey(ol => ol.Id);
            entity.HasOne(ol => ol.Order)
                  .WithMany(o => o.OrderLines)
                  .HasForeignKey(ol => ol.OrderId);
            entity.Property(ol => ol.ProdRef).IsRequired();
            entity.Property(ol => ol.ItemCount).IsRequired();
        });
        // PIM
        modelBuilder.Entity<Pim.Models.Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Id).ValueGeneratedOnAdd();
            entity.Property(p => p.Name).IsRequired();
            entity.Property(p => p.Price).IsRequired();
            entity.Property(p => p.Stock).IsRequired();
            entity.HasIndex(p => p.Name).IsUnique();
        });
    }
}
