
class DatabaseDriver {

    // Users

    static login(user) {
        fetch('/login/', {
            method: 'POST',
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body: JSON.stringify(user)
        }
        );
    }

    static deleteUser(userId) {
        fetch('/deleteUser/' + userId, {
            method: 'DELETE',
            cache: "no-cache",
        });
    }
    
    static follow(followerId, leaderId) {
        var followLinker = JSON.stringify({
            'leader': leaderId,
            'follower': followerId
        });
        
        fetch('/follow/' + followLinker,{
            method: 'POST',
            cache: "no-cache",
        });
    }

    static async getSuggestedFriends(id,number) {
        return fetch('/getSuggestedFriends/' + String(id) + '/' + String(number)).then(response =>
            response.json().then(data => {
                return data;
             })
         );
     }
     
    static save(userId, recipeId) {
        var saveLinker = JSON.stringify({
            'user_id': userId,
            'recipe_id': recipeId
        });

        fetch('/save/' + saveLinker,{
            method: 'POST',
            cache: "no-cache",
        });
    }

    static unsave(userId, recipeId) {
        var saveLinker = JSON.stringify({
            'user_id': userId,
            'recipe_id': recipeId
        });

        fetch('/unsave/' + saveLinker,{
            method: 'DELETE',
            cache: "no-cache",
        });
    }

    static async getUsersSavedRecipes(userId) {
        return fetch('/getUsersSavedRecipes/' + String(userId)).then(response =>
            response.json().then(data => {
                return data.saved_recipes;
            })
        );
    }

    static async getFollowers(userId) {
        return fetch('/followers/' + String(userId)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }

    static async getFollowing(userId) {
        return fetch('/following/' + String(userId)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }


    // End Users

    // Recipes

    static addRecipe(userId, recipe) {
        recipe.user_id = userId

        fetch('/addRecipe/', {
            method: 'POST',
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body: JSON.stringify(recipe)
        }
        );
    }

    static deleteRecipe(userId, recipeId) {
        var recipeToDelete = JSON.stringify({
            'user_id': userId,
            'recipe_id': recipeId
        });

        fetch('/deleteRecipe/' + recipeToDelete, {
            method: 'DELETE',
            cache: "no-cache",
        });
    }

    static updateRecipe(recipe) {
        fetch('/updateRecipe/', {
            method: 'POST',
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body: JSON.stringify(recipe)
        }
        );

    }

    static async getUsersRecipes(userId) {
        return fetch('/getUsersRecipes/' + String(userId)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }


    static async getRecipesFromTag(tag) {
        return fetch('/getRecipesFromTag/' + tag).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }

    static async getNRandomRecipes(id,number) {
        return fetch('/getNRandomRecipes/' + String(id) + '/' + String(number)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }

    static async getRecipesForHomepage(userId) {
        return fetch('/getRecipesForHomepage/' + String(userId)).then(response =>
            response.json().then(data => {
                return data;
            }) 
        );
    }

    static async getUserSaved(userId) {
        return fetch('/getUserSaved/' + String(userId)).then(response =>
            response.json().then(data => {
                return data.saved;
            }) 
        );
    }

    // End Recipes

    // Comments

    static addComment(recipe_id, comment) {
        var comment_to_add = {
            recipe_id: recipe_id,
            comment: comment
        }

        fetch('/addComment/', {
            method: 'POST',
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body: JSON.stringify(comment_to_add)
        }
        );
    }

    static updateComment(comment) {
        fetch('/updateComment/', {
            method: 'POST',
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body: JSON.stringify(comment)
        }
        );

    }

    static async getRecipeComments(recipeId) {
        return fetch('/getRecipeComments/' + String(recipeId)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }

    static deleteComment(commentId) {
        fetch('/deleteComment/' + commentId, {
            method: 'DELETE',
            cache: "no-cache",
        });
    }

    static async getSuggestedComments(id,number) {
        return fetch('/getSuggestedComments/' + String(id) + '/' + String(number)).then(response =>
            response.json().then(data => {
               return data;
            })
        );
    }


    
    // End Comments
}

export default DatabaseDriver;