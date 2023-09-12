from fastapi import FastAPI, HTTPException, File
from fastapi.responses import FileResponse
from io import BytesIO
from gtts import gTTS
from pydantic import BaseModel

app = FastAPI()
class Data(BaseModel):
    text: str
@app.post("/text-to-speech")
async def text_to_speech(data: Data):
    # Create a gTTS object and save the audio to a temporary file
    tts = gTTS(data.text)
    audio_path = "/tmp/audio.mp3"  # Adjust the path as needed
    tts.save(audio_path)

    # Return the saved audio file as a response
    return FileResponse(audio_path, media_type="audio/mpeg")
