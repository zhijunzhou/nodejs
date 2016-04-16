$(function () {
    var mdata = {};
    var url = '/js/movie.json';
    $.getJSON(url, function (data) {
        mdata = data;
        render_editor_form(mdata);
        render_event_form(mdata);
    });
    var render_editor_form = function (data) {
        $('#c_editor').val($.toJSON(data));
    };
    
    var content = {
        "name": "Allen",
        "alias": [
            "Future X-Cops ",
            "Mei loi ging chaat"
        ],
        "publish": "2010-04-29",
        "images": {
            "coverBig": "/img/movie/1_big.jpg",
            "coverSmall": "/img/movie/1_small.jpg"
        },
        "source": [
            {
                "source": "youku",
                "link": "http://www.youku.com",
                "swfLink": "http://player.youku.com/player.php/sid/XMTY4NzM5ODc2/v.swf",
                "quality": "720p",
                "version": "Pro",
                "lang": "zh-cn",
                "subtitle": "Chinese"
            }
        ]
    };
    
    var render_event_form = function () {
        $('#c_save').on('click', function (event) {
            var data = {};
            data.content = mdata;
            $.ajax({
                type: "POST",
                url: '/movie/doAdd',
                data: mdata,
                success: function (data, textStatus) {
                    if (data.success) {
                        $('#msg').html('成功保存!');
                        $('#msg').addClass('alert alert-success');
                        $(location).attr('href', '/movie/' + mdata.name);
                    } else {
                        $('#msg').html(data.err);
                        $('#msg').addClass('alert alert-error');
                    }
                }
            });
        });
    };
});