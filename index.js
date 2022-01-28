const http = require("http");
const fs = require("fs");
const path = require("path");

const Server = http.createServer((req, res) => {
	// if (req.url === "/") {
	// 	fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
	// 		res.writeHead(200, { "content-type": "text/html" });
	// 		res.end(data);
	// 	});
	// } else if (req.url == "/about") {
	// 	fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
	// 		res.writeHead(200, { "content-type": "text/html" });
	// 		res.end(data);
	// 	});
	// } else if (req.url == "/contact") {
	// 	fs.readFile(path.join(__dirname, "public", "contact.html"), (err, data) => {
	// 		res.writeHead(200, { "containt-type": "text/html" });
	// 		res.end(data);
	// 	});
	// } else if (req.url == "/api/user") {
	// 	const user = [
	// 		{
	// 			name: "Ayush",
	// 			age: 23,
	// 		},
	// 		{
	// 			name: "Vishwash",
	// 			age: 24,
	// 		},
	// 	];
	// 	res.writeHead(200, { "content-type": "applicable/json" });
	// 	res.end(JSON.stringify(user));
	// }

	let filePath = path.join(
		__dirname,
		"public",
		req.url === "/" ? "index.html" : req.url
	);
	let extname = path.extname(filePath);
	let contentType = "text/html";

	switch (extname) {
		case ".js":
			contentType = "text/javascript";
			break;
		case ".css":
			contentType = "text/CSS";
			break;
		case ".json":
			contentType = "text/json";
			break;
		case ".jpg":
			contentType = "text/jpeg";
			break;
	}
	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == "ENOENT") {
				fs.readFile(
					path.join(__dirname, "public", "404.html"),
					(err, content) => {
						res.writeHead(200, { "content-type": "text/html" });
						res.end(content);
					}
				);
			} else {
				res.writeHead(500);
				res.end("server Error");
			}
		} else {
			res.writeHead(200, { "Content-type": contentType });
			res.end(content);
		}
	});
});
const PORT = process.env.PORT || 3000;
Server.listen(PORT, () => console.log(`server is running at ${PORT}`));
