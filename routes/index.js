
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    var path = './public/images/user_img';
    cb(null, path); // 업로드할 경로 설정
  },
  filename: function(req, file, cb){
    cb(null, req.body.user_id + ".jpg");
  }
});

var upload = multer({storage : _storage});
var pool = mysql.createPool({
  connectionLimit:5,
  host : 'localhost',
  user : 'root',
  database: 'dbtest',
  password: 'PASSWORD'
});

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('before_login');
      connection.release();

});


// singup
router.post('/', upload.single('user_image'), function(req, res, next) {

  console.log('hello');
  var user_id = req.body.user_id;
  var user_pw = req.body.user_pw;
  var user_name = req.body.user_name;
  var user_birth = req.body.user_birth;
  var user_email = req.body.user_email;
  var user_image = req.body.user_id + ".jpg";
  var user_phone = req.body.user_phone;
  var user_address = req.body.user_address;
  var user_nickname = req.body.user_nickname;

  var member_data = [user_id, user_pw, user_nickname, user_image, user_phone];
  var personality_data = [user_name, user_birth, user_address, user_phone, user_email];

  pool.getConnection(function (err, connection) {
    // personality table
    console.log(personality_data);
    var sqlforPERSON = "insert into personality(name, birth, addr, phone, email) values(?,?,?,?,?)";
    var sqlforMEMBER = "insert into member(id, passwd, nickname, image, phone) values(?,?,?,?,?)";
    connection.query(sqlforPERSON, personality_data, function(err, rows){
      if(err) console.error(err);
    });

    // member table
    console.log(member_data);
    connection.query(sqlforMEMBER, member_data, function(err, rows){
      console.log('in member query');
      if(err) console.error(err);
      res.redirect('before_login');
      connection.release();
    });


  });
});


//signin
router.post('/signin', function(req, res, next){

  var id = req.body.conn_id;
  var pw = req.body.conn_pw;

  console.log([id,pw]);


  pool.getConnection(function (err, conn) {
    if(err) console.error(err);

    var sql = "select * from member where id=?";

    conn.query(sql,[id], function(err, result){
      if(err) console.error("find user err : "+err);
      if(result.length==0) res.redirect("/");
      else if(pw!=result[0].passwd)  // passwd 찾았고 다름
      {res.redirect("/");}
      else
      {
        res.render('index', {rows: result} );
        conn.release();
      }
    });
  });
});


module.exports = router;
