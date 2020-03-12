$(document).ready(function(){
    //leave this here until you're done so you have it
    console.log(json.Items)

    //** Global Variable Declarations */
    //I'd just rather cut to the chase here and work with an array
    const data = json.Items;
    
    //filling in table of data
    let tableFiller = "";

    data.forEach(elem => {
        tableFiller += `<tr><td>${elem.EventName}</td><td>${elem.VenueCity}</td><td>${elem.VenueName}</td><td>${elem.Date + elem.Time}</td><td>${elem.MinPrice}</td></tr>`
    });

    $("#eventListBody").html(tableFiller);

    //jQuery doc end
});