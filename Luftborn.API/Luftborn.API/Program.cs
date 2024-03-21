using Application;
using Application.MappingProfile;
using Luftborn.Infrastructure;
using Luftborn.Infrastructure.Presistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("Luftborn.Infrastructure")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure();
builder.Services.AddApplication();
builder.Services.AddProfileRegistration();

builder.Services.AddCors(options => {
    options.AddPolicy("CORSPolicy", builder =>
        builder.WithHeaders(HeaderNames.ContentType, "x-custom-header")
            .WithHeaders(HeaderNames.Accept, "*/*")
            .WithHeaders(HeaderNames.AcceptEncoding, "gzip, deflate, br")
            .WithHeaders(HeaderNames.Connection, "keep-alive").AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed((hosts) => true));
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");
app.MapControllers();
app.Run();