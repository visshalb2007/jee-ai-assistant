from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json["message"]

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": user_message,
            "stream": False
        }
    )

    bot_reply = response.json()["response"]

    return jsonify({
        "reply": bot_reply
    })

if __name__ == "__main__":
    app.run(debug=True)