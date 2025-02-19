const fs = require('fs')
const path = require('path')

const htmlFilePath = path.resolve(__dirname, 'dist', 'index.html')

fs.readFile(htmlFilePath, 'utf8', (err, data) => {
	if (err) {
		return console.log(err)
	}

	const result = data.replace(/<title>.*?<\/title>/, '<title>TClick</title>')

	fs.writeFile(htmlFilePath, result, 'utf8', (err) => {
		if (err) return console.log(err)
	})
})
