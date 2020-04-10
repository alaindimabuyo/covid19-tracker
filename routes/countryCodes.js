const express = require("express")
const router = express.Router()
const fetch = require("node-fetch")

router.get('/api/country/codes', async (req, res) => {
    try {
        const response = await fetch(`${process.env.NCOV_TRACKER_API}/api/countries`)
        const data = await response.json();
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error Please refresh the page for now" });
    }
})



module.exports = router