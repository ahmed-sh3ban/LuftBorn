using Luftborn.Core.Entities;

namespace Luftborn.Core.Abstracts.Repositories;

public interface IProductRepository
{
    public Task<List<Product>> GetAllProducts();
    public Task<Product?> GetProductById(Guid id);
    public Task NewProduct(Product product);
    public void UpdateAProduct(Product product);
    public void DeleteAProduct(Product product);
}