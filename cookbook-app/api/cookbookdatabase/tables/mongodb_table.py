from logger import log
from bson.json_util import dumps

class MongoDbTable:
    def __init__(self, table_name, table):
        self._table_name = table_name
        self._table = table
        log("Connected to " + table_name)

    @property
    def table_name(self):
        return self._table_name

    @table_name.setter
    def set_table_name(self, table_name):
        self._table_name = table_name

    @property
    def table(self):
        return self._table

    @table.setter
    def set_table(self, table):
        self.table = table

    def doesIdExist(self, id):
        return self._table.find({'_id': id}).count() > 0

    def getAll(self, field, value):
        recipes = list(self._table.find({field: value}))
        return dumps(recipes)

    def insert(self, data):
        return self._table.insert_one(data)

    def add_to_set(self, id, field, new_value):
        return self._table.update_one({'_id': id}, { '$addToSet': { field: new_value }})

    def modify(self):
        pass

    def delete(self, id):
        self._table.delete_one( { '_id': id } )

    def delete_from_set(self, id, field, value_to_delete):
        self._table.update({ '_id': id }, { '$pull': { field:  value_to_delete} })