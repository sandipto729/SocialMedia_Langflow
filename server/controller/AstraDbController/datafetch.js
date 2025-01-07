const connectAstraDB = require("./../../config/astraDb")

const getData = async (req, res) => {
    
	try {
		const db = await connectAstraDB()
		const collection = "socialmedia2"

		// Use the collection() method to access the collection
		const cursor = await db.collection(collection).find()

		// Fetch all data from the cursor and store it in an array
		const data = []
		for await (const doc of cursor) {
			data.push(doc)
		}

		console.log("Data fetched:", data)
		res.status(200).json(data)
	} catch (err) {
		console.error("Error fetching data:", err)
		res.status(500).json({ error: "Failed to fetch data" })
	}
}


module.exports = getData
