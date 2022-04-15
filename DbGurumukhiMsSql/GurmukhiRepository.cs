using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbGurmukhiModel;
using DbGurmukhiMsSql.Interface;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

namespace DbGurmukhiMsSql
{
    public class GurmukhiRepository : IGurmukhiRepository
    {
        private readonly string _connStr;

        public GurmukhiRepository(string connStr)
        {
            _connStr = connStr;
        }
        public async Task<List<Category>> GetCategoriesAsync()
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var linqQuery = context.Categories;
                return await linqQuery.ToListAsync();
            }
        }

        public async Task<Category> GetCategoryViaIdAsync(int cateogryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var category = await context.Categories.FirstOrDefaultAsync(itm=>itm.Id == cateogryId);
                return category;
            }
        }

        public async Task<bool> DeleteCategoryViaIdAsync(int cateogryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var category = await context.Categories.FirstOrDefaultAsync(itm => itm.Id == cateogryId);
                if (category != null)
                {
                    context.Categories.Remove(category);
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return true;
                    }
                }
                return false;
            }
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            category.CreatedBy = category.ModifiedBy;
            using (var context = new DbGurmukhiContext(_connStr))
            {
                await context.Categories.AddAsync(category);
                if (await context.SaveChangesAsync() > 0)
                {
                    return category;
                }
                return null;
            }
        }

        public async Task<Category> UpdateCategoryAsync(Category category)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var categoryDb = await context.Categories
                        .FirstOrDefaultAsync(itm => itm.Id == category.Id);
                if (categoryDb != null)
                {
                    categoryDb.Name = category.Name;
                    categoryDb.ModifiedOn = category.ModifiedOn;
                    categoryDb.ModifiedBy = category.ModifiedBy;
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return categoryDb;
                    }
                }
                return null;
            }
        }

        public async Task<List<SubCategory>> GetSubCategoriesAsync(int categoryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var linqQuery = context.SubCategories
                    .Where(fld=>fld.CategoryId == categoryId);
                return await linqQuery.ToListAsync();
            }
        }

        public async Task<SubCategory> GetSubCategoryViaIdAsync(int subcategoryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var subcategory =await context.SubCategories
                    .FirstOrDefaultAsync(fld => fld.Id == subcategoryId);
                return subcategory;
            }
        }

        public async Task<SubCategory> UpdateSubCategoryAsync(SubCategory subcategory)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var subcategoryDb = await context.SubCategories
                                        .FirstOrDefaultAsync(fld => fld.Id == subcategory.Id);
                if (subcategoryDb != null)
                {
                    subcategoryDb.CategoryId = subcategory.CategoryId;
                    subcategoryDb.Name = subcategory.Name;
                    subcategoryDb.Url = subcategory.Url;
                    subcategoryDb.OrderNumber = subcategory.OrderNumber;
                    subcategoryDb.ModifiedOn = subcategory.ModifiedOn;
                    subcategoryDb.ModifiedBy = subcategory.ModifiedBy;
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return subcategoryDb;
                    }
                }
                return null;
            }
        }

        public async Task<SubCategory> CreateSubCategoryAsync(SubCategory subcategory)
        {
            subcategory.CreatedBy = subcategory.ModifiedBy;
            using (var context = new DbGurmukhiContext(_connStr))
            {
                await context.SubCategories.AddAsync(subcategory);
                if (await context.SaveChangesAsync() > 0)
                {
                    return subcategory;
                }
                return null;
            }
        }

        public async Task<bool> DeleteSubCategoryViaIdAsync(int subcateogryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var subcategory = await context.SubCategories.FirstOrDefaultAsync(itm => itm.Id == subcateogryId);
                if (subcategory != null)
                {
                    context.SubCategories.Remove(subcategory);
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return true;
                    }
                }
                return false;
            }
        }

        public async Task<List<Translation>> GetTranslationAsync(int subcategoryId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var linqQuery = context.Translations
                    .Where(fld => fld.SubCategoryId == subcategoryId);
                return await linqQuery.ToListAsync();
            }
        }

        public async Task<Translation> GetTranslationViaIdAsync(int translationId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var linqQuery = await context.Translations
                    .FirstOrDefaultAsync(fld => fld.Id == translationId);
                return linqQuery;
            }
        }

        public async Task<Translation> CreateTranslationViaIdAsync(Translation translation)
        {
            translation.CreatedBy = translation.ModifiedBy;
            using (var context = new DbGurmukhiContext(_connStr))
            {
                await context.Translations.AddAsync(translation);
                if (await context.SaveChangesAsync() > 0)
                {
                    return translation;
                }
                return null;
            }
        }

        public async Task<Translation> UpdateTranslationViaIdAsync(Translation translation)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var translationDb = await context.Translations
                    .FirstOrDefaultAsync(fld => fld.Id == translation.Id);
                if (translationDb != null)
                {
                    translationDb.OrderNumber = translation.OrderNumber;
                    translationDb.AudioFileName = translation.AudioFileName;
                    translationDb.Character = translation.Character;
                    translationDb.Description = translation.Description;
                    translationDb.English = translation.English;
                    translationDb.Equivalent = translation.Equivalent;
                    translationDb.ImageFileName = translation.ImageFileName;
                    translationDb.Punjabi = translation.Punjabi;
                    translationDb.SubCategoryId = translation.SubCategoryId;
                    translationDb.ModifiedOn = translation.ModifiedOn;
                    translationDb.ModifiedBy = translation.ModifiedBy;
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return translationDb;
                    }
                }
                return null;
            }
        }

        public async Task<bool> DeleteTranslationViaIdAsync(int translationId)
        {
            using (var context = new DbGurmukhiContext(_connStr))
            {
                var translation = await context.Translations.FirstOrDefaultAsync(itm => itm.Id == translationId);
                if (translation != null)
                {
                    context.Translations.Remove(translation);
                    if (await context.SaveChangesAsync() > 0)
                    {
                        return true;
                    }
                }
                return false;
            }
        }
    }
}
