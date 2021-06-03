const dbCOnnection = require("../config");

class Sport{

    async getAllSports(){
        try{
            const user = await dbConnection.any("SELECT * FROM sports");
            return user;
        }
        catch(error){};
    }
}

module.exports = new Sport();