const mongoose = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
    
        token:{
            type:String,
            required:[true, "token is required to be added n blacklist"]
        }
        
},{
            timestamps:true
        }
    )

    const tokenBlacklistModel =mongoose.model("blacklistTokens",blacklistTokenSchema);

    module.exports = tokenBlacklistModel;