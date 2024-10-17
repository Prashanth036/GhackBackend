const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const db =require("../models/index")

const { error } = require('console');

const generateAccessToken = (username, userId) => {
    return jwt.sign(
        {
            userId, username
        },
        process.env.JWTSECRET,
        {
            expiresIn: 600 * 600
        }
    )
}




const encryptedPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest('hex')
}

module.exports = {
    register: (req, res) => {
        const payload = req.body;

        let encrptedPassword = encryptedPassword(payload.password);
       
        
     db.User.create(
            Object.assign(payload, { password: encrptedPassword })
        )
            .then((user) => {
                const accessToken = generateAccessToken(payload.userName, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        token: accessToken
                    }
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err
                })
            })

    },
    login: (req, res) => {
        const { email, password } = req.body;
        db.User.findOne({ where: { email } })
            .then((user) => {
                if (!user) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Could not find any user with email: \`${email}\`.`,
                        }
                    })
                }

                const encryptedPass = encryptedPassword(password);

                if (user.password !== encryptedPass) {
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: `Provided email and password did not match.`
                        }
                    })
                }

                const token = generateAccessToken(user.userName, user.id);
              
                return res.status(200).json({
                   
                    status: true,
                    token: token
                })
            }).catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: `${err}4wsgvweg`
                })
            })
    }
}