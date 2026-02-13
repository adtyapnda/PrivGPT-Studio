import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    CORS_HEADERS = "Content-Type"
    #here the second value shows the default value if the environment variable is not set
    MONGO_URI = os.getenv("MONGODB_URL", "mongodb://localhost:27017/privgpt")
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your_gemini_api_key")
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key")
    # Plugins directory logic
    # Try project root first, then fallback to a plugins folder within the server directory
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # this is the 'server' folder
    PROJECT_ROOT = os.path.dirname(BASE_DIR)
    
    _default_plugins_dir = os.path.join(PROJECT_ROOT, "plugins")
    if not os.path.exists(_default_plugins_dir):
        _default_plugins_dir = os.path.join(BASE_DIR, "plugins")
        
    PLUGINS_DIR = os.getenv("PLUGINS_DIR", _default_plugins_dir)
    ENABLED_PLUGINS = os.getenv("ENABLED_PLUGINS", None) # Comma-separated list of plugin folder names
