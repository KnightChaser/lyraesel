# lyraesel

### HTTP smuggling demonstration (sending executable files with Base64-based text string, not executable itself to evade general security system)

HTTP smuggling is a technique used to send executable files using only JavaScript and the `application/octet-stream` content type. This technique can be used to bypass general security systems that may block or inspect certain file types.

To perform HTTP smuggling, the following steps can be followed:

1. Encode the executable file into a JavaScript-friendly format, such as Base64.
2. Apply cyclic XOR encryption to the encoded file to randomize network traffic.
3. Embed the encrypted file within a JavaScript code snippet.
4. Set the `Content-Type` header of the HTTP request to `application/octet-stream`.
5. Send the HTTP request containing the JavaScript code snippet to the target server.

It's important to note that HTTP smuggling can be considered a security vulnerability and is often used for malicious purposes. It's crucial to understand the risks associated with this technique and use it responsibly, only in controlled environments for legitimate purposes.

### Execution
- Run `webserver.py` built on FastAPI via command `uvicorn webserver:app --reload` command.
- Access to the local web page(`127.0.0.1:8000` probably. The console will show which URL you should go to check this project), then `kaldrexx.exe` will be downloaded. For more information about `kaldrexx.exe`, go to **[https://github.com/KnightChaser/kaldrexx](https://github.com/KnightChaser/kaldrexx)**(msfconsole's meterpreter reverse HTTP shell.).