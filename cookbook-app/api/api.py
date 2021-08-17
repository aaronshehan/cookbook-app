from flask import Flask, request, g
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from logger import log
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
import cookbookdatabase.db_connection as db_connection

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/getRecipesFromTag/<tag>', methods=['GET'])
def get_recipes_from_tag(tag):
  return db_connection.RECIPES_TABLE.get_recipes_from_tag(tag)


# Users Table

@app.route('/login/', methods=['POST'])
def login():
    user_info = request.get_json()

    db_connection.USERS_TABLE.login(user_info)

    return 'ok', 200


@app.route('/deleteUser/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    db_connection.USERS_TABLE.delete_user(user_id)

    return 'ok', 200

@app.route('/deleteComment/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    db_connection.COMMENTS_TABLE.delete_comment(comment_id)

    return 'ok', 200

@app.route('/follow/<followLinker>', methods=['POST'])
def follow(followLinker):
    followLinker = json.loads(followLinker)
    db_connection.USERS_TABLE.follow(followLinker['follower'],followLinker['leader'])
    return 'ok', 200

@app.route('/unfollow/<followLinker>', methods=['DELETE'])
def unfollow(followLinker):
    followLinker = json.loads(followLinker)
    db_connection.USERS_TABLE.unfollow(followLinker['follower'],followLinker['leader'])
    return 'ok', 200

@app.route('/getSuggestedFriends/<id>/<number>', methods=['GET'])
def get_suggested_friends(id,number):
  return db_connection.USERS_TABLE.get_suggested_friends(id, int(number))

@app.route('/getSuggestedComments/<id>/<number>', methods=['GET'])
def get_suggested_comments(id,number):
  return db_connection.COMMENTS_TABLE.get_suggested_comments(id, int(number))

@app.route('/save/<saveLinker>', methods=['POST'])
def save(saveLinker):
    saveLinker = json.loads(saveLinker)
    db_connection.USERS_TABLE.save_recipe(saveLinker['user_id'],saveLinker['recipe_id'])
    return 'ok', 200

@app.route('/unsave/<saveLinker>', methods=['DELETE'])
def unsave(saveLinker):
    saveLinker = json.loads(saveLinker)
    db_connection.USERS_TABLE.remove_save_recipe(saveLinker['user_id'],saveLinker['recipe_id'])
    return 'ok', 200    

@app.route('/getUsersSavedRecipes/<user_id>', methods=['GET'])
def get_users_saved_recipes(user_id):
   return db_connection.USERS_TABLE.get_users_saved_recipes(user_id)

@app.route('/followers/<user_id>', methods=['GET'])
def getFollowers(user_id): #People following this user
    return db_connection.USERS_TABLE.get_user_followers(user_id)

@app.route('/following/<user_id>', methods=['GET'])
def getFollowing(user_id): #People this user is following
    return db_connection.USERS_TABLE.get_user_following(user_id)    
    
# End Users Table


# Recipes Table

@app.route('/addRecipe/', methods=['POST'])
def add_recipe():
    recipe = request.get_json()

    db_connection.RECIPES_TABLE.add_recipe(recipe)

    return 'ok', 200
    

@app.route('/updateRecipe/', methods=['POST'])
def update_recipe():
    recipe = request.get_json()

    db_connection.RECIPES_TABLE.update_recipe(recipe)

    return 'ok', 200

@app.route('/updateComment/', methods=['POST'])
def update_comment():
    comment = request.get_json()

    db_connection.COMMENTS_TABLE.update_comment(comment)

    return 'ok', 200

@app.route('/getRecipeComments/<recipe_id>', methods=['GET'])
def get_recipe_comments(recipe_id):
  return db_connection.COMMENTS_TABLE.get_recipe_comments(recipe_id)


@app.route('/getUsersRecipes/<user_id>', methods=['GET'])
def get_users_recipes(user_id):
  return db_connection.RECIPES_TABLE.get_users_recipes(user_id)

@app.route('/getUserSaved/<user_id>', methods=['GET'])
def get_user_saved(user_id):
    user = db_connection.USERS_TABLE.get_user(user_id)
    saved = []
    for i in user['saved_recipes']:
        recipe = db_connection.RECIPES_TABLE.find_one('_id', ObjectId(i))
        recipe['_id'] = {'$oid': str(recipe['_id']) }
        saved.append(recipe)

    return {'saved': saved}


@app.route('/getNRandomRecipes/<id>/<number>', methods=['GET'])
def get_n_random_recipes(id,number):
  return db_connection.RECIPES_TABLE.get_n_random_recipes(id, int(number))
    
@app.route('/getRecipesForHomepage/<user_id>', methods=['GET'])
def getRecipesForHomepage(user_id):
    user = db_connection.USERS_TABLE.get_user(user_id)
    global frontpage
    frontpage = []
    for i in list(user['followingList']):
        frontpage.append(db_connection.RECIPES_TABLE.get_users_recipes(i))
    return frontpage


@app.route('/deleteRecipe/<recipe>', methods=['DELETE'])
def delete_recipe(recipe):
    recipe = json.loads(recipe)

    user_id = recipe['user_id']
    recipe_id = ObjectId(recipe['recipe_id'])

    db_connection.RECIPES_TABLE.delete_recipe(user_id, recipe_id)

    return 'ok', 200

# End Recipes Table



# Comments Table

@app.route('/addComment/', methods=['POST'])
def add_comment():
    comment = request.get_json()

    db_connection.COMMENTS_TABLE.add_comment(comment)

    return 'ok', 200

# end Comments Table

@app.route('/logError/', methods=['POST'])
def log_error():
    error = request.get_json()
    log('---------------------------------------------------------------------')
    log('Log sent from front-end: ' + str(error))
    log('---------------------------------------------------------------------')
    return 'ok', 200

if __name__ == "__main__":
    app.run(debug=True)