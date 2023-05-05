import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    CASSANDRA_HOSTS = [os.environ.get('DATABASE_URI') or '127.0.0.1']
    CASSANDRA_KEYSPACE = os.environ.get('DB_NAME') or 'exploremate'
