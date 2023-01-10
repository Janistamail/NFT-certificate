const puppeteer = require("puppeteer");

const STUDENT = [
    {
        tokenId: '1',
        id: '645162010001',
        name: 'Albert',
        lastname: 'Lee',
        account: '0xAA075Cf5352aB0E895250Ef8eCc68633f94a3Ab6'

    },
    {
        tokenId: '2',
        id: '645162010002',
        name: 'Kelvin',
        lastname: 'Island',
        account: '0xa1e0a7cBC3099BaA7c151c78bDBA6AC151D94A82'

    },
    {
        tokenId: '3',
        id: '645162010003',
        name: 'Michael',
        lastname: 'Jackson',
        account: '0xB3059254ecc90949B4185976A7ceA7b5077BbafD'

    },
    {
        tokenId: '4',
        id: '645162010004',
        name: 'Jack',
        lastname: 'Sparow',
        account: '0x8DD7406965E49cf693e18e403a2c5264B8e76FE8'

    }
]



async function generateImage() {
    STUDENT.forEach(async student => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://localhost:3000/student/${student.id}`, {
            waitUntil: "networkidle0"
        });
        await page.setViewport({ width: 700, height: 500 });
        await page.screenshot({ path: `./certificate/images/${student.id}.png` });
        await browser.close();
    })
}

generateImage();  