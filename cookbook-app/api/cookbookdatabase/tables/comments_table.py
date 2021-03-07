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