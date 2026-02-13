# PrivGPT-Studio Plugins

This directory is for extending the functionality of PrivGPT-Studio without modifying the core codebase.

## Directory Structure
Each plugin must be in its own folder and contain:
- `plugin.py`: The main implementation containing a class that inherits from `BasePlugin`.
- `manifest.json`: Metadata about the plugin.

## Developing a Plugin

1. Create a new folder: `plugins/my_plugin/`.
2. Define the manifest:
```json
{
    "name": "My Plugin",
    "version": "1.0.0",
    "description": "A brief description of what this plugin does."
}
```
3. Implement the logic in `plugin.py`:
```python
from api.plugins.base import BasePlugin

class MyPlugin(BasePlugin):
    def before_prompt(self, prompt: str) -> str:
        # Modify the prompt before it's sent to the AI
        return prompt

    def after_response(self, response: str) -> str:
        # Modify the response before it's shown to the user
        return response
```

## Deployment Considerations
- **Vercel/Cloud Deployment**: If you are deploying to a serverless environment like Vercel, ensure your plugin is located inside the `server/plugins/` directory if the top-level `plugins/` folder isn't being bundled.
- **Dependencies**: Currently, plugins must rely on the dependencies already present in the server's `requirements.txt`. If your plugin requires new libraries, they must be added to the core `requirements.txt`.
- **Statelessness**: Remember that plugin hooks may run in parallel or in different execution contexts in a deployed environment. Avoid relying on global state unless using a persistent store like MongoDB.
