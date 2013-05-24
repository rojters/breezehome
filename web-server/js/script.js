$(document).ready(function () {
    updateQueue();

    function get_parameters() {
        var url = $(location).attr('href');
        var n = url.indexOf("?isadmin=True");
        var a;
        if (n < 0) {
            a = "";
        }
        else {
            a = url.substring(n, url.lenght);
        }
        return a;
    }

    function get_current() {
        $.post('/getCurrentSong', function(data){
            $("#current-song").empty().append(data);
        });
    }

    function get_status() {
        $.post('/get_status', function(data){
            return data;
        });
    }

    //Controlling play/pause button.
    $("#play-pause").click(function() {
        var a = get_parameters();
        var status = get_status();
        if(status == "[playing]"){
            $.post('/pause' + a, function(data){
                alert(data);
            });

        }else{
            $.post('/play' + a, function(data){
                alert(data);
            });
        }
    });

	$("#next").click(function(){
        var a = get_parameters();
        $.post('/next' + a, function(data) {
            updateQueue();
        });
    });

	$("#back").click(function(){
        var a = get_parameters();
        $.post('/back', function(data) {
            updateQueue();
        });
    });

    $("#queue-link").click(function(){
        updateQueue();
    });

    $("#search").click(function(){
        var a = get_parameters();
        $.post('/search', {song: $("#search-value").val()}, function(searchList) {
            $("#search-table").empty();
            jQuery.each(searchList, function(index, song) {
                $("#search-table").append("<tr><td>" + song + "<a class='btn pull-right add-song' data-uri='"+song+"' href='#'><i class='icon-plus icon-large'></i></a></td></tr>");
            });
            $(".add-song").click(function(){
                $.post('/add'+a, {uri: $(this).data("uri")}, function(data) {
                    alert(data);
                });
            });
        });
    });

    $("#authorize").click(function(){
        authorize();
    });

    $("#deny").click(function(){
        deny();
    });

    function changeTrack(nr) {
        $.post('/playNumber/'+nr, function(data){
            updateQueue();
        });
    }


    //Updates the current Queue in the media player
    function updateQueue() {
        $.post('/queue', function(queue) {
            $("#queue-table").empty();
            jQuery.each(queue, function(index, song) {
                $("#queue-table").append("<tr><td><a class='songlist' value=" +index+ " href='#'>" + song + "</a></td></tr>");
            });
            $(".songlist").click(function(){
                var ind = $(this).attr("value");
                changeTrack(ind);
            });
        });
    }

    function getCurrentSong() {
        $.post('/getCurrentSong', function(song) {
            $("current-song").val(song);
        });
    }


    function authorize() {
        var a = get_parameters();
        $.post('/authorize' + a, function(data){
            alert(data);
        });
    }

    function deny() {
        var a = get_parameters();
        $.post('/deny' + a, function(data){
            alert(data);
        });
    }

}); //search-table