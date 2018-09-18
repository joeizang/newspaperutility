
import { PriceCode } from '../entity/priceCode';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';


const repo = getManager().getRepository(PriceCode);

/**
 * fetch and return all price codes as json object in array
 * @param req express Request Object
 * @param res express Response Object
 */
export const getPriceCodes = async (req: Request, res: Response): Promise<Response> => {

    const priceCodes = await repo.find();
    return res.json(priceCodes).sendStatus(200);
}

/**
 * fetch and return price codes and a count of how many price codes there are.
 * @param req express Request Object
 * @param res express Response Object
 */
export const getSomePriceCodes = async (req: Request, res: Response): Promise<Response> => {
    
    //look at when you skip and take a few price codes and not everything.
    const priceCodes = await repo.createQueryBuilder()
                                 .skip(req.query.skip)
                                 .take(req.query.take)
                                 .getManyAndCount();

    if(priceCodes.length < 1 || priceCodes === undefined){
        return res.sendStatus(404);
    }
    return res.json(priceCodes).sendStatus(200);
}


/**
 * get one particular price code based on filter.
 * @param req express Request Object
 * @param res express Response Object
 */
export const getOnePriceCode = async (req: Request, res: Response) => {

    if(req.params.priceCodeId === undefined || req.params.priceCodeId === 0 || req.params.priceCodeId === ""){
        return res.sendStatus(404);
    }
    const priceCode = await repo.findOne(req.params.priceCodeId);
    return res.json(priceCode).sendStatus(200);
}

/**
 * 
 * @param req express Request Object
 * @param res express Response Object
 */
export const createPriceCode = async (req: Request, res: Response) => {
    if(req.params.priceCode !== undefined || req.params.priceCode !== null){
        const model = await repo.create(req.params.priceCode);
        return res.json(model).sendStatus(200);
    }
    return res.sendStatus(404);
}
