#! /usr/bin/env node

import inquirer from "inquirer"
import {differenceInSeconds} from "date-fns"


let response = await inquirer.prompt([{
    name:"userInput",
    type:"number",
    message:"Please enter the Number of second",
    validate:(input)=>{
        if(isNaN(input)){
            return "Please enter valid Number"
        }else if(input > 60){
            return "Second must be in 60"
        }else{
            return true;
        }
    }
}]);

let input = response.userInput

function startTime(value:number){
    let intTime = new Date().setSeconds(new Date().getSeconds() + value);
    let intervalTime = new Date(intTime);
    setInterval((()=>{
        let currentTime = new Date()
        let timeDiff = differenceInSeconds(intervalTime,currentTime);

        if(timeDiff <= 0){
            console.log("Timer has Expired");
            process.exit()
        }
        let min = Math.floor((timeDiff % (3600*24))/3600)
        let sec = Math.floor(timeDiff % 60)
        console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`);
        }),1000)
}
startTime(input);