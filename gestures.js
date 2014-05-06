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
        lastGestureX=0, lastGestureY= 0, gestureStart= 0;
    var dragLength=0, dragDirection, initialGestureY,initTouch = false;

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
        event.gesture.preventDefault();
        dragLength=0;
        manageMultitouch(event);


    });

    function manageMultitouch(event){
        console.log(event.type);
        beginGesture(event);


        switch(event.type){

            case "drag":

                if (initTouch==false)
                {
                    initialGestureY= event.gesture.deltaY;
                    initTouch=true;
                    console.log("initial");
                }



                dragLength = initialGestureY-event.gesture.deltaY;

                // check if direction changed
                // add screen type (tablet/phone/large screen) check and variations

                    if (dragLength>(pageSize/10))
                    {

                        initialGestureY= event.gesture.deltaY;
                        changeDisplayedValue(-1);
                        //dragLength=0;
                        console.log(dragLength);
                    }
                    if (dragLength<-(pageSize/10))
                    {
                        initialGestureY= event.gesture.deltaY;
                        changeDisplayedValue(1);
                        //dragLength=0;
                        console.log(dragLength);
                    }


                break;

            case "dragend":
                initTouch = false;

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
        // event.gesture.startEvent=gestureInitialObject;
        event.gesture.timeStamp = gestureStart;
        event.gesture.center.clientX = lastGestureX;
        event.gesture.center.clientY = lastGestureY;

    };

    function changeDisplayedValue (number){
            setDegreeValue+=number;
            displayTempertureElement.innerHTML=setDegreeValue;
    }

}, false);