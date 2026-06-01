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



    /*
 * File Description:
 * -----------------
 * This file defines the Blacklisted Token model used for JWT token
 * invalidation during logout.
 *
 * Its responsibilities are:
 * 1. Store JWT tokens that should no longer be accepted.
 * 2. Prevent logged-out users from accessing protected routes
 *    using previously issued tokens.
 * 3. Support token revocation without waiting for token expiration.
 * 4. Maintain creation and update timestamps for blacklist records.
 *
 * Collection Structure:
 * - token      : JWT token that has been invalidated.
 * - createdAt  : Time when the token was blacklisted.
 * - updatedAt  : Last update time of the blacklist record.
 *
 * Authentication Flow:
 *
 * Login
 *   │
 *   ▼
 * JWT Generated
 *   │
 *   ▼
 * User Accesses Protected Routes
 *
 * Logout
 *   │
 *   ▼
 * Token Added To Blacklist Collection
 *   │
 *   ▼
 * Cookie Cleared
 *   │
 *   ▼
 * Future Requests With Same Token Rejected
 *
 * Why Blacklisting is Needed:
 * ---------------------------
 * JWT tokens are stateless. Once issued, they remain valid until
 * their expiration time is reached.
 *
 * Example:
 * Token expires in 1 day.
 *
 * If a user logs out after 5 minutes, the token would still be valid
 * for the remaining time unless it is blacklisted.
 *
 * The blacklist collection allows the server to identify and reject
 * tokens that have been explicitly invalidated before expiration.
 */