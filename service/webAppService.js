var fs = require('fs');
//获取测试数据
exports.get_test_data = function(){
	var content = fs.readFileSync('./db/test.json', 'utf-8');
	return content;
}
exports.get_chapter_data = function() {
	var content = fs.readFileSync('./db/reader/chapter.json', 'utf-8');
	return content;
}

exports.get_chapter_content_data = function(id) {
	if (!id) {
		id = "1";
	}
	var content = fs.readFileSync('./db/reader/data/data' + id + '.json', 'utf-8');
	return content;
}
//获取book数据
exports.get_book_data = function(id) {
	if (!id) {
		id = "18218";
	}
	if(fs.existsSync('../db/book/' + id + '.json')){
	 	return fs.readFileSync('./db/book/' + id + '.json', 'utf-8');
	}else{
		return fs.readFileSync('./db/book/18218.json', 'utf-8');
	}
}
//获取目录数据
exports.get_category_data = function(){
	var content = fs.readFileSync('./db/category.json', 'utf-8');
	return content;
}
//获取男性书籍数据
exports.get_male_data = function(){
	var content = fs.readFileSync('./db/channel/male.json', 'utf-8');
	return content;
}
//获取女性书籍数据
exports.get_female_data = function(){
	var content = fs.readFileSync('./db/channel/female.json', 'utf-8');
	return content;
}
//获取home数据
exports.get_index_data = function(){
	var content = fs.readFileSync('./db/home.json', 'utf-8');
	return content;
}
//获取首页排序数据
exports.get_rank_data = function(){
	var content = fs.readFileSync('./db/rank.json', 'utf-8');
	return content;
}
//获取搜索数据
exports.get_search_data = function(start,end,keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');
		var data = {
			s: keyword,
			start :start,
			end : end
		};
		var content = qs.stringify(data);
		var http_request = {
			hostname : 'dushu.xiaomi.com',
			port : 80,
			path : '/store/v0/lib/query/onebox?' + content
		};
		req_obj = http.request(http_request , function(_res){
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data',function(chunk){
				content += chunk;
			});
			_res.on('end',function(){
				cb(null,content)
			});
		});
		req_obj.on('error',function(){
			
		});
		req_obj.end();
	}
};
