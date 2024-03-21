using Luftborn.Core.Abstracts.Repositories;
using Luftborn.Infrastructure.Presistence;
using Luftborn.Infrastructure.Presistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Luftborn.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IProductRepository, ProductRepository>();
        return services;
    }
}