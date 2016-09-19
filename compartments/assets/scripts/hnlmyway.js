// WIDGET CODE FROM HONOLULU.GOV HONOLULU MY WAY
if (!window.jQuery) {
    throw new Error('The widget requires jQuery, please check http://widget/docs');
}

var $html = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">';
$html += '<link rel="stylesheet" type="text/css" href="https://www2.honolulu.gov/honolulumyway/css/jquery.datetimepicker.css">'

$html += '<style>#trip_planner_mode {text-align:center; margin-left:15px} .trip_planner_mode {padding-top: 5px; padding-bottom: 5px; margin: 5px; margin-bottom: 0px;width: 20px;}';
$html += '.trip_planner_mode:hover {color: rgb(58, 132, 223);} .trip_planner_selected_mode {color: rgb(58, 132, 223); border-bottom:2px solid rgb(58,132,223);}';
$html += '#trip_planner_input {display:inline-block;} #addr_start, #addr_end, .user_time {display: inline-block;border: none; border-bottom: 1px solid silver; margin-top: 5px;margin-bottom: 5px;padding: 3px;width: 250px;} #trip_planner_input .fa { padding: 5px;}';
$html += '#trip_planner_swap {display: inline-block;font-size: 2em;color: #888;cursor: pointer;float: left;line-height: 50px;vertical-align: middle;}';
$html += '#hmw_tp_widget .green{color:green;} #hmw_tp_widget .red{color:red;}'; // #time_type, #prefer_type{display: inline-block;width: 150px;border: none;background: none; margin:0}';
$html += '#hmw_tp_widget button{margin: 10px;margin-left:auto;margin-right:auto;display:block;}';
// $html += '#tripplanner_submit{margin: 15px;margin-left: auto;margin-right: auto;display: block;padding: 5px;border: 1px solid #ccc;background: whitesmoke;border-radius: 3px;cursor: pointer;}';
$html += '.feature{color: rgb(92, 92, 92);margin: 0;font-weight: bold; font-size: 1.4em;padding: 5px;}';
$html += '#feature_icon_tripplanner {color: #3F51B5;}.feature_icon {color: white;}';
$html += '#tp_date{display:none;    margin-left: 25px;}';
// $html += '#hmw_tp_widget{background-color:white;}';
$html += '</style>';

$html += '<div class="feature toggle"><span class="fa-stack fa"><i class="fa fa-circle fa-stack-2x feature_icon_back" id="feature_icon_tripplanner"></i><i class="fa fa-map-marker fa-stack-1x feature_icon" data-val-feature="tripplanner"></i></span>Trip Planner</div>';

$html += '<div id="trip_planner_mode" value="DRIVING"><i class="fa fa-lg fa-car trip_planner_mode trip_planner_selected_mode" value="DRIVING"></i><i class="fa fa-lg fa-bus trip_planner_mode" value="TRANSIT"></i><i class="fa fa-lg fa-male trip_planner_mode" value="WALKING"></i><i class="fa fa-lg fa-bicycle trip_planner_mode" value="BICYCLING"></i></div>';
$html += '<div id="trip_planner_swap"><span></span></div>';
$html += '<div id="trip_planner_input"><i class="fa fa-circle-o fa-fw green"></i><input type="text" id="addr_start" value="" class="controls" placeholder="Enter the start address" autocomplete="off"><br>';
$html += '<i class="fa fa-fw fa-map-marker red"></i><input type="text" id="addr_end" value="" placeholder="Enter the destination address" autocomplete="off"><br>';
$html += '<i class="fa fa-fw fa-clock-o"></i>';
$html += '<select id="time_type">';
$html += '<option value="NOW">Leave now</option>';
$html += '<option value="ARRIVE">Arrive by</option>';
$html += '<option value="DEPART">Depart after</option>';
$html += '</select>';
$html += '<input id="tp_date">';
$html += '<br>';
$html += '<i class = "fa fa-fw fa-road"></i>';
$html += '<select id = "prefer_type" tabindex = "0" >';
$html += '<option value = "BEST">Best route</option>';
$html += '<option value = "TRANFERS">Fewer tranfers</option>';
$html += '<option value = "WALKING">Less walking</option>';
$html += '</select></div>';
$html += '<button type="button" class="button" id="tripplanner_submit">Get Directions</button>';

$('#hmw_tp_widget').html($html);

//datetimepicker options
$("#tp_date").datetimepicker({
    formatTime: 'g:i A',
    format: 'm/d/Y h:i A'
});

var $mode = 'DRIVING';


$('#trip_planner_swap').click(function(){
    var temp = $('#addr_start').val();
    
    $('#addr_start').val($('#addr_end').val());
    
    $('#addr_end').val(temp);
});

$('.trip_planner_mode').click(function () {
    $('.trip_planner_selected_mode').removeClass('trip_planner_selected_mode');
    $(this).addClass('trip_planner_selected_mode');
    $mode = $(this).attr('value');
});

$("#time_type").change(function () {
    if ($("#time_type").val() !== "NOW") {
        $("#tp_date").addClass('user_time');
        $("#tp_date").css('display', 'block');
        $time = '';
    } else { 
        $("#tp_date").slideUp();
    }
    
    
});


$('#tripplanner_submit').click(function () {
    switch ($("#time_type").val()) {
        case 'DEPART':
            $time = '&departuretime=' + $("#tp_date").val();
            break;
        case 'ARRIVE':
            $time = '&arrivaltime=' + $("#tp_date").val();
            break;
    }
    
    if (window.location.href.toLowerCase().indexOf('dev') >= 0){
        $base = "http://devwww2.honolulu.gov/honolulumyway/";
    } else if (window.location.href.toLowerCase().indexOf('tst') >= 0){
        $base = "http://tstwww2.honolulu.gov/honolulumyway/";
    } else {
        $base = "http://www2.honolulu.gov/honolulumyway/"
    }
    
    var $pref = $("#prefer_type").val(); 
    
    window.open($base + '?origin=' + $('#addr_start').val() + '&destination=' + $('#addr_end').val() + '&mode=' + $mode + $time + "&pref=" + $pref);
});

var $time = '';


var autocomplete = new google.maps.places.Autocomplete(document.getElementById('addr_start'));
var autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('addr_end'));

