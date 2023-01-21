

const validateMovieRequest = async (req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({
            message:"Please enter the movie name."
        })
    }
    
}