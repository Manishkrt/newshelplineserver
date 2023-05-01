import Reporter from '../model/reporter.js'


export const createreporter = async(req, res)=>{
    const file = req.files
    const data = req.body 
    var fullUrl = req.protocol + '://' + req.get('host');  
    const fileobj = {
        "image" : `${fullUrl}/${file.image[0].path}`
    }
    
    let fulldata = Object.assign(data, fileobj); 
    const newReporter = new Reporter(fulldata)  
    try{
        await newReporter.save();
        res.status(201).json(newReporter) 
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const getreporter = async(req, res)=>{ 
    try{
        const reporterData = await Reporter.find({}).sort({createdAt : -1});
        res.status(201).json(reporterData)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
export const loginReporter = async(req, res)=>{
    const data = req.body  
    try{
        const reporter = await Reporter.findOne({email : data.email, password : data.password}).select('-password')
            if(reporter == null){
                res.status(500).json({message: "emai and password did not matched"})
            }else{
                res.status(200).json(reporter)
            } 
        // const reporter = await Reporter.findOne(data).select('-password')
        // res.status(200).json(reporter)
    }catch(err){
        res.status(500).json({message: err})
    }
} 
export const statusReporter = async(req, res)=>{
    const {status} = req.body
    console.log(status)
    const _id = req.params.id 
    try{
        await Reporter.updateOne({_id}, {$set: {status}});
        const Productdata = await Reporter.findById({_id}); 
        res.status(200).json(Productdata)
    }
    catch(err){
        res.status(err.code || 409).json({message: err.message})
    }
}


export const sendotpReporter = async (req, res) => {
    const { email } = req.body; 

    if (!email) {
        res.status(400).json({ error: "Please Enter Your Email" })
    }


    try {
        const presuer = await Reporter.findOne({ email: email });

        if (presuer) {
            const OTP = Math.floor(100000 + Math.random() * 900000);

            const existEmail = await Reporter.findOne({ email: email });


            if (existEmail) {
                const updateData = await Reporter.findByIdAndUpdate({ _id: existEmail._id }, {
                    otp: OTP
                }, { new: true }
                );
                await updateData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }


                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })

            } else {

                // const saveOtpData = new Reporter({
                //     email, otp: OTP
                // });

                // await saveOtpData.save();
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Eamil For Otp Validation",
                    text: `OTP:- ${OTP}`
                }

                tarnsporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(400).json({ error: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(200).json({ message: "Email sent Successfully" })
                    }
                })
            }
        } else {
            res.status(400).json({ error: "This User Not Exist In our Db" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
};

export const searchReporter = async(req, res)=>{ 
    const key = req.params.key  
    try{
        const data = await Reporter.find({$or: [
            {email : {$regex: key}},
            {name : {$regex: key}},
            {phone : {$regex: key}}, 
            {status : {$regex: key}}, 
            {designation : {$regex: key}}, 
            {address : {$regex: key}}, 
        ]}); 
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}






