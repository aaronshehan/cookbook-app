from cookbookdatabase.tables.mongodb_table import MongoDbTable
import cookbookdatabase.db_connection as db_connection
from logger import log
from bson.objectid import ObjectId

class RecipesTable(MongoDbTable):

    def __init__(self, table):
        super().__init__('recipes_table', table)

    def add_recipe(self, recipe):
        insert_result = super().insert(recipe)
        log('Recipe added to the database: ' + str(recipe))
        db_connection.USERS_TABLE.add_recipe( recipe['user_id'], insert_result.inserted_id)



    def modify(self):
        pass

    def delete_recipe(self, user_id, recipe_id):
        recipe_id = ObjectId(recipe_id)
        super().delete(recipe_id)
        log('Deleted recipe from database: ' + str(recipe_id))
        db_connection.USERS_TABLE.delete_recipe(user_id, recipe_id)

    def add_comment(self, recipe_id, comment_id):
        super().add_to_set(recipe_id, 'comments', comment_id)

    def getRecipesFromUser(self, user_id):
        return super().getAll('user_id', int(user_id))


# user {
#     id,
#     email,
#     first name,
#     last name
# }

# recipe {
#     user,
#     id,
#     ingredients,
#     tags,
#     directions,
#     data
# }

# comments {
#     user,
#     recipe id,
#     text,
#     data
# }