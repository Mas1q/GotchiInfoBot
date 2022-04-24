import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const getPolygonBalance = async address => {
    try {
        const data = {
            'jsonrpc': '2.0',
            'id': 0,
            'method': 'eth_getBalance',
            'params': [address, 'latest']
        };

        const result = await axios.post('https://polygon-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMY_TOKEN, data);
        return parseInt(result.data.result, 16) / 1000000000000000000;
    } catch (e) {
        console.log(e);
        return 0;
    }
}

export default {
    getPolygonBalance,
}
