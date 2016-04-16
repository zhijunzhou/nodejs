var Movie = require('../app/models/Movie.js');

exports.movieAdd = function(req, res) {
    if(req.params.name) { // update
        return res.render('movie', {
           title: req.params.name + '|movie|manage|',
           label:'Edit movie:' + req.params.name,
           movie: req.params.name 
        });
    } else {
        return res.render('movie', {
           title:'New|Movie|Manage',
           label:'New',
           movie:false 
        });
    }
};

exports.doMovieAdd = function(req, res) {
    var jsonStr = JSON.stringify(req.body);
    var json = JSON.parse(jsonStr);
    
    if(json._id) {
        // update
    } else {
        // insert
        Movie.save(json, function(err) {
           if(err) {
               res.send({'success':false, 'err':err});
           } else {
               res.send({'success':true});
           }
        });
    }
};

