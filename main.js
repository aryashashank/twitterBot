var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

var params = {
    q: '#infobeatz2018',
    count: 1050,
    result_type: 'mixed',
    lang: 'en'
  }
var data= "";
var tweeters = [];
  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
    
        for(let i = 0; i < data.statuses.length; i++){
            // Get the tweet Id from the returned data
            let id = { id: data.statuses[i].id_str }
            let name = JSON.stringify(data.statuses[i].user.name);
            
            if (tweeters.filter(function(e) { return e.name === name; }).length > 0) {
                tweeters.forEach(function(el){
                   if(el.name == name){
                    el.count++;
                   }
                });
            
              }
              else{
                  tweeters.push({'name':name,'count':1});
              }
          }


    } else {
      console.log(err);
    }
  });

  var fs = require('fs');
  function writeToFile(data){
  fs.readFile('myjsonfile.json',function(err,content){
    if(err) throw err;
    fs.writeFile('myjsonfile.json',data,function(err){
      if(err) throw err;
    })
  });
  }
  

  app.get('/results', (req, res) => res.json(tweeters));

app.listen(3000, () => console.log('Example app listening on port 3000!'));


  