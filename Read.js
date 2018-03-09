var bodyparser=require('body-parser');
var urlencod = bodyparser.urlencoded({extended:true});
var fs=require('fs');
var Client = require("coinbase").Client;
var client = new Client({'apiKey':'ABC','apiSecret':'CDERF'})
var express = require('express');
app = express();
var curSymbol="";
var readjson = fs.readFileSync('conv.txt','utf8');
console.log(readjson);
var curobj=JSON.parse(readjson);
app.get("/ETHPrice1.htm",function(r,s){
s.sendFile(__dirname+"/ETHPrice1.htm");
});
var temp=0;
var allprice={price:{spotprice:0.0,
				buyprice:0.0,
				sellprice:0.0},
				currency:"USD",
				currencySymbol:"$"
				};
app.get("/get_prices",urlencod,function(r,s){
	var curr=r.query.currency;
	var coin=r.query.coin;
	var curSymbol =eval("curobj."+curr+".symbol");
	const val = coin+"-"+curr;
	client.getSpotPrice({'currencyPair': val},function(err,spotprice){
		allprice.price.spotprice=Number(spotprice.data.amount);
		allprice.currency=spotprice.data.currency;
		allprice.currencySymbol=curSymbol;
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

app.listen("8080",function(){console.log("Listeining on port 8080")});