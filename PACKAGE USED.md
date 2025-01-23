# Used Packages
## 1. Morgan
**Purpose:** HTTP request logging middleware.

##### Why Use It:
- Logs incoming HTTP requests in a structured format.
- Useful for debugging and monitoring API activity.
- Supports customizable logging formats like dev, combined, common, etc.

## 2. Helmet
**Purpose:** Secures Express apps by setting various HTTP headers.
##### Why Use It:
- Helps protect against common web vulnerabilities like XSS, clickjacking, and MIME sniffing.
- Easy to configure and improves overall security

## 3. Express-Validator
**Purpose:** Middleware for validating and sanitizing user inputs.
##### Why Use It:
- Helps ensure data integrity by validating API request payloads.
- Prevents common issues like SQL injection or malicious inputs.

## 4. CORS
**Purpose:** Enable Cross-Origin Resource Sharing.
##### Why Use It:
- Necessary for APIs accessed from different origins (e.g., a frontend hosted on a different domain).
- Configurable to allow specific origins, methods, and headers.

## 5. Dotenv
**Purpose:* Loads environment variables from a .env file.
##### Why Use It:
- Centralizes environment-specific configurations like API keys, database credentials, etc.
- Prevents sensitive information from being hardcoded.

## 6. Jsonwebtoken (JWT)
**Purpose:* Authentication and authorization using JSON Web Tokens.
###### Why Use It:
- Stateless authentication, ideal for modern APIs.
- Secure way to pass user authentication data between client and server.