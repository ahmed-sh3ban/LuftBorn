using Luftborn.API.Controllers.ApiBase;
using Luftborn.Contracts.DTOs;
using Luftborn.Core.Abstracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn.API.Controllers;

public class ProductController : ApiControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ProductDTO>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var result = await _productService.GetAllProducts();
        if (result.IsFailure)
        {
            return Error(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(List<ProductDTO>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var result = await _productService.GetProductById(id);
        if (result.IsFailure)
        {
            return Error(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPost]
    [ProducesResponseType(typeof(List<ProductDTO>), StatusCodes.Status200OK)]
    public async Task<IActionResult> AddNewProduct([FromBody] ProductDTO product)
    {
        var result = await _productService.NewProduct(product);
        if (result.IsFailure)
        {
            return Error(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPut]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateProduct([FromBody] ProductDTO product)
    {
        var result = await _productService.UpdateAProduct(product);
        if (result.IsFailure)
        {
            return Error(result.Error);
        }

        return Ok(result.IsSuccess);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        var result = await _productService.DeleteAProduct(id);
        if (result.IsFailure)
        {
            return Error(result.Error);
        }

        return Ok(result.IsSuccess);
    }
}