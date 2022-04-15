using System;
using System.Linq;
using DbGurmukhiModel;
using Microsoft.EntityFrameworkCore;

namespace DbGurmukhiMsSql
{
    public class DbGurmukhiContext : DbContext
    {
        private readonly string _connectionStr;
        private const string Default_User = "'GurmukhiUser'";
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Translation> Translations { get; set; }

        
        public DbGurmukhiContext(string connectionStr)
        {
            _connectionStr = connectionStr;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=DESKTOP-GNJ1KLO;Initial Catalog=GurmukhiDrillsV2;Integrated Security=True");
            optionsBuilder.UseSqlServer(_connectionStr);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .Property(t => t.Name)
                .HasColumnType("nvarchar(250)")
                .IsRequired();

            modelBuilder.Entity<SubCategory>()
                .Property(t => t.Name)
                .HasColumnType("nvarchar(250)")
                .IsRequired();

            modelBuilder.Entity<SubCategory>()
                .Property(t => t.Url)
                .HasColumnType("nvarchar(250)");

            modelBuilder.Entity<SubCategory>()
                .Property(t => t.OrderNumber)
                .HasDefaultValueSql("0");

            modelBuilder.Entity<Translation>()
                .Property(t => t.Punjabi)
                .HasColumnType("nvarchar(250)")
                .IsRequired();

            modelBuilder.Entity<Translation>()
                .Property(t => t.English)
                .HasColumnType("nvarchar(250)")
                .IsRequired();

            modelBuilder.Entity<Translation>()
                .Property(t => t.Character)
                .HasColumnType("nvarchar(350)");

            modelBuilder.Entity<Translation>()
                .Property(t => t.Equivalent)
                .HasColumnType("nvarchar(350)");

            modelBuilder.Entity<Translation>()
                .Property(t => t.Description)
                .HasColumnType("nvarchar(500)");

            modelBuilder.Entity<Translation>()
                .Property(t => t.ImageFileName)
                .HasColumnType("nvarchar(250)");

            modelBuilder.Entity<Translation>()
                .Property(t => t.AudioFileName)
                .HasColumnType("nvarchar(250)");

            // Added audit columns
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entityType.Name)
                    .Property<string>("CreatedBy")
                    .HasDefaultValueSql(Default_User)
                    .HasMaxLength(50);

                modelBuilder.Entity(entityType.Name)
                    .Property<DateTime>("CreatedOn")
                    .HasDefaultValueSql("GetDate()");

                modelBuilder.Entity(entityType.Name)
                    .Property<string>("ModifiedBy")
                    .HasDefaultValueSql(Default_User)
                    .HasMaxLength(50);

                modelBuilder.Entity(entityType.Name)
                    .Property<DateTime>("ModifiedOn")
                    .HasDefaultValueSql("GetDate()");
            }
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                entry.Property("ModifiedOn").CurrentValue = DateTime.Now;
            }

            return base.SaveChanges();
        }
    }

}
