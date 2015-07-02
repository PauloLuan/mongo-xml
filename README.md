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
    use entities //     switch between databases.
    show collections

    db.entities.findOne() //    shows the first document saved on database
    db.entities.find().limit(10) //     limits the query results
    db.entities.find({}, {algumaChaveDoJSON : 1}).limit(10) //     shows only the specified fields
    db.entities.find({"uf": "SP"}).count() // count all entities from uf = sp

    db.entities.distinct("algumaChaveDoJSON")

    Object.keys(db.entities.findOne()) // shows the fields of a document.