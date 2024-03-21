using AutoMapper;
using Luftborn.Contracts.DTOs;
using Luftborn.Core.Entities;

namespace Application.MappingProfile.ProductProfile;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<ProductDTO, Product>().ReverseMap();
    }
}