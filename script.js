let milisecond=0; //Initializeing the counter
let timingInterval=200; //Milisecond interval
let totalBoxes=10;
let boxDimention=72; //In pixels
let noOfScrollFrames=24; //The number of frames for which we want the scroll to happen
let prevTimerValue="0"; //To check when to scroll
var timeLogger; //The reference to the actual timer for logging
var numberContainer; //The container reference of the number boxes
window.addEventListener('load',(event)=>{
   numberContainer=document.getElementById('numberContainer'); //Container of all numbers
   timeLogger=document.getElementById('actualTime'); //TO log the actual timer value
   /**
    * Adding number nodes to each box
    * Number node represents the milisecond value from 0-9
    * Each box has 0-9 number nodes to simulate the timer
    */
   for(let element of  numberContainer.children){
       //List of nodes cannot be added directly, therefore additional loop
       //is required to add number node
        for(let i=0;i<totalBoxes;i++)
        {
            element.appendChild(createNumberNode(i));
        }
   };

//    timerFn(); //Starting the timer with Normal Smooth Scroll
   timerFn2(); //Starting the timer with manual scroll
});

/**
 * Creates a new node for a given number
 * @param {*} number The number for which node should be created 
 * @returns a number node or null if passed a value that is not number
 */
function createNumberNode(number)
{
    if(typeof number ==="number" && number>=0 && number<10)
    {
        let ele=document.createElement('span');
        ele.classList.add('num');
        ele.innerHTML=number;
        return ele;
    }
    return null;
}

/**
 * Scrolls to a particular number node inside a given box
 * @param {*} boxNode The box node whose number we have to flip
 * @param {*} number The number to which we want to scroll to
 */
function scrollToNumber(boxNode,number,prevNumber)
{
    const numberNodeList=boxNode.children;
    return (function(){
        if(number>=0 && number<10)
        {
            if(number==0)
            {
                boxNode.scrollTop=0;
            }
            else if(number!=prevNumber){
                
                smoothScroll(boxNode)
            }
        }
    })();
}

/**
 * Implements the actual scroll smooth logic for a given node
 * @param {*} node Node that we want to scroll
 */
function smoothScroll(node,start=0)
{
    window.requestAnimationFrame((time)=>{
        
        start++;
        console.log('Called for node',node,start);
        node.scrollTop+=(boxDimention/noOfScrollFrames);
        if(start<noOfScrollFrames)
        {
            smoothScroll(node,start);
        }  
    });
}

/**
 * Timer function that increments the number and updates the UI
 * Implimentation is based on setTimeout()
 */
function timerFn()
{
    setTimeout(()=>{
       milisecond++;
       const str=milisecond.toString();
       for(let i=str.length-1;i>=0;i--)
       {
        scrollToNumber(numberContainer.children[str.length-i-1],str.charAt(i)); 
       }
      
       timerFn(); //Constantly call the timer again and again as a macrotask
    },timingInterval)
}

/**
 * Timer function but using window.requestAnimationFrame
 */
function timerFn2(){
    window.requestAnimationFrame((time)=>{
        let str=time.toString().split('.');
        str=(parseInt(str[0]/1000))+''; //Getting only the seconds
        timeLogger.innerHTML=str;
        for(let i=str.length-1;i>=0;i--)
        {
         scrollToNumber(numberContainer.children[str.length-i-1],str.charAt(i),(prevTimerValue.charAt(i) || '0')); 
        }
        prevTimerValue=str;
        timerFn2(); //Constantly call the timer again and again before browser repaints the frame
     },timingInterval)
}