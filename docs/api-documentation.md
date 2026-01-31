# PrivGPT-Studio API Documentation

This document provides comprehensive documentation for the PrivGPT-Studio backend API endpoints.

## Base URL
The API is served from the root of the Flask application. All endpoints are prefixed with the appropriate blueprint routes.

## Authentication
Most endpoints require JWT authentication. Include the token in the `Authorization` header as `Bearer <token>`.

## Endpoints

### Root Endpoint

#### GET /
- **Description**: Welcome message for the backend.
- **Response**: Plain text welcome message.

### Authentication Endpoints

#### POST /api/register
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "username": "optional_username",
    "gender": "optional_gender",
    "dob": "optional_date_of_birth",
    "phone": "optional_phone"
  }
  ```
- **Response**: Success message or error.
- **Status Codes**: 201 (Created), 400 (Bad Request), 409 (Conflict)

#### POST /api/login
- **Description**: Authenticate user and return JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "message": "Login successful"
  }
  ```
- **Status Codes**: 200 (OK), 400 (Bad Request), 401 (Unauthorized)

#### GET /api/profile
- **Description**: Get authenticated user's profile.
- **Headers**: Authorization: Bearer <token>
- **Response**: User profile data.
- **Status Codes**: 200 (OK), 401 (Unauthorized), 404 (Not Found)

#### PUT /api/profile
- **Description**: Update authenticated user's profile.
- **Headers**: Authorization: Bearer <token>
- **Request Body**:
  ```json
  {
    "username": "new_username",
    "gender": "new_gender",
    "dob": "new_dob",
    "phone": "new_phone"
  }
  ```
- **Response**: Success message.
- **Status Codes**: 200 (OK), 400 (Bad Request), 401 (Unauthorized)

### Chat Endpoints

#### POST /chat
- **Description**: Send a chat message and receive a response.
- **Form Data**:
  - message: User's message
  - model_type: "local" or "cloud"
  - model_name: Model identifier
  - session_id: Session ID (optional, defaults to "1")
  - session_name: Session name (optional)
  - temperature: Float (0.7 default)
  - top_p: Float (0.9 default)
  - top_k: Int (40 default)
  - max_tokens: Int (2048 default)
  - frequency_penalty: Float (0 default)
  - presence_penalty: Float (0 default)
  - stop_sequence: String (optional)
  - seed: Int (optional)
  - system_prompt: String (optional)
  - mention_session_ids[]: Array of session IDs (optional)
  - uploaded_file: File (optional, PDF/image)
- **Response**:
  ```json
  {
    "response": "Bot response",
    "session_id": "session_id",
    "timestamp": "ISO_timestamp",
    "latency": 123,
    "fallback_used": false,
    "model_name": "model_name",
    "model_type": "model_type"
  }
  ```
- **Status Codes**: 200 (OK), 403 (Forbidden - limit reached), 400 (Bad Request), 500 (Internal Server Error)

#### POST /chat/stream
- **Description**: Send a chat message and receive a streaming response.
- **Form Data**: Same as /chat endpoint.
- **Response**: Server-sent events stream.
- **Status Codes**: 200 (OK), 403 (Forbidden - limit reached), 400 (Bad Request), 500 (Internal Server Error)

#### POST /chat/history
- **Description**: Retrieve chat history for specified sessions.
- **Request Body** (for guests):
  ```json
  {
    "session_ids": ["session_id1", "session_id2"]
  }
  ```
- **Response**: Array of session objects with messages.
- **Status Codes**: 200 (OK), 400 (Bad Request)

#### GET /chat/<session_id>
- **Description**: Get all messages for a specific session.
- **Response**:
  ```json
  {
    "session_id": "session_id",
    "messages": [...],
    "limit_reached": false
  }
  ```
- **Status Codes**: 200 (OK), 404 (Not Found), 400 (Bad Request)

#### POST /chat/rename
- **Description**: Rename a chat session.
- **Request Body**:
  ```json
  {
    "session_id": "session_id",
    "new_name": "New Session Name"
  }
  ```
- **Response**: Success message.
- **Status Codes**: 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

#### POST /clear
- **Description**: Clear all messages from a session.
- **Request Body**:
  ```json
  {
    "session_id": "session_id"
  }
  ```
- **Response**:
  ```json
  {
    "status": "cleared",
    "session_id": "session_id"
  }
  ```
- **Status Codes**: 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

#### DELETE /chat/delete/<session_id>
- **Description**: Delete an entire chat session.
- **Response**: Success message.
- **Status Codes**: 200 (OK), 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error)

### Model Endpoints

#### GET /models
- **Description**: Get available local and cloud models.
- **Response**:
  ```json
  {
    "local_models": ["model1", "model2"],
    "cloud_models": ["gemini"]
  }
  ```
- **Status Codes**: 200 (OK)

#### POST /model_info
- **Description**: Get detailed information about a specific model.
- **Request Body**:
  ```json
  {
    "model_name": "model_name",
    "model_type": "local" or "cloud"
  }
  ```
- **Response**: Model details object.
- **Status Codes**: 200 (OK), 400 (Bad Request), 500 (Internal Server Error)

#### POST /select_model
- **Description**: Select the current model (legacy endpoint).
- **Request Body**:
  ```json
  {
    "model": "model_name"
  }
  ```
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```
- **Status Codes**: 200 (OK)

### Review Endpoints

#### GET /api/reviews
- **Description**: Get all user reviews.
- **Response**: Array of review objects.
- **Status Codes**: 200 (OK), 500 (Internal Server Error)

#### POST /api/reviews
- **Description**: Submit a new review.
- **Headers**: Authorization: Bearer <token>
- **Request Body**:
  ```json
  {
    "rating": 5,
    "comment": "Great service!"
  }
  ```
- **Response**: Success message.
- **Status Codes**: 201 (Created), 400 (Bad Request), 401 (Unauthorized), 409 (Conflict)

### Database Endpoint

#### GET /mongo-test
- **Description**: Test MongoDB connection.
- **Response**: Connection status message.
- **Status Codes**: 200 (OK), 500 (Internal Server Error)

### Contact Endpoint

#### POST /api/contact
- **Description**: Submit a contact form.
- **Request Body**: Contact form data.
- **Response**: Success message.
- **Status Codes**: 200 (OK), 400 (Bad Request)

#### OPTIONS /api/contact
- **Description**: Handle CORS preflight requests.
- **Response**: CORS headers.
- **Status Codes**: 200 (OK)

## Error Handling
All endpoints return appropriate HTTP status codes and JSON error messages when applicable.

## Rate Limiting
Chat endpoints have message limits per session (configurable, default 10 messages).

## File Uploads
The /chat and /chat/stream endpoints support file uploads (PDFs and images) for enhanced context.
