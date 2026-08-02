/**
 * Re-encrypts public/models/character.glb -> public/models/character.enc
 *
 * Run from the repo root:  node scripts/encrypt-model.cjs
 *
 * NOTE: MODEL_PASSWORD must stay in sync with the password passed to
 * decryptFile() in src/components/Character/utils/character.ts. This script
 * previously used "Character3D#@" while the app decrypts with "MyCharacter12",
 * so running it would have produced a character.enc the site could not open.
 *
 * This is obfuscation, not security — the key ships in the client bundle and
 * anyone can read it from devtools. It only deters casual asset scraping.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const MODEL_PASSWORD = "MyCharacter12";

const modelsDir = path.join(__dirname, "..", "public", "models");
const inputFile = path.join(modelsDir, "character.glb");
const outputFile = path.join(modelsDir, "character.enc");

const encryptFile = (input, output, password) => {
  if (!fs.existsSync(input)) {
    console.error(`Missing source model: ${input}`);
    process.exit(1);
  }

  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output);

  writeStream.write(iv);
  readStream
    .pipe(cipher)
    .pipe(writeStream)
    .on("finish", () => {
      const { size } = fs.statSync(output);
      console.log(`Wrote ${output} (${(size / 1024 / 1024).toFixed(2)} MB)`);
      console.log(
        "Remember to bump the ?v= cache-buster in character.ts and index.html."
      );
    });
};

encryptFile(inputFile, outputFile, MODEL_PASSWORD);
