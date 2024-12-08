import { v4 as uuidv4 } from 'uuid';

class ApiController {

    static games : IGame[] = [];

   static async getApiData( req : any, res : any ) {

        res.status(200).json({ 
            success : true,
            message : "Api v1"
        })
    }

    static async mockUser( req : any, res : any ) {

        const user : IUser = {
            name : "John Doe",
            age : 30
        }

        res.status(200).json({ 
            success : true,
            data: user
        })
    }

    static async start( req : any, res : any ) {



        try {

            const  dim = req.query.dim ? req.query.dim : 3;

            const id : string = uuidv4();

            const numbers : number[] = [];

            for (let i = 0; i < dim; i++) {
                numbers.push(Math.floor(Math.random() * 6) + 1);
            }

    
            const game : IGame = {
                id,
                numbers,
                rolls : [],
                winner : false
               
            }

            ApiController.games.push(game);

            console.log('new game added, games count :', ApiController.games.length);
    
            res.status(200).json({ 
                success : true,
                data: game
            })
        } catch (error) {
            if (error instanceof Error) {
            res.status(500).json({
                success : false,
                message : error.message
            })
        }else{
            res.status(500).json({
                success : false,
                message : "Internal Server Error"
            })
        }   
        }
  



    }

    static async roll( req: any , res: any) {
        try {

            const id = req.query.id;

            if (!id) {
                throw new Error("Id is required");
            }

            const game = ApiController.games.find( game => game.id === id);

            if (!game) {
                throw new Error("Game not found");
            }


            if (game.winner) {
                res.status(200).json({ 
                    success : true,
                    message : "You have already won the game",
                    game
                })
                return;
            }
            // create a random number between 1 and 6
            const number = Math.floor(Math.random() * 6) + 1;

            
            // add the number to the rolls array
            game.rolls.push(number);

            // check if the rolls length is 2 and is same as game.numbers

            if (game.rolls.length === game.numbers.length) {
                const isSame = game.rolls.every((roll, index) => roll === game.numbers[index]);

                if (isSame) {
                    game.winner = true;
                }else{
                    game.winner = false;
                    game.rolls = [];
                }
            }




    

            res.status(200).json({ 
                success : true,
                data: number,
                game
            })
            
        } catch (error) {
            
            if (error instanceof Error) {
                res.status(500).json({
                    success : false,
                    message : error.message
                })
            }else{
                res.status(500).json({
                    success : false,
                    message : "Internal Server Error"
                })
            }
        }
    }
    
}

export default ApiController;