import React from "react";
import back1 from "../assets/Gpage/gpage2.png";
import back2 from "../assets/Gpage/gpage1.png";
import back3 from "../assets/Gpage/gpage3.jpg"; 
import back4 from "../assets/Gpage/gpage4.png";
import back5 from "../assets/Gpage/gpage5.jpg";

const Background = ({ heroCount }) => {
if(heroCount ===0){
    return <img src={back2} alt ="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
}
else if(heroCount ===1){
    return <img src={back1} alt ="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
}
else if(heroCount ===2){
    return <img src={back3} alt ="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
}
else if(heroCount ===3){
    return <img src={back4} alt ="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
}
else if(heroCount ===0){
    return <img src={back5} alt ="" className="w-[100%] h-[100%] float-left overflow-auto object-cover"/>
}

  
};

export default Background;
