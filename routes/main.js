const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")

router.get('/api', async (req, res) => {
    try {
        const response = await fetch(`${process.env.NCOV_TRACKER_API}/api`)
        const data = await response.json();
        res.json(data)
    } catch (err) {

        res.status(500).json({ message: "Server Error Please refresh the page for now" });
    }
})



module.exports = router