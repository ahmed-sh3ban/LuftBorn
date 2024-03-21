using Luftborn.Core.Abstracts.Repositories;
using Luftborn.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luftborn.Infrastructure.Presistence.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _appDbContext;
    public ProductRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public async Task<List<Product>> GetAllProducts()
    {
        return await _appDbContext.Products.ToListAsync();
    }
    public async Task<Product?> GetProductById(Guid id)
    {
        return await _appDbContext.Products.AsNoTracking().Where(att=>att.Id == id).FirstOrDefaultAsync();
    }
    public async Task NewProduct(Product product)
    {
         await _appDbContext.Products.AddAsync(product);
    }

    public void UpdateAProduct(Product product)
    {
         _appDbContext.Products.Update(product);

    }

    public void DeleteAProduct(Product product)
    {
         _appDbContext.Products.Remove(product);

    }
}