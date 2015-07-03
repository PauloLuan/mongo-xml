# mongo-xml

some tests on reading xml and saving it to mongodb


# Getting start
You have to use nodejs version 0.10.x

First of all download the dependencies:

    npm install

Install MongoDB:

    sudo apt-get install mongodb

# How to debug:

    npm debug

# How to run:

    node --max-old-space-size=8192 --expose-gc index.js

# How to export

## To CSV:

    cd output
    mongoexport --db xmltest --collection entities --csv --fieldFile entities_fields.txt --out entities.csv

## Usefull Mongodb commands:

    show dbs
    use xmltest       //     switch between databases.
    show collections //     show all the "tables"

    db.collection.findOne() //          shows the first document saved on database
    db.collection.find().limit(10) //   limits the query results
    db.collection.find({}, {some_property : 1}).limit(10) //    shows only the specified fields
    db.collection.find({"some_property.some_sub_property": some_value}).count() // count all collection from some_value

    db.collection.distinct("some_property.some_sub_property") // distinct of a specific field.
    db.collection.distinct("some_property")

    // Mongodb uses a "javascript" interface to access the documents persisted on the database.
    Object.keys(db.collection.findOne()) // shows the fields of a document.