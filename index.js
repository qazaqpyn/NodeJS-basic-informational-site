let http = require('http');
let fs = require('fs');
let url = require('url');

function errorMessage(res){
    fs.readFile('./404.html', function(error,file){
        res.writeHead(404,{'Content-Type':'text/html'});
        return res.end(file);
    })
}

http.createServer(function(req,res) {
    let q = url.parse(req.url,true);
    let fileName = '.'+q.pathname+'.html';
    
    if(q.pathname=='/'){
        fs.readFile('./index.html',function(err,data){
            if(err) {
                return errorMessage(res);
            }
            res.writeHead(202,{'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        })  

    } else {
            fs.readFile(fileName,function(err,data){
                if(err || fileName==='./index.html') {
                    return errorMessage(res);
                }
                res.writeHead(202,{'Content-Type':'text/html'});
                res.write(data);
                return res.end()
            })
    }
    
}).listen(8080);
