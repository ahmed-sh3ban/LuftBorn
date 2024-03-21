using CSharpFunctionalExtensions;
using Luftborn.Contracts.DTOs;
using Luftborn.Core.ValueObjects;

namespace Luftborn.Core.Abstracts.Services;

public interface IProductService
{
    public Task<Result<List<ProductDTO>, Error>> GetAllProducts();
    public  Task<Result<ProductDTO, Error>> GetProductById(Guid id);
    public  Task<Result<Guid, Error>> NewProduct(ProductDTO productDTO);
    public  Task<UnitResult<Error>> UpdateAProduct(ProductDTO productDTO);
    public  Task<UnitResult<Error>> DeleteAProduct(Guid id);
}