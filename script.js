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


const newData = JSON.parse(JSON.stringify(data))
let i=0;

for(i=0;i<newData.length;i++) {
    delete newData[i]['Temperature'];
    delete newData[i]['Humidity'];
    delete newData[i]['Weather'];
}

for(i=0;i<data.length;i++)
{
    const list = [data[i].Weather, data[i].Humidity, data[i].Temperatue];

    const temp = [JSON.parse(JSON.stringify(newData[i])),JSON.parse(JSON.stringify( newData[i]) ),JSON.parse(JSON.stringify(newData[i])) ];
    temp[0]["Weather"] = data[i].Weather;
    temp[1]["Humidity"] = data[i].Humidity;
    temp[2]["Temperature"] = data[i].Temperature;

    const climate = new Climate({
        Weather: temp[0],
        Humidity: temp[1],
        Temperature: temp[2]
    })
    console.log(climate);
    climate.save();

}

/*
 const newWb=xlsx.utils.book_new();
 const newWs=xlsx.utils.json_to_sheet(newData);
 xlsx.utils.book_append_sheet(newWb,newWs,"NewData");
 xlsx.writeFile(newWb,"ModifiedXlsx.xlsx");


 */

