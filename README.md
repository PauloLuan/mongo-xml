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
