/**
 * Created by Kal Spass on 01/05/2014.
 */
window.addEventListener('load', function() {

    var pageMidPoint=0;
    var pageSize=0;


    $(document).ready(function() {
        pageSize=($(document).height());
        pageMidPoint=pageSize/2;
    });

    var setDegreeValue = 10;
    var displayTempertureElement = document.getElementById("degreeValue")
    var appDegreeElement = document.getElementById("degreeValue");
    var gestureX=0, gestureY=0,
        lastGestureX=0, lastGestureY= 0, gestureStart= 0, gestureInitialObject;


    var appBody = document.getElementById('appBody');
    var touchOptions = {
        prevent_default: true,
        drag: true,
        transform: true,
        swipe: true,
        hold: true,
        touch: true,
        drag_min_distance: 0,
        transform_min_rotation: 0,
        transform_min_scale: 0
    };
    var hammertime = Hammer(appBody, touchOptions).on("tap swipe transform touch drag dragend", function(event) {
        manageMultitouch(event);


    });

    function manageMultitouch(event){
        if (event.eventType == "EVENT_START") {
            beginGesture(event);
        };
        switch(event.type){


            case "drag":

                if (event.eventType == "MOVE"){
                // check if direction changed

            }
                break;

            case "tap":
                
                if (event.gesture.center.pageY<pageMidPoint){
                    changeDisplayedValue(1);
                }
                if (event.gesture.center.pageY>pageMidPoint){
                    changeDisplayedValue(-1);
                }



        }
    }
    // this function records the gesture's starting point and time for more calculations. It saves individual values (for drag direction changes it saves the start gestures as an object).
    function beginGesture (event) {
        event.startEvent=gestureInitialObject;
        event.timeStamp = gestureStart;
        event.center.pageX = lastGestureX;
        event.center.pageY = lastGestureY;
        event.timeStamp = gestureStart;

    };

    function changeDisplayedValue (number){
            setDegreeValue+=number;
            displayTempertureElement.innerHTML=setDegreeValue;
    }

}, false);