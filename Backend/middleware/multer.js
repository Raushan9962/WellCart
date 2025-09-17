import multer from "multer";

let storage = multer.diskStorage({
    destination:(req,file,cd)=>{
    cd(null,"./public")
},
filename:(req,file,cd)=>{
    cd(null,file.originalname)
}
});
let upload = multer(storage)

export default upload