using Microsoft.EntityFrameworkCore;

namespace net7backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<SymptomData> SymptomData { get; set; }
        public DbSet<FoodData> FoodData { get; set; }
        public DbSet<PredictedContribution> PredictedContributions { get; set; }

        public DbSet<ChildFood> ChildFoods { get; set; }
        public DbSet<ParentFood> ParentFoods { get; set; }

        public DbSet<ParentChildAssociation> ParentChildAssociation { get; set; }
    }
}
