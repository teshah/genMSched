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
        // console.info('before forDay = ' + forDay);
        // forDay.setTime(forDay.getTime() + 1 * 86400000);
        forDay = new Date(forDay.getFullYear(), forDay.getMonth(), forDay.getDate() + 1);
        // console.info('after forDay = ' + forDay);
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


// genSchedule(firstDay, '730! C C C X 4^ X X N! X N! S^ CA 8^ 8^ CA X N! N! N! X X P P P X IV N 4^ P X C C 23 X X CA 1130 N! S^ X 730! 730!');
// genSchedule(firstDay, '730! C X C C 3! X X C C S^ X N! N 2! 23 X N! IV IV X X S^ C IV X IV IV IV X CA S^ S^ CA X X C C C 3! 23 X N!');

//On Mon 10/23/2017 9:11 PM ET
// let sched = 'N! X C 3! N! 23 X X P 3! N! X C IV IV IV 1230 X P P X X P P P X P P P X P P P P X X P P P P X 2! 2!';

//On Sat 12/9/2017 11:55AM ET
// let firstDay = "12/11/2017";
// let sched = '2! N! 3! X N! N! X X C C X 3! N! 730! 2! 8^ N! X N! 12 X X 2! P S^ S^ X N! N! IV 12 X CA CA X X 12 C C X C IV IV';
// genSchedule(firstDay, sched);

//On Th Jan 18, 2018 22:08 ET
//let firstDay = "1/22/2018";
//let sched = '12 X CA C C X X 3! N! IV X IV IV IV IV X N! 3! P X X C C C X C 8^ 8^ X S^ IV 12 IV X X IV 3! N! CA X 23 X';

//On Th Mar 1 2018 18:50 ET
//let firstDay = '3/4/2018'; //sunday
//let sched = '730! S^ 3! P X N! X X N! 12 X CA S^ 2! 8^ X C C C N! X X 12 CA IV X N! N! 23 X IV 3! N! N! X X C C C 3! X 730! 730!';
//genSchedule(firstDay, sched);  //43 events imported.

//On Fr 4/13/2018 8:41 PM ET
// let firstDay = '4/15/2018';
// let sched = '730! S^ X IV IV IV X X CA CA X 3! N! 2! N! N! X N! IV S^ X X C C C X CA 8^ 8^ X IV IV 12 N! X X P P P P X P P';
// genSchedule(firstDay, sched);  //43 events imported.

//On Sat 5/19/2018 12:34 PM ET
let firstDay = '5/27/2018';  //last day 7/8/18
let sched = 'P P 12 C X N! X X IV 12 N! X IV IV IV CA X CA S^ C X X C X C C C P P X P P P P X X IV X IV 12 N! 8^ 8^';
genSchedule(firstDay, sched);  //43 events imported.
