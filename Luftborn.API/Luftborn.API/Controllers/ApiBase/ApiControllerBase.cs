using System.Net;
using System.Runtime.InteropServices.JavaScript;
using Luftborn.Core.ValueObjects;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn.API.Controllers.ApiBase;

[ApiController]
[Route("[controller]")]
public class ApiControllerBase : ControllerBase
{
    protected new IActionResult Ok(object result = null)
    {
        return new EnvelopeResult(Envelope.Ok(result), HttpStatusCode.OK);
    }

    protected IActionResult NotFound(Error error, string invalidField = null)
    {
        return new EnvelopeResult(Envelope.Error(error, invalidField), HttpStatusCode.NotFound);
    }

    protected IActionResult Error(Error error, string invalidField = null)
    {
        return new EnvelopeResult(Envelope.Error(error, invalidField), HttpStatusCode.BadRequest);
    }
}