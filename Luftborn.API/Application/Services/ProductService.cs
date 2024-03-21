using System.Runtime.InteropServices.JavaScript;
using AutoMapper;
using CSharpFunctionalExtensions;
using Luftborn.Contracts.DTOs;
using Luftborn.Core.Abstracts.Repositories;
using Luftborn.Core.Abstracts.Services;
using Luftborn.Core.Entities;
using Luftborn.Core.ValueObjects;

namespace Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository productRepository, IMapper mapper,IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<Result<List<ProductDTO>, Error>> GetAllProducts()
    {
        var productList = await _productRepository.GetAllProducts();
        var mappedProductsList = _mapper.Map<List<ProductDTO>>(productList);
        return mappedProductsList;
    }

    public async Task<UnitResult<Error>> NewProduct(ProductDTO productDTO)
    {
        var product = _mapper.Map<Product>(productDTO);
        await _productRepository.NewProduct(product);
        await _unitOfWork.SaveAsync();
        return UnitResult.Success<Error>();
    }

    public async Task<UnitResult<Error>> UpdateAProduct(ProductDTO productDTO)
    {
        var productIsExist = await _productRepository.GetProductById(productDTO.Id);
        if (productIsExist == null)
            return UnitResult.Failure<Error>(Errors.General.NotFound("product"));
        var productMapped = _mapper.Map<Product>(productDTO);
        _productRepository.UpdateAProduct(productMapped);
        await _unitOfWork.SaveAsync();

        return UnitResult.Success<Error>();
    }

    public async Task<UnitResult<Error>> DeleteAProduct(Guid id)
    {
        var product = await _productRepository.GetProductById(id);
        if (product == null)
            return UnitResult.Failure<Error>(Errors.General.NotFound("product"));

        _productRepository.DeleteAProduct(product);
        await _unitOfWork.SaveAsync();

        return UnitResult.Success<Error>();
    }
}