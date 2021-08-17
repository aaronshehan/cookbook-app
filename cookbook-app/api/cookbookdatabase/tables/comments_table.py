from cookbookdatabase.tables.mongodb_table import MongoDbTable
import cookbookdatabase.db_connection as db_connection
from bson.objectid import ObjectId
from logger import log

class CommentsTable(MongoDbTable):

    def __init__(self, table):
        super().__init__('comments_table', table)

    def add_comment(self, comment):
        insert_result = super().insert(comment)
        db_connection.RECIPES_TABLE.add_comment(ObjectId(comment['recipe_id']), insert_result.inserted_id)

    def update_comment(self, comment):
        comment_id = ObjectId(comment['_id'])
        del comment['_id']

        super().update(comment_id, comment)
    
    def get_recipe_comments(self, recipe_id):
        return super().get_all('recipe_id', recipe_id)

    def delete_comment(self, comment_id):
        comment_id = ObjectId(comment_id)
        super().delete(comment_id)
        log('Deleted comment from database: ' + str(comment_id))

    def get_suggested_comments(self, id, number):
        return super().get_random_docs(id, number)