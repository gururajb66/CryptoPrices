var bodyparser=require('body-parser');
var urlencod = bodyparser.urlencoded({extended:true});
var Client = require("coinbase").Client;
var client = new Client({'apiKey':'ABC','apiSecret':'CDERF'})
var express = require('express');
app = express();
app.get("/ETHPrice1.htm",function(r,s){
s.sendFile(__dirname+"/ETHPrice1.htm");
});
var temp=0;
var allprice={price:{spotprice:0.0,
				buyprice:0.0,
				sellprice:0.0},
				currency:"USD"
				};
console.log(allprice);
app.get("/get_prices",urlencod,function(r,s){
	var curr=r.query.currency;
	var coin=r.query.coin;
	const val = coin+"-"+curr;
	console.log(val);
	client.getSpotPrice({'currencyPair': val},function(err,spotprice){
		allprice.price.spotprice=Number(spotprice.data.amount);
		allprice.currency=spotprice.data.currency;
		console.log(allprice);
		client.getBuyPrice({'currencyPair': val},function(err,buyprice){
			temp=Number(buyprice.data.amount);
			temp=temp+(temp*.01);
			allprice.price.buyprice=Number(temp.toFixed(2));
			console.log(allprice);
			client.getSellPrice({'currencyPair': val},function(err,sellprice){
				temp=Number(sellprice.data.amount);
				temp=temp-(temp*.01);
				allprice.price.sellprice=Number(temp.toFixed(2));
				console.log(allprice);
				s.end(JSON.stringify(allprice));
			});
		});
	});
});







/*app.get("/get_spot",function(r,s){
client.getSpotPrice({'currencyPair': 'ETH-USD'},function(err,price){
console.log(price);
s.end(price.data.amount+" "+price.data.currency);
});
});
app.get("/get_buy",function(r,s){
client.getBuyPrice({'currencyPair': 'ETH-USD'},function(err,price){
console.log(price);
temp=Number(price.data.amount);
temp=temp+(temp*.01);
temp=temp.toFixed(2);
s.end(temp+" "+price.data.currency);
});
});
app.get("/get_sell",function(r,s){
client.getSellPrice({'currencyPair': 'ETH-USD'},function(err,price){
console.log(price);
temp=Number(price.data.amount);
temp=temp-(temp*.01);
temp=temp.toFixed(2);
s.end(temp+" "+price.data.currency);
});

});*/

//app.listen("8080",function(){console.log("Listeining on port 8080")});
const server = app.listen(process.env.PORT||"8080",function(){
	const port = server.address().port;
	console.log("Emp App is listening on "+port);
	});
