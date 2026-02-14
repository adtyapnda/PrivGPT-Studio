from abc import ABC, abstractmethod

class BasePlugin(ABC):
    """
    Base interface for PrivGPT plugins.
    All plugins should inherit from this class and implement the desired hooks.
    """
    
    def before_prompt(self, prompt: str) -> str:
        """
        Hook called before the prompt is processed by the model.
        Can be used to modify the prompt (e.g., adding context, formatting).
        """
        return prompt

    def after_response(self, response: str) -> str:
        """
        Hook called after the model generates a response.
        Can be used to modify the response (e.g., cleaning, adding links).
        """
        return response

    def on_session_start(self):
        """
        Hook called when a new chat session starts.
        """
        pass

    def on_session_end(self):
        """
        Hook called when a chat session ends or is deleted.
        """
        pass
