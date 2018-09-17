
import { PriceCode } from '../entity/priceCode';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';


const repo = getManager().getRepository(PriceCode);

/**
 * fetch and return all price codes as json object in array
 * @param req express Request Object
 * @param res express Response Object
 */
const getPriceCodes = async (req: Request, res: Response): Promise<Array<PriceCode>> => {

    const priceCodes = await repo.find();
    return priceCodes;
}

const getSomePriceCodes = async (req: Request, res: Response): Promise<Array<PriceCode>> => {
    
    //look at when you skip and take a few price codes and not everything.
    // const priceCodes = await repo.find
}
