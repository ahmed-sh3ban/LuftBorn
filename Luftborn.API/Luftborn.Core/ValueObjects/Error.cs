using CSharpFunctionalExtensions;

namespace Luftborn.Core.ValueObjects;

public sealed class Error : ValueObject
{
    private const string Separator = ".";
    public string? Code { get; }
    public string? Message { get; }

    internal Error(string code, string message)
    {
        this.Code = code;
        this.Message = message;
    }

    protected override IEnumerable<IComparable> GetEqualityComponents()
    {
        yield return Code;
    }
    public override string ToString()
    {
        return $"{Code}{Separator}{Message}";
    }
    
}
public static class Errors
{


    public static class General
    {
        public static Error GeneralMessage(string code, string message)
        {
            return new Error(code, message);
        }
        public static Error NotFound(string? name = null, long? id = null)
        {
            string label = name == null ? "Value" : name;
            string forId = id == null ? "" : $" for Id '{id}'";
            return new Error("record.not.found", $"{label} not found{forId}");
        }
        
    }
}