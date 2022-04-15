using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using DbGurmukhiMsSql;

namespace DbGurmukhiMsSql.Migrations
{
    [DbContext(typeof(DbGurmukhiContext))]
    [Migration("20170924152028_Inital")]
    partial class Inital
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DbGurmukhiModel.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("ModifiedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("ModifiedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("DbGurmukhiModel.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("ModifiedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("ModifiedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<int>("OrderNumber")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("DbGurmukhiModel.Translation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AudioFileName")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Character")
                        .HasColumnType("nvarchar(350)");

                    b.Property<string>("CreatedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("English")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Equivalent")
                        .HasColumnType("nvarchar(350)");

                    b.Property<string>("ImageFileName")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("ModifiedBy")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("'GurmukhiUser'")
                        .HasMaxLength(50);

                    b.Property<DateTime>("ModifiedOn")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("GetDate()");

                    b.Property<int>("OrderNumber");

                    b.Property<string>("Punjabi")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<int>("SubCategoryId");

                    b.HasKey("Id");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Translations");
                });

            modelBuilder.Entity("DbGurmukhiModel.SubCategory", b =>
                {
                    b.HasOne("DbGurmukhiModel.Category", "Category")
                        .WithMany("SubCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DbGurmukhiModel.Translation", b =>
                {
                    b.HasOne("DbGurmukhiModel.SubCategory", "SubCategory")
                        .WithMany("Translations")
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
