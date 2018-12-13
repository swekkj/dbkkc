var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var elementsRouter = require('./routes/elements');
var chatRouter = require('./routes/chat');
var signinRouter = require('./routes/index');
var signupRouter = require('./routes/index');
var app = express();
app.use(express.json());

var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.set("ipaddr","127.0.0.1");
app.set("port",3000);


app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/elements',elementsRouter);
app.use('/chat',chatRouter);
app.use('/', signinRouter);
app.use('/', signupRouter);

var chat1 = io.of('/chat/1');
var chat2 = io.of('/chat/2');
var chat3 = io.of('/chat/3');
var chat4 = io.of('/chat/4');
var chat5 = io.of('/chat/5');
var chat6 = io.of('/chat/6');

chat1.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    console.log(data);
    socket.name = data.name;
    socket.userid = data.userid;
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat1.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
chat2.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat2.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
chat3.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat3.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
chat4.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat4.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
chat5.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat5.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
chat6.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    chat6.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});
io.on('connection', function(socket) {

  // 접속한 클라이언트의 정보가 수신되면
  socket.on('login', function(data) {
    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    console.log(socket.name);
    console.log(socket.userid);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.name );
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on('chat', function(data) {
    var msg = {
      from: {
        name: socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);
  });

  // force client disconnect from server
  socket.on('forceDisconnect', function() {
    socket.disconnect();
  })

  socket.on('disconnect', function() {
    console.log('user disconnected: ' + socket.name);
  });
});

http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}); // 추가

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
