import fs from "fs";
import https from "https";
import path from "path";

async function generateAudio() {
  const text = encodeURIComponent(
    "Hi, I'm Dev. For me, life is about thoughtful architecture, slow Sunday coffees, and building a genuine partnership together. Looking forward to knowing your story."
  );

  // High quality Google TTS endpoint with Indian English accent
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=en-IN&client=tw-ob`;

  const destPath = path.resolve("./public/assets/dev-voice.mp3");
  const file = fs.createWriteStream(destPath);

  https.get(
    url,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    },
    (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          console.log("Audio downloaded to:", destPath);
          fs.copyFileSync(destPath, path.resolve("./public/assets/dev-voice.wav"));
          console.log("Copied to dev-voice.wav");
        });
      });
    }
  ).on("error", (err) => {
    console.error("Error downloading TTS:", err);
  });
}

generateAudio();
