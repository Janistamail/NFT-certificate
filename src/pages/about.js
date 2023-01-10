import { ThirdwebStorage } from "@thirdweb-dev/storage";
import fs from 'fs';
import Successful from './component/Successful';
const storage = new ThirdwebStorage();

export default function about({ data }) {

    return (
        <Successful data={data} />
    );
}

function createMetadata(name, imgUrl) {
    return {
        "name": name,
        "description": name,
        "image": imgUrl
    }
}

export async function getServerSideProps() {
    const imagesDir = './certificate/images';
    const files = fs.readdirSync(`${imagesDir}`);
    const data = [];

    for (let file of files) {
        // (1) upload image to IPFS
        const uploadImg = await storage.upload(fs.readFileSync(`${imagesDir}/${file}`));
        const imgUrl = storage.resolveScheme(uploadImg)

        // (2) create metadata and save as JSON file
        const jsonDir = './certificate/json';
        const fileName = file.split('.')[0]
        const metadata = createMetadata(fileName, imgUrl)
        fs.writeFileSync(`${jsonDir}/${fileName}.json`, JSON.stringify(metadata, null, 2));

        // (3) Upload metadata to IPFS
        const uploadMetadata = await storage.upload(fs.readFileSync(`${jsonDir}/${fileName}.json`));
        const metadataUrl = storage.resolveScheme(uploadMetadata)
        console.log(metadataUrl)

        data.push({ id: fileName, url: metadataUrl })
    }

    return {
        props: { data },
    };
} 