from flask import Flask, request, g
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from logger import log
import json
from bson.json_util import dumps
import cookbookdatabase.db_connection as db_connection
from cookbookdatabase.tables.table_names import *

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'





# Users Table

@app.route('/login/', methods=['POST'])
def login():
    user_info = request.get_json()
    db_connection.USERS_TABLE.login(user_info)
    return 'ok', 200

# End Users Table


# Recipes Table

@app.route('/addRecipe/', methods=['POST'])
def addRecipe():
    recipe = request.get_json()
    db_connection.RECIPES_TABLE.add_recipe(recipe)
    return 'ok', 200

@app.route('/getRecipesFromUser/<user_id>', methods=['GET'])
def getRecipesFromUser(user_id):
    return db_connection.RECIPES_TABLE.getRecipesFromUser(user_id)
    


@app.route('/deleteRecipe/<recipe>', methods=['DELETE'])
def deleteRecipe(recipe):
    recipe = json.loads(recipe)
    db_connection.RECIPES_TABLE.delete_recipe(recipe['user_id'], recipe['recipe_id'])

    return 'ok', 200

# End Recipes Table



# Comments Table

@app.route('/addComment/', methods=['POST'])
def addComment():
    comment = request.get_json()
    db_connection.COMMENTS_TABLE.add_comment(comment)
    return 'ok', 200

# end Comments Table

if __name__ == "__main__":
    app.run(debug=True)