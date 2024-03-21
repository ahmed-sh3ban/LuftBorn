namespace Luftborn.Contracts.DTOs;

public class ProductDTO
{
    public Guid Id { get; set; }
    public String ProductName { get; set; }
    public String ProductPrice { get; set; }
    public DateTime ExpirationDate { get; set; }
    public String ProductionDate { get; set; }
}