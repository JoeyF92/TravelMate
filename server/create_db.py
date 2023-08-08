from application import app, db
from application.models import User, Album, BucketList, Content, Itinerary, PackingList, Preference, Token

def delete_database():
    with app.app_context():
        db.drop_all()


def create_database():
    with app.app_context():
        db.create_all()


def add_entries():
    #add testing data here


if __name__ == "__main__":
    delete_database()
    create_database()
    add_entries()
