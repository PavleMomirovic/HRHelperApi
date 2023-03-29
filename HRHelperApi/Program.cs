using HRHelperApi.Models;
using HRHelperApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<HRHelperDatabaseSettings>(
    builder.Configuration.GetSection("HRHelperDatabase"));

builder.Services.AddSingleton<BranchesService>();
builder.Services.AddSingleton<ProjectsService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options=>{
                options.AddPolicy("CORS",builder=>{
                    builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("CORS");

app.MapControllers();

app.Run();
