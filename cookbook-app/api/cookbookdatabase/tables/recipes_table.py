from cookbookdatabase.tables.mongodb_table import MongoDbTable
import cookbookdatabase.db_connection as db_connection
from logger import log
from datetime import datetime
from bson.objectid import ObjectId
import pytz

class RecipesTable(MongoDbTable):

    def __init__(self, table):
        super().__init__('recipes_table', table)

    def add_recipe(self, recipe):
        ct = pytz.timezone('America/Chicago')
        now_ct = ct.normalize(ct.localize(datetime.now()))
        recipe['date_added'] = '{}'.format(now_ct.strftime('%Y-%m-%d %I:%M %p'))
        insert_result = super().insert(recipe)
        #log('Recipe added to the database: ' + str(recipe))
        db_connection.USERS_TABLE.add_recipe( recipe['user_id'], insert_result.inserted_id)

    def get_recipes_from_tag(self, tag):
        return super().get_all('tags', tag)

    def get_recipe(self, recipe_id):
        return super().find_one('recipe_id', recipe_id)
    def compute_rating_avg(self, ratings):
        log(str(ratings))
        return sum(ratings) / len(ratings)

    def update_recipe(self, newRecipeData):
        recipe_id = ObjectId(newRecipeData['recipe_id'])
        del newRecipeData['recipe_id']

        if ('ratings' in newRecipeData.keys()):
            ratings = newRecipeData['ratings']['rating']
            ratings = sum(ratings) // len(ratings) 
            log(str(ratings))
            # avg_rating = RecipesTable.compute_rating_avg(newRecipeData['ratings']['rating'])
            # newRecipeData['rating'] = avg_rating
            newRecipeData['rating'] = ratings

        super().update(recipe_id, newRecipeData)

    def delete_recipe(self, user_id, recipe_id):
        super().delete(recipe_id)
        log('Deleted recipe from database: ' + str(recipe_id))
        db_connection.USERS_TABLE.delete_recipe(user_id, recipe_id)

    def add_comment(self, recipe_id, comment_id):
        super().add_to_set(recipe_id, 'comments', comment_id)

    def get_users_recipes(self, user_id):
        return super().get_all('user_id', user_id)

    def get_n_random_recipes(self, id, number):
        return super().get_random_docs(id, number)

    def compute_rating_avg(self, ratings):
        return sum(ratings) / len(ratings)

