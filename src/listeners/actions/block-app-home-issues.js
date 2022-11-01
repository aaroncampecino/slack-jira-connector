import {reloadAppHome} from "../../utility"
import { logger } from "../../logger"

const appHomeIssuesCallback = async({body, ack, client}) =>{
    try{
        await ack();
        await reloadAppHome(client, body.user.id);
    }catch(error){
        logger.error(error);
    }
}

module.exports = {appHomeIssuesCallback}