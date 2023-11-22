const fs = require("fs")
const filePath = "./redis.agency.html"
const outputFilePath = "./chunks.txt"
const chunkSize = 30000
const whitespace =
  "\n\n\n\n\n--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\n\n\n\n" // Ten new lines as large whitespace

function appendToFile(data, outputPath) {
  return new Promise((resolve, reject) => {
    // Append whitespace before each chunk
    const dataWithWhitespace = data + whitespace

    fs.appendFile(outputPath, dataWithWhitespace, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function readChunks(filePath, chunkSize, outputPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, {
      encoding: "utf8",
      highWaterMark: chunkSize,
    })

    readStream.on("data", (chunk) => {
      appendToFile(chunk, outputPath).catch((err) => {
        reject(err)
      })
    })

    readStream.on("error", (err) => {
      reject(err)
    })

    readStream.on("end", () => {
      resolve()
    })
  })
}

readChunks(filePath, chunkSize, outputFilePath)
  .then(() => {
    console.log(
      "File processed and chunks appended to output file with whitespace between each."
    )
  })
  .catch((err) => {
    console.error("Error:", err)
  })
