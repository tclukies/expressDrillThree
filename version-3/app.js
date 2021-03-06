const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;
const csvToJson = require("convert-csv-to-json");
const students = csvToJson.fieldDelimiter(",").getJsonFromCsv("./students.csv");

app.use(cors());

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].id.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

app.get("/", (req, res) => {
    res.json({ data: students });
});

app.get("/:id", (req, res) => {
    var record = findById(students, req.params.id);
    if (!record) {
        res.status(404).json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        res.json({ data: record });
    }
});

app.listen(port, () => {
    console.log("listening on port", port);
});
