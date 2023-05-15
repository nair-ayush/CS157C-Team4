from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db
import os


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    os.environ['CQLENG_ALLOW_SCHEMA_MANAGEMENT'] = '1'
    # Initialize Flask extensions here
    CORS(app, resources={r'/*': {'origins': '*'}})
    db.init_app(app)

    with app.app_context():
        from app.models.activity import Activity, ActivityChurn
        from app.models.listing import Listing, ListingChurn
        from app.models.user import User
        from app.models.plan import Plan, PlanChurn
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
        from app.plans import bp as plans_bp
        app.register_blueprint(plans_bp, url_prefix='/api/plans')
        from app.reviews import bp as review_bp
        app.register_blueprint(review_bp, url_prefix='/api/reviews')

        @app.route('/api')
        def test_page():
            return {"message": "This is the root URL of Explore Mate API"}

        return app
