let express = require('express');
let shuffle = require('shuffle-array');
let dateTime = require('node.date-time');
let fs= require('fs');
let readline = require('readline');
let bodyParser =require("body-parser");
let app = express();
app.use(bodyParser());
app.post('/', (req, res) => {
  let formData = req.body;
  let answer= req.body.filepath;
  let teamsize=req.body.tsize;
fs.readFile(answer, 'utf8', function (err, data) {

    if (err) 
    	{
    		 console.error("file error");	
    		 res.writeHead(200,{'content-type':'text/html'});
    		 fs.readFile('./error1.html',null,function(err,data){
    		 	 if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    }); 
    	}
    else if(!data)
    {
    	console.log("json file empty or syntax error");
    	 fs.readFile('./error2.html',null,function(err,data){
    		 	 if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    }); 
    }
   else if(teamsize==0|teamsize<0)
    {
    	console.log("team size cant be zero or lesser");
    	fs.readFile('./error3.html',null,function(err,data){
    		 	 if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    }); 
    }
    
   
    else
    {
    let obj = JSON.parse(data);
    let asize = Object.keys(obj).length;
  if(teamsize>asize)
    {
    	console.log("team size cant be greater than total member size");
 		fs.readFile('./error4.html',null,function(err,data){
    		 	 if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    }); 
    }
    else
    {
    let rem=asize%teamsize;
    let initnum=Math.floor(asize/teamsize);
    let addnum=asize-(initnum*teamsize);
    let tnum;
    let writestream = fs.createWriteStream('H:/berkadia/week2/team1.txt');


    if(rem==0)
    {
      tnum=initnum;
      writestream.write("created-"+initnum+" number of teams with size"+teamsize);

    	
    }
    else
    {
    	writestream.write("created-"+initnum+" number of team with size"+teamsize+" and one team with size-"+addnum);
    	tnum=initnum+1;
    }
    let i,j=1;
    let arr=[];
    for(i=0;i<asize;i++)
    {
	arr.push(j);
	j++;
    }
    shuffle(arr);
    
    let u=0;
    let p;
    let temp=teamsize;
    for( p=1;p<=tnum;p++)
           {
            writestream.write("\n---------");
            writestream.write("\nteam"+p);
            writestream.write("\n---------");

           for(var x=0;x<temp;x++,u++)
           {
          		if(u>=asize)
           		{
           			break;	
           		}
           		let z=arr[u];
              writestream.write("\n--------------");
              writestream.write("\nteam member ");
              writestream.write("\n--------------");
              writestream.write("\nname is-"+obj["aspirant"+z]["name"]);
              writestream.write("\nbranch is-"+obj["aspirant"+z]["branch"]);
              writestream.write("\nfavourite language  is-"+obj["aspirant"+z]["favlang"]);
           	}
           
           }
           
            writestream.write("\n-------------");
            writestream.write("\nend of teams");
            writestream.on('finish', () => { 
                console.log("----------------------------");
                console.log('wrote all teams data to file');
                                    });


          writestream.end();  
          let logstream = fs.createWriteStream('H:/berkadia/week2/log.txt', {'flags': 'a'});
    	logstream.write("request made at :"+new Date());
    	logstream.write("\n");
    	logstream.on('finish', () => { 
                console.log("----------------------------");
                console.log('wrote all logss data to file');
                                    });
    	logstream.end();
   fs.readFile('./success.html',null,function(err,data){
    		 	 if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    }); 
    }
}
});
});
app.listen(3000,() => console.log('Example app listening on port 3000!'));
