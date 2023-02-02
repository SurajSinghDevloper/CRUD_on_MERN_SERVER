const express = require('express')
const router = express.Router()
const emp = require('../models/EmpSchema')
const user = require('../models/User')



router.post("/registerEmp", async(req,res)=>{
    const {name, email, age, mobile, work, add, desc} = req.body;
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        res.status(422).json("Please fill all the INPUTS!!!")
    }
    try {
        const preEmp = await emp.findOne({email:email})
        console.log(preEmp)
        if (preEmp) {
            res.status(422).json("User Already Exists!!!")
        }else{
            const addEmp = new emp({
                name, email, age, mobile, work, add, desc
            })
            await addEmp.save();
            res.status(201).json(addEmp)
            console.log(addEmp);
        }
    } catch (error) {
        res.status(422).json(error);
    }
})

router.post('/register', async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(422).send("Please fill all the INPUTS!!!")
    }
    try {
        const preUser = await user.findOne({email:email})
        console.log(preUser);
        if(preUser){
            res.status(422).send("User Already Exists!!!")
        }else{
            const newUser = new user({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })
            newUser.save().then(() => {
                res.send({ code: 200, message: "Sign-Up SUCCESS..." })
            }).catch((err) => {
                res.send({ code: 500, message: "Something went Wrong on server" })
                console.log(err)
            })
            console.log(req.body);
        }
    } catch (error) {
        res.status(422).send(error);
    }

})
router.post('/login', (req, res)=>{
    // matching email.and password
    user.findOne({ email: req.body.email }).then(result => {
        console.log(result);
        // matching password
        if (result.password !== req.body.password) {
            res.send({ code: 422, message: "opps!! Pass Not matched" })
        } else {
            res.send({ code: 200, message: "LOGIN SUCCESS", token: "qwertyiop" })
        }
    }).catch(err => { res.send({ code: 500, message: "User NOT found....." }) })
})

//get Emp data
router.get('/getdata', async(req, res)=>{
    try {
        const empData = await emp.find();
        res.status(201).json(empData)
        console.log(empData)
    } catch (error) {
        res.status(422).send(error);
    }
})

//get Indivisual User
router.get('/getuser/:id', async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params
        const userIndivisual = await emp.findById({_id:id})
        console.log(userIndivisual)
        res.status(201).json(userIndivisual)
    } catch (error) {
        res.status(422).json(error)
    }
})

// update user data
router.patch("/updateEmp/:id",async(req, res)=>{
    try {
        const {id} = req.params
        const updatedEmp = await emp.findByIdAndUpdate(id,req.body,{
            new:true
        })
        console.log(updatedEmp);
        res.status(201).json(updatedEmp)
    } catch (error) {
        res.status(422).json(error)
    }
})

//delete Emp data
router.delete('/deleteEmp/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const deleteEmp = await emp.findByIdAndDelete({_id:id})
        console.log(deleteEmp);
        res.status(201).json(deleteEmp)
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports =router