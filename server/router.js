var express = require("express");
var http = require("http");
var router = express.Router();
var cheerio = require("cheerio");
var fs = require("fs");
var iconv = require('iconv-lite');
var url= "http://news.xauat.edu.cn/jdyw/index.html";
var homeDesc = {},
		homeArticle = {},
    homeQuestion = {},
    i=1;
    //ahtml;
router.get("/homeData",function(req,res){
  // function fetchPage(x) {     //封装了一层函数
  //   startRequest(x);
  // }
  // function startRequest(x) {

    http.get(url,function(response){
    var  ahtml ='';
        response.on("data",function(chunk){
          ahtml += iconv.decode(chunk,'GBK')//转码
        });
        response.on("end",function(){
          $ = cheerio.load(ahtml);
          // var  NewsList = $("#webNewsList").text();
          //  var titlenews ='./wz/' + $("#webNewsList li:nth-child(2) em").text();
          // fs.writeFile(titlenews+i+ '.txt',NewsList,(err)=>{
          //   if(err){
          //     console.log('wz保存失败'+ $("#webNewsList li:nth-child(2) title").text());
          //   } else {
          //     console.log('wz保存成功');
          //   }
          // })
         $("#webNewsList a").each(function(k, v) {
           var href ="http://news.xauat.edu.cn" +$(v).attr('href');
           if(href.indexOf('www')>0){
             console.log($(v).attr('href'))
            }
             else{
           //lbwy.push(href);
             ygwy (href);
           }
        });
      // i= i+1;
      //   var str = "http://news.xauat.edu.cn/jdyw/index_"+i+".html";
      //   if (i <= 8) {
      //     fetchPage(str);
      //  }
    })
  }).on("error",function(err){
    console.log(err)
  });
  // }
  // fetchPage(url);


function ygwy (x){
	http.get(x,function(response){
    var _html='';
		response.on("data",function(chunk){
			_html += iconv.decode(chunk,'GBK')//转码
		});
		response.on("end",function(){
      $ = cheerio.load(_html);
      var wynews = $("#NewsContentShow").text(),
          wynews_title =$("#NewsContentShow .title").text();
       fs.mkdir('./wypq/'+wynews_title, { recursive: true },function(err){
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
     });
        $("#NewsContentShow img").each(function(k, v) {//自动给src添加域名
        var src = v.attribs.src;
         v.attribs.src = "http://news.xauat.edu.cn" + src;
        saveImg($(v).attr('src'),'./wypq/'+wynews_title+'/'+k+'.jpg');
      });

      fs.writeFile('./wypq/'+wynews_title+'/' + 'nr.txt',wynews,(err)=>{
        if(err){
          console.log('wz保存失败'+ $("#NewsContentShow .title").text());
        } else {
          console.log('wz保存成功');
        }
      })
       console.log("爬取结束");
   //   homeArticle.news = $(".theContent").html();
  //		res.send({"homeDesc":homeDesc,"homeArticle":homeArticle,"homeQuestion":homeQuestion});
		});
	}).on("error",function(err){
		console.log(err)
  });

}
//保存图片
  function saveImg(x,path) {
        http.get(x,function (req,res) {
          var imgData = '';
          req.setEncoding('binary');
          req.on('data',function (chunk) {
              imgData += chunk;
          })
          req.on('end',function () {
              fs.writeFile(path,imgData,'binary',function (err) {
                  console.log('保存图片成功')
              })
          })
      }).on("error",function(err){
        console.log(err)
      });
  }
});
module.exports = router;
