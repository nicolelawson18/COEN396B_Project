import http.server
import socketserver
import os
import urllib.parse

PORT = 8080
DEFAULT_FILE = "index.html"

class MyRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse the requested file path
            path = urllib.parse.unquote(self.path)

            # If no file is specified, use the default file
            if path == "/":
                path = "/" + DEFAULT_FILE

            # Check if the file extension is allowed
            if path.endswith((".html", ".js")):
                # Get the current working directory
                base_path = os.getcwd()

                # Construct the absolute file path
                file_path = os.path.abspath(os.path.join(base_path, path[1:]))

                # Check if the file exists
                if os.path.exists(file_path) and os.path.isfile(file_path):
                    # Set the proper Content-Type header
                    if path.endswith(".html"):
                        self.send_response(200)
                        self.send_header("Content-type", "text/html")
                    elif path.endswith(".js"):
                        self.send_response(200)
                        self.send_header("Content-type", "application/javascript")

                    # Send the file content
                    with open(file_path, "rb") as file:
                        self.end_headers()
                        self.wfile.write(file.read())
                else:
                    # File not found
                    self.send_error(404, "File not found")
            else:
                # Invalid file extension
                self.send_error(403, "Invalid file extension")

        except Exception as e:
            # Handle any other errors
            self.send_error(500, "Internal server error")

# Create the server and specify the request handler
with socketserver.TCPServer(("", PORT), MyRequestHandler) as server:
    print(f"Server started on port {PORT}")
    server.serve_forever()
