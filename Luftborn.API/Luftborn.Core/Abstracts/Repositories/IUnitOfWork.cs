namespace Luftborn.Core.Abstracts.Repositories;

public interface IUnitOfWork
{
    public  Task SaveAsync();
}