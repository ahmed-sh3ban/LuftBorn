using CSharpFunctionalExtensions;
using Luftborn.Contracts.DTOs;
using Luftborn.Core.ValueObjects;

namespace Luftborn.Core.Abstracts.Services;

public interface IProductService
{
    public Task<Result<List<ProductDTO>, Error>> GetAllProducts();
    public  Task<UnitResult<Error>> NewProduct(ProductDTO productDTO);
    public  Task<UnitResult<Error>> UpdateAProduct(ProductDTO productDTO);
    public  Task<UnitResult<Error>> DeleteAProduct(Guid id);
}