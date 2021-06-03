const dbConnection = require('../config')

class User {
    
    async getAllPlayers(){
        try{
            const user = await dbConnection.any("SELECT FROM users");
            return user;
        } 
        catch(error){}
    }

    async filterAll(name, gender, sport){
        try{
            const user = await dbConnection.any(
                `SELECT * FROM users 
                WHERE (name LIKE '%'||$1||'%') 
                AND (gender = $2 OR gender = $3)
                AND (sport_id = $4 OR sport_id = $5 OR sport_id = $6)
                OR sport_id = $7 OR sport_id = $8 OR sport_id = $9)`,
                [name, gender[0], gender[1], sport[0], sport[1], sport[2], sport[3], sport[4], sport[5]]
            );
            return user;
        }
        catch(error){}
    }
}

module.exports = new User();