export const API_KEY = 'AIzaSyAQ_CBr4wNw4im4b7A9VM3-2KnEX3pc0Ew';

export const value_converter = (value) =>{

    if(value >= 1000000){
        return Math.floor(value/1000000)+"M"
    }else if(value >= 1000){
        return Math.floor(value/1000)+"K"
    }else{
        return value
    }
}