namespace Luftborn.Core.Entities;

public class Product : BaseEntity
{
    public String ProductName { get; set; }
    public String ProductPrice { get; set; }
    public DateTime ExpirationDate { get; set; }
    public String ProductionDate { get; set; }
}