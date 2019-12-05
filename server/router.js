var express = require("express");
var http = require("http");
var router = express.Router();
var cheerio = require("cheerio");
var fs = require("fs");
var iconv = require('iconv-lite');
var url= "http://news.xauat.edu.cn/jdyw/2019-12-03/15087.html";
router.get("/homeData",function(req,res){
	var homeDesc = {},
		homeArticle = {},
    homeQuestion = {},
    //url= "http://news.xauat.edu.cn/jdyw/2019-12-03/15087.html",
    _html;

	http.get(url,function(response){
		response.on("data",function(chunk){
			_html += iconv.decode(chunk,'GBK')//转码
		});
		response.on("end",function(){
			$ = cheerio.load(_html);
        $("#NewsContentShow img").each(function(k, v) {//自动给src添加域名
        var src = v.attribs.src ;
         v.attribs.src = "http://news.xauat.edu.cn" + src;
         saveImg($(v).attr('src'),'./tp/'+k+'wilteMe.png');
      });
      var wynews = $("#NewsContentShow").text();
      fs.writeFile('./' + $("#NewsContentShow .title").text() + '.txt',wynews,(err)=>{
        if(err){
          console.log('wz保存失败');
        } else {
          console.log('wz保存成功');
        }
      })
      console.log("爬取结束");
      homeArticle.news = $(".theContent").html();
			res.send({"homeDesc":homeDesc,"homeArticle":homeArticle,"homeQuestion":homeQuestion});
		});
	}).on("error",function(err){
		console.log(err)
  });
//保存图片
  function saveImg(url,path) {
    console.log(url,path)
      try{
        http.get(url,function (req,res) {
          var imgData = '';
          req.setEncoding('binary');
          req.on('data',function (chunk) {
              imgData += chunk;
          })
          req.on('end',function () {
              fs.writeFile(path,imgData,'binary',function (err) {
                  console.log('保存图片成功'+path)
              })
          })
      })
      }
      catch(err){
        console.log('保存图片失败'+path)
      }

  }

});

module.exports = router;
