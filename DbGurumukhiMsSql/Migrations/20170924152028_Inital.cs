using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DbGurmukhiMsSql.Migrations
{
    public partial class Inital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    ModifiedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    Name = table.Column<string>(type: "nvarchar(250)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubCategories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CategoryId = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    ModifiedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    Name = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    OrderNumber = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    Url = table.Column<string>(type: "nvarchar(250)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Translations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AudioFileName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Character = table.Column<string>(type: "nvarchar(350)", nullable: true),
                    CreatedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    Description = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    English = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Equivalent = table.Column<string>(type: "nvarchar(350)", nullable: true),
                    ImageFileName = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    ModifiedBy = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "'GurmukhiUser'"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetDate()"),
                    OrderNumber = table.Column<int>(nullable: false),
                    Punjabi = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    SubCategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Translations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Translations_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubCategories_CategoryId",
                table: "SubCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Translations_SubCategoryId",
                table: "Translations",
                column: "SubCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Translations");

            migrationBuilder.DropTable(
                name: "SubCategories");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
