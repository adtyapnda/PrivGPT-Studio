from flask import Blueprint, request, jsonify, current_app
from api import mongo
import jwt
import datetime
from bson import ObjectId

review_bp = Blueprint('review', __name__)

def verify_token(request):
    token = None
    if 'Authorization' in request.headers:
        auth_header = request.headers['Authorization']
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
    
    if not token:
        return None
        
    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        return data
    except:
        return None

@review_bp.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = list(mongo.db.reviews.find().sort('created_at', -1))
        
        for review in reviews:
            review['_id'] = str(review['_id'])
            if 'user_id' in review:
                review['user_id'] = str(review['user_id'])
                
        return jsonify(reviews), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching reviews', 'error': str(e)}), 500

@review_bp.route('/api/reviews', methods=['POST'])
def add_review():
    user_data = verify_token(request)
    if not user_data:
        return jsonify({'message': 'Unauthorized'}), 401

    data = request.get_json()
    
    if not data or not data.get('rating') or not data.get('comment'):
        return jsonify({'message': 'Missing rating or comment'}), 400
        
    user_id = user_data['user_id']
    
    existing_review = mongo.db.reviews.find_one({'user_id': ObjectId(user_id)})
    if existing_review:
        return jsonify({'message': 'You have already submitted a review'}), 409
        
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    
    review = {
        'user_id': ObjectId(user_id),
        'username': user.get('username', 'Anonymous'),
        'rating': int(data.get('rating')),
        'comment': data.get('comment'),
        'role': 'User', # Default role
        'created_at': datetime.datetime.utcnow()
    }
    
    mongo.db.reviews.insert_one(review)
    
    return jsonify({'message': 'Review submitted successfully'}), 201