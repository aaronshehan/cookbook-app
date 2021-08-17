from pymongo import MongoClient
from cookbookdatabase.tables.recipes_table import RecipesTable
from cookbookdatabase.tables.users_table import UsersTable
from cookbookdatabase.tables.comments_table import CommentsTable
from cookbookdatabase.credentials import DB_CONNECTION_URI
from logger import log

__MONGO_CLIENT = MongoClient(DB_CONNECTION_URI)

log('Connected to Database')

__DB = __MONGO_CLIENT.get_database('Cookbook')

USERS_TABLE = UsersTable( __DB.get_collection('users_table') )

RECIPES_TABLE = RecipesTable( __DB.get_collection('recipes_table') )

COMMENTS_TABLE = CommentsTable( __DB.get_collection('comments_table') )
