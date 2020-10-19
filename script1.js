const xlsx=require("xlsx");

const mongoose=require("mongoose");
const config=require('./config/database');
const Climate=require('./model');


mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.database,{useNewUrlParser:true});

mongoose.connection.on('connected',()=>{
    console.log("Connected to Database "+config.database);
});
mongoose.connection.on('error',(err)=>{
    console.log("Connection Error"+err);
});


const wb=xlsx.readFile("Assignment2.xlsx",{cellDates:true});//cellFormula:true});
const ws=wb.Sheets["Sheet1"];

const data= xlsx.utils.sheet_to_json(ws);
const climate=[]

function amaze(data)
{
    return new Promise((resolve,reject)=> {

        const newData = JSON.parse(JSON.stringify(data))
        let i = 0;
        for (i = 0; i < newData.length; i++) {
            delete newData[i]['Temperature'];
            delete newData[i]['Humidity'];
            delete newData[i]['Weather'];
            climate[i] = new Climate({});
        }
        resolve(newData);
    });
}

amaze(data).then(newData=>{

    for(i=0;i<data.length;i++) {
        const list = [data[i].Weather, data[i].Humidity, data[i].Temperatue];
        const temp = [JSON.parse(JSON.stringify(newData[i])), JSON.parse(JSON.stringify(newData[i])), JSON.parse(JSON.stringify(newData[i]))];

        temp[0]["Weather"] = data[i].Weather;
        temp[1]["Humidity"] = data[i].Humidity;
        temp[2]["Temperature"] = data[i].Temperature;

        climate[i]["Weather"] = temp[0];
        climate[i]["Humidity"] = temp[1];
        climate[i]["Temperature"] = temp[2];

    }
    return climate.length;
}).then(n=>{
    for(i=0;i<n;i++)
        climate[i].save();

}).catch((error)=>{
    console.log("You r not amaze"+error);
})

