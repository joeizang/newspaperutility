
import { app } from './src/index';
import  * as typeorm from 'typeorm';
import {PriceCode } from './src/entity/priceCode';
import { Request, Response } from 'express';

typeorm.createConnection().then(async conn => {
    
    let port = process.env.PORT || 5660;

    const repo = typeorm.getManager().getRepository(PriceCode);

    /**
     * fetch and return all price codes as json object in array
     * @param req express Request Object
     * @param res express Response Object
     */
    const getPriceCodes = async (req: Request, res: Response) => {
        try {
            const priceCodes = await repo.find();
            return res.json(priceCodes).sendStatus(200);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    /**
     * fetch and return price codes and a count of how many price codes there are.
     * @param req express Request Object
     * @param res express Response Object
     */
    const getSomePriceCodes = async (req: Request, res: Response) => {
        
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
    const getOnePriceCode = async (req: Request, res: Response) => {

        try {
            if(req.params.priceCodeId === undefined || req.params.priceCodeId === 0 || req.params.priceCodeId === ""){
                return res.sendStatus(404);
            }
            const priceCode = await repo.findOne(req.params.priceCodeId);
            return res.json(priceCode).sendStatus(500);
        } catch (error) {
            return res.json(error).sendStatus(500);    
        }
        
    }

    /**
     * 
     * @param req express Request Object
     * @param res express Response Object
     */
    const createPriceCode = async (req: Request, res: Response) => {
        try {
            if(req.params.priceCode !== undefined || req.params.priceCode !== null){
                const model = await repo.create(req.params.priceCode);
                return res.json(model).sendStatus(200);
            }
        } catch (error) {
            return res.sendStatus(404);    
        }
        
    }

    app.get('/priceCodes', getPriceCodes);
    app.post('/priceCodes', async (request: Request, response: Response) => {
        try {
            if(request.params.priceCode !== undefined || request.params.priceCode !== null){
                const model = await repo.create(request.params.priceCode);
                return response.json(model).sendStatus(200);
            }
        } catch (error) {
            return response.json(error).sendStatus(404);    
        }
    });

    app.listen(port,() => {
        console.log(`Server is up on port ${ port } and persistence connection status is: ${ conn.isConnected }`);
    });

}).catch(error => console.log(error));
