import web3 from  './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x5DE1a4C40687DD8488c34fA8A6F536A30C77d9bd'
);

export default instance;