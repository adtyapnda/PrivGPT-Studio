from api.plugins.base import BasePlugin

class ExamplePlugin(BasePlugin):
    def before_prompt(self, prompt: str) -> str:
        print(f"[ExamplePlugin] Intercepted prompt: {prompt}")
        # Append a tag to the prompt
        return f"{prompt} (processed by ExamplePlugin)"

    def after_response(self, response: str) -> str:
        print(f"[ExamplePlugin] Intercepted response: {response}")
        # Prepend a tag to the response
        return f"[PROCESSED] {response}"

    def on_session_start(self):
        print(f"[ExamplePlugin] Session started")

    def on_session_end(self):
        print(f"[ExamplePlugin] Session ended")
