using Luftborn.Core.Abstracts.Repositories;

namespace Luftborn.Infrastructure.Presistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;


    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}