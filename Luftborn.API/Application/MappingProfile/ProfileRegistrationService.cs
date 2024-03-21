using System.Reflection;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Application.MappingProfile;

public static class ProfileRegistrationService
{
    public static IServiceCollection AddProfileRegistration(this IServiceCollection services)
    {
        var profileTypes = Assembly.GetExecutingAssembly()
            .GetTypes()
            .Where(t => typeof(Profile).IsAssignableFrom(t));

        var profiles = profileTypes.Select(Activator.CreateInstance).Cast<Profile>();
        var configuration = new MapperConfiguration(cfg =>
        {
            foreach (var profile in profiles)
            {
                cfg.AddProfile(profile);
            }
        });
        services.AddSingleton<IMapper>(sp => new Mapper(configuration));
        return services;
    }
}