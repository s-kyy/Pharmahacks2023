using Microsoft.EntityFrameworkCore;
using net7backend.Controllers;
using net7backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DbContext"))
);

builder.Services.AddHttpClient<FlaskController>(client =>
{
    var flaskUrl =
        builder.Configuration.GetSection("FlaskApi")["BaseAddress"]
        ?? throw new Exception("FlaskApi:BaseAddress is not set in appsettings.json");
    client.BaseAddress = new Uri(flaskUrl);
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(
    option =>
        option.AddDefaultPolicy(
            builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
        )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
