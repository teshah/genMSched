var json2csv = require('json2csv');
var shiftCodeMap = require('./shift_code_map');
//  console.info(shiftCodeMap);

function genSchedule(firstDay, inputRawSchedule) {
    // console.info("Starting at " + new Date());
    console.error('Subject,Start Date,Start Time,Location,End Date,End Time,Description,Private,All Day Event');  
    // console.info(inputRawSchedule);
    var codex = inputRawSchedule.split(" ");
    // console.info(codex);
    // codex.sort();
    // console.info(codex);
    // var un_codes = codex.sort().filter((x, i, a) => !i || x != a[i-1]);
    // console.info(un_codes);
    let forDay = new Date(firstDay);
    codex.forEach(function (element) {
        // console.info ( element + " " + new Date())
        var sched = getCodeSchedule(forDay, element);
        forDay.setTime(forDay.getTime() + 1 * 86400000);
    }, this);

}

function getCodeSchedule(forDay, codex) {
    //   console.warn(codex);
    //   console.info(shiftCodeMap);
    let startDateToUse = new Date(forDay);
    var matchingShift = shiftCodeMap.list.filter(function (x) {
        return x.code === codex;
    })[0];

    if (matchingShift) {
        // console.info("matching Shift = " + matchingShift.starttime);
        var subject = 'M ';
        if ( matchingShift.code === 'X') {
            subject += ' DAYOFF (X) ';
        } else if ( matchingShift.code === 'P' ) {
            subject += ' PTO (P) ';
        } else {
            subject += ' 🏥 Work (' + matchingShift.code + ')';
        }

        var row = subject;
        let startDateString = startDateToUse.getMonth() + 1 + "/" + startDateToUse.getDate() + "/" 
        + startDateToUse.getFullYear() ;
        row += ',' + startDateString;
        if (matchingShift.allday) {
            row += ',';  // allday so no time needed.
        } else {
            row += "," + matchingShift.starttime;
        }
        row += ',' + 'cstate';
        
        if (matchingShift.allday) {
            let endDateString = startDateString;
            row += ',' + endDateString;// for allday, enddate is same as start
            row += ',';// for allday, endtime is blank
        } else {
            let endDateWithTimeString = startDateString + ' ' + matchingShift.starttime;
            let endD = new Date(endDateWithTimeString);
            endD.setHours(endD.getHours() + 8);
            endD.setMinutes(endD.getMinutes() + 30);
            // console.log('endDate with Time = ' + endD);
            let endDateWithShiftHoursAdded = endD.getMonth()+1 + '/' +
                endD.getDate() + '/' + endD.getFullYear();
            row += "," + endDateWithShiftHoursAdded;

            let endTime = endD.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
            row += "," + endTime;
        }
        row += ","; // empty description
        row += ","; // empty for private
        if (matchingShift.allday) {
            row += "," + 'true'; // set to allday event
        } else {
            row += ","; // empty allday
        }
            console.error(row);
    }
    else
        console.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX No matching shift found for code = " + codex);


}

let firstDay = "9/17/2017";

// genSchedule(firstDay, '730! C C C X 4^ X X N! X N! S^ CA 8^ 8^ CA X N! N! N! X X P P P X IV N 4^ P X C C 23 X X CA 1130 N! S^ X 730! 730!');
genSchedule(firstDay, '730! C X C C 3! X X C C S^ X N! N 2! 23 X N! IV IV X X S^ C IV X IV IV IV X CA S^ S^ CA X X C C C 3! 23 X N!');

