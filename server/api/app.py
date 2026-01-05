import os
import sys
# Add parent directory to Python path to allow Server module import
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api import create_app
# Initialize Flask app
app = create_app()
# start server
if __name__ == "__main__":
    app.run(debug=True)