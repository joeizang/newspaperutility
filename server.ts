
import { app } from './src/index';
import  * as typeorm from 'typeorm';


typeorm.createConnection().then(async conn => {
    
    let port = process.env.PORT || 5660;

    app.listen(port,() => {
        console.log(`Server is up on port ${ port } and persistence connection status is: ${ conn.isConnected }`);
    });
}).catch(error => console.log(error));
