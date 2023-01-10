const puppeteer = require("puppeteer");
const { STUDENT } = require("../constants/students");


async function generateImage() {
    STUDENT.forEach(async student => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.astgoto(`http://localhost:3000/student/${student.id}`, {
            waitUntil: "networkidle0"
        });
        await page.setViewport({ width: 1020, height: 715 });
        await page.screenshot({ path: `./certificate/images/${student.id}.png` });
        await browser.close();
    })
}

generateImage();