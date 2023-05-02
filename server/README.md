## INSTALLATION REQUIREMENTS

If you're using a virtual environment, set one up and then execute the following command or if you're planning to work under the global scope, then directly execute the following command.

```sh
# assume you are in the app directory.
cd server/
pip install -r requirement.txt
```

Create a keyspace in your local Cassandra installation called `exploremate`

```db
CREATE KEYSPACE exploremate WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1 };
```

```sh
python db-populate.py
```
