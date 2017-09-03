var json2csv = require('json2csv');
var shiftCodeMap = require('./shift_code_map');
//  console.info(shiftCodeMap);
 
function genSchedule(inputRawSchedule) {
    console.info("Starting at " + new Date());
    // console.info(inputRawSchedule);
    var codex  = inputRawSchedule.split(" ");
    // console.info(codex);
    // codex.sort();
    // console.info(codex);
    // var un_codes = codex.sort().filter((x, i, a) => !i || x != a[i-1]);
    // console.info(un_codes);
    codex.forEach(function(element) {
        // console.info ( element + " " + new Date())
        getCodeSchedule(element);
    }, this);
    
}

function getCodeSchedule(codex) {
//   console.warn(codex);
//   console.info(shiftCodeMap);

  var matchingShift = shiftCodeMap.list.filter( function(x) {
      return x.code === codex;
  })[0];

  if ( matchingShift )
    console.info("matching Shift = " + matchingShift.subject);
  else 
    console.error("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX No matching shift found for code = " + codex);
  

}

genSchedule('730! C C C X 4^ X X N! X N! S^ CA 8^ 8^ CA X N! N! N! X X P P P X IV N 4^ P X C C 23 X X CA 1130 N! S^ X 730! 730!');

