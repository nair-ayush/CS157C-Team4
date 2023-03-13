from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    CORS(app, resources={r'/*': {'origins': '*'}})
    db.init_app(app)

    with app.app_context():
        from app.models.activity import Activity
        from app.models.listing import Listing
        from app.models.user import User
        db.sync_db()

        # Register blueprints here
        from app.auth import bp as auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')
        from app.users import bp as users_bp
        app.register_blueprint(users_bp, url_prefix='/api/users')
        from app.listings import bp as listings_bp
        app.register_blueprint(listings_bp, url_prefix='/api/listings')
        from app.activities import bp as activities_bp
        app.register_blueprint(activities_bp, url_prefix='/api/activities')

        @app.route('/api')
        def test_page():
            return {"message": "This is the root URL of Explore Mate API"}

        return app