from application import db, create_app
from application.models.models import User, Album, BucketList, Content, Itinerary, PackingList, Preference, Token

app = create_app("TEST")

def delete_database():
    with app.app_context():
        db.drop_all()


def create_database():
    with app.app_context():
        db.create_all()


def add_entries():
    user1 = User(first_name="Mahir", last_name="Jalil", email="mj@travelmate.com", username="mahir", password="$2b$10$0UsBpSb6f1SGBZL1vl2xQepH.Kzc/s.6DRvWyd8GNEH07XQTtNIG2")
    user2 = User(first_name="Joe", last_name="Fountain", email="jf@travelmate.com", username="joe", password="$2b$10$M4U.i5AoIKkQEkg19uiqle0RYOUsJHoUQIRXbimvt.VkBdlizGcHG")
    user3 = User(first_name="Sabrina", last_name="Wright", email="sw@travelmate.com", username="sabrina", password="$2b$10$B7ApN9WVoln93GEYfQetGuC/Gj5NyhFxkRN3GJykd2yreelNuNd1K")
    user4 = User(first_name="Josh", last_name="Murray", email="jm@travelmate.com", username="josh", password="$2b$10$Qq67VLNhhfDIZ/yCLs0zv.QOXZOA5rhQ6MOPCEoQ5ceWSHdd9qwSi")
    user5 = User(first_name="Marcell", last_name="Batta", email="mb@travelmate.com", username="marcell", password="$2b$10$hkCuPS6ceTvZl.9jDGZhiOcnBGkKw5XCSmfEezBqTR6yXZkpZh0li")

    preference1 = Preference(foods="", hobbies="hiking, football", other="", user_id=1)
    preference2 = Preference(foods="vegan", hobbies="", other="", user_id=2)
    preference3 = Preference(foods="italian", hobbies="", other="", user_id=3)
    preference4 = Preference(foods="", hobbies="football", other="", user_id=4)
    preference5 = Preference(foods="hungarian", hobbies="", other="require wheelchair", user_id=5)

    bucketlist1 = BucketList(destination="munich", description="go on some hikes", user_id=1)
    bucketlist2 = BucketList(destination="bristol", description="night out with the boys", user_id=2)
    bucketlist3 = BucketList(destination="rome", description="try restaurants", user_id=3)
    bucketlist4 = BucketList(destination="london", description=" watch football", user_id=4)
    bucketlist5 = BucketList(destination="madrid", description="stag do", user_id=5)
    bucketlist6 = BucketList(destination="wales", description="weekend trip", user_id=5)

    packinglist1 = PackingList(destination="munich", items="clothing", user_id=1)
    packinglist2 = PackingList(destination="munich", items="toiletries", user_id=1)
    packinglist3 = PackingList(destination="munich", items="phone", user_id=1)
    packinglist4 = PackingList(destination="munich", items="passport", user_id=1)
    packinglist5 = PackingList(destination="munich", items="wallet", user_id=1)
    packinglist6 = PackingList(destination="bristol", items="phone", user_id=2)
    packinglist7 = PackingList(destination="bristol", items="wallet", user_id=2)
    packinglist8 = PackingList(destination="bristol", items="keys", user_id=2)
    packinglist9 = PackingList(destination="rome", items="clothing", user_id=3)
    packinglist10 = PackingList(destination="rome", items="toiletries", user_id=3)
    packinglist11 = PackingList(destination="rome", items="phone", user_id=3)
    packinglist12 = PackingList(destination="rome", items="passport", user_id=3)
    packinglist13 = PackingList(destination="rome", items="wallet", user_id=3)
    packinglist14 = PackingList(destination="london", items="wallet", user_id=4)
    packinglist15 = PackingList(destination="london", items="phone", user_id=4)
    packinglist16 = PackingList(destination="london", items="cash", user_id=4)
    packinglist17 = PackingList(destination="london", items="tickets", user_id=4)
    packinglist18 = PackingList(destination="madrid", items="passport", user_id=5)
    packinglist19 = PackingList(destination="madrid", items="clothing", user_id=5)
    packinglist20 = PackingList(destination="madrid", items="toiletries", user_id=5)
    packinglist21 = PackingList(destination="madrid", items="wallet", user_id=5)

    album1 = Album(title="Travel Mate", location="Paris", description="Nice relaxing holiday after a long project!", members="1,2,3,4,5", start_date="2023-08-18T08:00:00Z", end_date="2023-08-25T08:00:00Z", share_code=123456, cover_photo="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900", user_id=1)

    album2 = Album(title="Travel Mate", location="Paris", description="Nice relaxing holiday after a long project!", members="2,3,4,5,6,7", start_date="2023-08-18T08:00:00Z", end_date="2023-08-25T08:00:00Z", share_code=123456, cover_photo="https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900", user_id=2)

    content1 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678245/holiday-content/th-3805981138_trtqa1.jpg", description="John couldn't stop laughing when we got lost trying to find our way around Berlin's charming streets!", tags="lost,berlin,laughing", album_id=1)
    content2 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678250/holiday-content/th-2490909086_od64ai.jpg", description="Emily had a blast exploring Berlin's vibrant street art scene and even tried her hand at graffiti!", tags="berlin,graffiti", album_id=1)
    content3 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678256/holiday-content/th-3260287098_fapa7f.jpg", description="Alex's favorite memory from the weekend in Berlin was devouring delicious currywurst with a view of the Brandenburger Tor!", tags="berlin,food", album_id=1)
    content4 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678261/holiday-content/th-3138673344_mhc8pl.jpg", description="We had a hilarious encounter with a street performer while exploring Berlin, leaving John in stitches!", tags="berling,preformer", album_id=1)
    content5 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678271/holiday-content/th-315588252_twcpz3.jpg", description="Emily and Alex couldn't stop laughing at each other's attempts to pronounce 'Brandenburger Tor' correctly!", tags="laughing", album_id=1)
    content6 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678304/holiday-content/th-3020884576_kh5kxn.jpg", description="Enjoyed a leisurely bike ride around Berlin's beautiful parks and lakes!", tags="biking,berlin", album_id=1)
    content7 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678292/holiday-content/th-800408886_udy2pj.jpg", description="Indulged in delicious pretzels and schnitzel during a memorable weekend in Berlin!", tags="berlin,pretzel,schnitzel", album_id=1)
    content8 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678285/holiday-content/th-719736726_bvbuy1.jpg", description="Explored Berlin's fascinating history at the DDR Museum and Checkpoint Charlie!", tags="berlin,museum", album_id=1)
    content9 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678271/holiday-content/th-315588252_twcpz3.jpg", description="Spent a relaxing weekend in Berlin enjoying live music at Mauerpark!", tags="berlin,music", album_id=1)
    content10 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678271/holiday-content/th-315588252_twcpz3.jpg", description="Took a scenic boat tour along the Spree River and admired Berlin's iconic landmarks!", tags="berlin,boat", album_id=1)
    content11 = Content(photo="", description="John, Emily, and Alex danced the night away at a lively Berlin nightclub!", tags="berlin,club", album_id=1)
    content12 = Content(photo="", description="Explored the remnants of the Berlin Wall with John, Emily, and Alex, reflecting on history's lessons.", tags="berlin wall,history", album_id=1)
    content13 = Content(photo="", description="Alex and Emily enjoyed a romantic sunset over the Berlin skyline, making unforgettable memories.", tags="sunset,berlin", album_id=1)
    content14 = Content(photo="", description="John discovered his hidden talent for bratwurst grilling during a fun-filled barbecue in Berlin!", tags="bratwurst,grilling,berlin", album_id=1)

    content15 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678245/holiday-content/th-3805981138_trtqa1.jpg", description="John couldn't stop laughing when we got lost trying to find our way around Berlin's charming streets!", tags="lost,berlin,laughing", album_id=2)
    content16 = Content(photo="https://res.cloudinary.com/dwxery2ci/image/upload/v1691678250/holiday-content/th-2490909086_od64ai.jpg", description="Emily had a blast exploring Berlin's vibrant street art scene and even tried her hand at graffiti!", tags="berlin,graffiti", album_id=2)

    with app.app_context():
        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)
        db.session.add(user4)
        db.session.add(user5)

        db.session.add(preference1)
        db.session.add(preference2)
        db.session.add(preference3)
        db.session.add(preference4)
        db.session.add(preference5)

        db.session.add(bucketlist1)
        db.session.add(bucketlist2)
        db.session.add(bucketlist3)
        db.session.add(bucketlist4)
        db.session.add(bucketlist5)
        db.session.add(bucketlist6)

        db.session.add(packinglist1)
        db.session.add(packinglist2)
        db.session.add(packinglist3)
        db.session.add(packinglist4)
        db.session.add(packinglist5)
        db.session.add(packinglist6)
        db.session.add(packinglist7)
        db.session.add(packinglist8)
        db.session.add(packinglist9)
        db.session.add(packinglist10)
        db.session.add(packinglist11)
        db.session.add(packinglist12)
        db.session.add(packinglist13)
        db.session.add(packinglist14)
        db.session.add(packinglist15)
        db.session.add(packinglist16)
        db.session.add(packinglist17)
        db.session.add(packinglist18)
        db.session.add(packinglist19)
        db.session.add(packinglist20)
        db.session.add(packinglist21)

        db.session.add(album1)
        db.session.add(album2)

        db.session.add(content1)
        db.session.add(content2)
        db.session.add(content3)
        db.session.add(content4)
        db.session.add(content5)
        db.session.add(content6)
        db.session.add(content7)
        db.session.add(content8)
        db.session.add(content9)
        db.session.add(content10)
        db.session.add(content11)
        db.session.add(content12)
        db.session.add(content13)
        db.session.add(content14)
        db.session.add(content15)
        db.session.add(content16)

        db.session.commit()


if __name__ == "__main__":
    delete_database()
    create_database()
    add_entries()
