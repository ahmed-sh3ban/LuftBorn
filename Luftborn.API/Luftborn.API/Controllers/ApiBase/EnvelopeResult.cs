using System.Net;
using System.Runtime.InteropServices.JavaScript;
using Luftborn.Core.ValueObjects;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn.API.Controllers.ApiBase;


    public sealed class EnvelopeResult : IActionResult
    {
        private readonly Envelope _envelope;
        private readonly int _statusCode;

        public EnvelopeResult(Envelope envelope, HttpStatusCode statusCode)
        {
            _statusCode = (int)statusCode;
            _envelope = envelope;
        }
        public Task ExecuteResultAsync(ActionContext context)
        {
            var objectResult = new ObjectResult(_envelope)
            {
                StatusCode = _statusCode
            };

            return objectResult.ExecuteResultAsync(context);
        }
    }
    public class Envelope
    {
        public object Result { get; }
        public string ErrorCode { get; }
        public string ErrorMessage { get; }

        private Envelope(object result, Error error, string invalidField)
        {
            Result = result;
            ErrorCode = error?.Code;
            ErrorMessage = error?.Message;
        }

        public static Envelope Ok(object result = null)
        {
            return new Envelope(result, null, null);
        }

        public static Envelope Error(Error error, string invalidField)
        {
            return new Envelope(null, error, invalidField);
        }
    }
