import * as http from 'http';

const port = 9000;

export const server: http.Server = http.createServer().listen(port, (error: Error) => {
    if(error){
        return console.log('An error occured', error);
    }
    console.log(`Server listening on port ${port}`);
});




