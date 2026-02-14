# Implementation Plan - Plugin Architecture for Extensible Integrations

This plan outlines the implementation of a plugin architecture for PrivGPT-Studio, enabling modular extensions without modifying the core codebase.

## 1. Directory Structure
- Created a `plugins/` directory at the project root for external plugins.
- Created `server/api/plugins/` for the plugin system core logic.
  - `base.py`: Defines the `BasePlugin` interface.
  - `manager.py`: Handles dynamic loading and execution of plugins.
  - `__init__.py`: Package exports.

## 2. Plugin Interface (`BasePlugin`)
Defined the following lifecycle hooks:
- `before_prompt(prompt: str) -> str`: Allows modifying the user's prompt before it reaches the model.
- `after_response(response: str) -> str`: Allows modifying the bot's response before it is returned to the user or saved.
- `on_session_start()`: Triggered when a new chat session is created.
- `on_session_end()`: Triggered when a chat session is deleted.

## 3. Dynamic Plugin Loader (`PluginManager`)
- Scans the `plugins/` directory for subfolders containing `plugin.py` and `manifest.json`.
- Automatically registers valid plugins at application startup.
- Supports enabling/disabling plugins via the `ENABLED_PLUGINS` environment variable (comma-separated list of folder names).
- Implements safe execution with error isolation; an error in one plugin will not crash the application or affect other plugins.
- Adds the `server` directory to `sys.path` to allow plugins to import from the `api` package.
- **Deployment Safety**: Updated `api/config.py` to support multiple plugin directories. It now scans both `server/plugins/` (for bundled plugins) and the project root `/plugins/` (for local development).
- **Env Var pluarality**: Changed `PLUGINS_DIR` to `PLUGINS_DIRS` (comma-separated list) to allow for multiple search paths.

## 4. Integration Points
Modified `server/api/routes/chat_routes.py` to call plugin hooks at the appropriate lifecycle stages:
- **Prompt Interception**: Added `plugin_manager.before_prompt()` in both `/chat` and `/chat/stream` routes.
- **Response Post-processing**: Added `plugin_manager.after_response()` after model inference. For streaming, this is applied to the final collected response before saving to history.
- **Session Lifecycle**: Added `plugin_manager.on_session_start()` when a new session document is created and `plugin_manager.on_session_end()` when a session is deleted.

## 5. Configuration
Updated `server/api/config.py` and `server/.env.example` to include:
- `PLUGINS_DIR`: Path to the plugins directory (with automated fallback).
- `ENABLED_PLUGINS`: Optional list of active plugins.

## 6. Sample Plugin
Created `plugins/example_plugin/` containing:
- `manifest.json`: Metadata (name, version, description).
- `plugin.py`: A demonstration implementation that tags prompts and responses.
