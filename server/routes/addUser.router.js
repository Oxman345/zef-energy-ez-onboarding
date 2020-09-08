const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "zefnet_user"
    ("first_name", "last_name", "email", "phone", "editor", "organization_id")
    VALUES($1, $2, $3, $4, $5, $6);`;
    const postValues = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.phone,
        req.body.editor,
        req.body.orgId,
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     res.sendStatus(500)
     console.log( 'error on POST /api/addUser/', error);
   })
});

module.exports = router;
