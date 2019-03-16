aa = $x('//*[@class="paramValue"]')
isMAC = (string) => string.includes(":");
mac1 = aa.filter(ab => { return isMAC(ab.innerHTML); } )
get6 = (string) => "https://aruljohn.com/mac/" + string.substring(0, 8).replace(/:/g,"");
mac1.forEach(function(a) { console.warn(get6(a.innerHTML)); });

// Or use map
console.log(new Set(mac1.map( item => get6(item.innerHTML) )))

// Print distinct values sorted
Array.from(new Set(mac1.map( item => get6(item.innerHTML) ))).sort().forEach(function(element) { console.log(element) } )
