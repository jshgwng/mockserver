const mockServerClient = require("mockserver-client").mockServerClient;

// 1. Successful Login
mockServerClient("localhost", 1080)
  .mockAnyResponse({
    httpRequest: {
      method: "POST",
      path: "/api/login",
      headers: {
        "Content-Type": ["application/json"]
      },
      body: {
        type: "JSON",
        json: JSON.stringify({
          email: "foobar@example.com",
          password: "foobar09j)A98"
        })
      }
    },
    httpResponse: {
      statusCode: 200, // Success response
      body: JSON.stringify({
        message: "Login successful",
        token: "fake-jwt-token"
      }),
      headers: {
        "Content-Type": ["application/json"],
        "Access-Control-Allow-Origin": ["http://localhost:5173"],
        "Access-Control-Allow-Methods": ["POST"],
        "Access-Control-Allow-Headers": ["Content-Type"]
      }
    }
  })
  .then(
    () => console.log("Login success expectation created successfully"),
    (error) => console.error("Failed to create success expectation:", error)
  );

// 2. Invalid Credentials
mockServerClient("localhost", 1080)
  .mockAnyResponse({
    httpRequest: {
      method: "POST",
      path: "/api/login",
      headers: {
        "Content-Type": ["application/json"]
      },
      body: {
        type: "JSON",
        json: JSON.stringify({
          email: "foobar@example.com",
          password: "Wrong$password123"
        })
      }
    },
    httpResponse: {
      statusCode: 401, // Unauthorized for invalid credentials
      body: JSON.stringify({
        error: "Invalid credentials"
      }),
      headers: {
        "Content-Type": ["application/json"],
        "Access-Control-Allow-Origin": ["http://localhost:5173"],
        "Access-Control-Allow-Methods": ["POST"],
        "Access-Control-Allow-Headers": ["Content-Type"]
      }
    }
  })
  .then(
    () => console.log("Invalid credentials expectation created successfully"),
    (error) => console.error("Failed to create invalid credentials expectation:", error)
  );

// 3. User Not Found
mockServerClient("localhost", 1080)
  .mockAnyResponse({
    httpRequest: {
      method: "POST",
      path: "/api/login",
      headers: {
        "Content-Type": ["application/json"]
      },
      body: {
        type: "JSON",
        json: JSON.stringify({
          email: "nonexistent@example.com",
          password: "somepassword"
        })
      }
    },
    httpResponse: {
      statusCode: 404, // Not Found for user not found
      body: JSON.stringify({
        error: "User not found"
      }),
      headers: {
        "Content-Type": ["application/json"],
        "Access-Control-Allow-Origin": ["http://localhost:5173"],
        "Access-Control-Allow-Methods": ["POST"],
        "Access-Control-Allow-Headers": ["Content-Type"]
      }
    }
  })
  .then(
    () => console.log("User not found expectation created successfully"),
    (error) => console.error("Failed to create user not found expectation:", error)
  );
