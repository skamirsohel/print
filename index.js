import express from "express";
import ptp from "pdf-to-printer";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;
app.post('/print', express.text({ type: 'application/pdf' }), async(req, res) => {

   
    const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

    fs.writeFileSync(tmpFilePath, req.body, 'binary');
    await ptp.print(tmpFilePath);
    fs.unlinkSync(tmpFilePath);

    res.json({success:true})
});

 

app.listen(port, () => {
    console.log(`PDF Printing Service listening on port ${port}`)
});