import os
import json
import importlib.util
import logging
import sys
from typing import List, Dict, Any
from .base import BasePlugin

logger = logging.getLogger(__name__)

class PluginManager:
    def __init__(self, plugin_dirs: List[str], enabled_plugins: str = None):
        self.plugin_dirs = plugin_dirs
        self.enabled_plugins = enabled_plugins.split(',') if enabled_plugins else None
        self.plugins: Dict[str, BasePlugin] = {}
        self.metadata: Dict[str, Dict[str, Any]] = {}

    def load_plugins(self):
        """
        Scans all provided plugin directories and loads valid plugins.
        """
        # Ensure the server directory is in sys.path so plugins can import 'api'
        server_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        if server_dir not in sys.path:
            sys.path.insert(0, server_dir)

        for plugins_dir in self.plugin_dirs:
            if not os.path.exists(plugins_dir):
                logger.debug(f"Plugins directory {plugins_dir} does not exist, skipping.")
                continue

            logger.info(f"Scanning plugins in: {plugins_dir}")
            for folder_name in os.listdir(plugins_dir):
                if self.enabled_plugins and folder_name not in self.enabled_plugins:
                    continue
                    
                folder_path = os.path.join(plugins_dir, folder_name)
                
                if not os.path.isdir(folder_path) or folder_name.startswith('__'):
                    continue
                    
                plugin_file = os.path.join(folder_path, "plugin.py")
                manifest_file = os.path.join(folder_path, "manifest.json")
                
                if os.path.exists(plugin_file) and os.path.exists(manifest_file):
                    try:
                        # Load manifest
                        with open(manifest_file, 'r') as f:
                            manifest = json.load(f)
                        
                        # Load plugin module
                        spec = importlib.util.spec_from_file_location(f"plugin_{folder_name}", plugin_file)
                        module = importlib.util.module_from_spec(spec)
                        if spec and spec.loader:
                            spec.loader.exec_module(module)
                        
                        # Instantiate plugin class
                        plugin_class = None
                        for attr_name in dir(module):
                            attr = getattr(module, attr_name)
                            if (isinstance(attr, type) and 
                                issubclass(attr, BasePlugin) and 
                                attr is not BasePlugin):
                                plugin_class = attr
                                break
                        
                        if plugin_class:
                            self.plugins[folder_name] = plugin_class()
                            self.metadata[folder_name] = manifest
                            logger.info(f"Loaded plugin: {manifest.get('name', folder_name)} from {plugins_dir}")
                        else:
                            logger.error(f"No BasePlugin subclass found in {plugin_file}")
                            
                    except Exception as e:
                        logger.error(f"Failed to load plugin {folder_name} from {plugins_dir}: {str(e)}")

    def before_prompt(self, prompt: str) -> str:
        for plugin in self.plugins.values():
            try:
                prompt = plugin.before_prompt(prompt)
            except Exception as e:
                logger.error(f"Error in before_prompt hook for a plugin: {str(e)}")
        return prompt

    def after_response(self, response: str) -> str:
        for plugin in self.plugins.values():
            try:
                response = plugin.after_response(response)
            except Exception as e:
                logger.error(f"Error in after_response hook for a plugin: {str(e)}")
        return response

    def on_session_start(self):
        for plugin in self.plugins.values():
            try:
                plugin.on_session_start()
            except Exception as e:
                logger.error(f"Error in on_session_start hook for a plugin: {str(e)}")

    def on_session_end(self):
        for plugin in self.plugins.values():
            try:
                plugin.on_session_end()
            except Exception as e:
                logger.error(f"Error in on_session_end hook for a plugin: {str(e)}")

# Global instance of PluginManager
plugin_manager = None

def init_plugin_manager(plugin_dirs: List[str], enabled_plugins: str = None):
    global plugin_manager
    plugin_manager = PluginManager(plugin_dirs, enabled_plugins)
    plugin_manager.load_plugins()
    return plugin_manager
