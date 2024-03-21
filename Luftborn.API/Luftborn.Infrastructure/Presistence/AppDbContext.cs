using System.Reflection;
using Luftborn.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Infrastructure.Presistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
    public DbSet<Product> Products { get; set; }
}