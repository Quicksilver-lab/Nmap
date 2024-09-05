const express = require("express");
const nmap = require("node-nmap");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Scan for open ports
app.post("/api/scan", (req, res) => {
  const { target } = req.body;

  if (!target) {
    return res.status(400).json({ error: "Target IP or domain is required" });
  }

  nmap.nmapLocation = "nmap"; // Ensure nmap is installed and available in your PATH
  const scan = new nmap.NmapScan(target, "-p-"); // Scan all ports

  scan.start((error, report) => {
    if (error) {
      console.error("Error during scan:", error);
      return res
        .status(500)
        .json({ error: "An error occurred during the scan." });
    }
    res.json({ report });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
