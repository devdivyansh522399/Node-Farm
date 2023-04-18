const http = require('http');
const url = require('url');
const fs = require('fs');
const tempOverView = fs.readFileSync(`${__dirname}/template/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/template/template-card.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/template/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const replaceTemplate = require('./modules/replaceTemplate');
const server = http.createServer((req, res) =>{
    const {query,pathname} = (url.parse(req.url,true));
    //overview page 
    if( pathname==='/' || pathname==='/overview')
    {   res.writeHead(200,{'Content-type' : 'text/html'});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(' ');
        const output = tempOverView.replace('{%PRODUCT_CARDS%}', cardHtml);
        res.end(output);
    }
    //Product page
    else if(pathname==='/product'){
        res.writeHead(200,{'Content-type' : 'text/html'});
        const pro = dataObj[query.id];
        const output = replaceTemplate(product, pro);
        res.end(output); 
    }
    //api
    else if(pathname==='/api'){
            res.writeHead(200,{'Content-type' : 'application/json'});
            res.end(data);
    }
    //Not Found
    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world'
        })
        res.end("<h1>Page not Found...</h1>");
    }
    
});
server.listen(8000,'127.0.0.1', ()=>{
    console.log('Server has been started...');
});