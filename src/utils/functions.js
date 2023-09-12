const calculateDate = (date) => {
    let d = date / 1000;
    let r = {};
    let s = {
        year: 31536000,
        month: 2592000,
        week: 604800, // uncomment row to ignore
        day: 86400,   // feel free to add your own row
        hour: 3600,
        minute: 60,
        second: 1
    };
    
    Object.keys(s).forEach(function(key){
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];
    });
    
    // for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
    const newDate = r;
    let name = '';
    let modified = null;

    if(newDate.year > 0){
        modified = newDate.year;
        name = newDate.year == 1 ? 'year' : 'years';
    }
    else if(newDate.month > 0){
        modified = newDate.month;
        name = newDate.month == 1 ? 'month' : 'months';
    } 
    else if(newDate.week > 0){
        modified = newDate.week;
        name = newDate.week == 1 ? 'week' : 'weeks';
    }
    else if(newDate.day > 0){
        modified = newDate.day;
        name = newDate.day == 1 ? 'day' : 'days';
    }
    else if(newDate.hour > 0){
        modified = newDate.hour;
        name = newDate.hour == 1 ? 'hour' : 'hours';
    }
    else if(newDate.minute > 0){
        modified = newDate.minute;
        name = newDate.minute == 1 ? 'minute' : 'minutes';
    }
    else{
        modified = newDate.second;
        name = newDate.second == 1 ? 'second' : 'seconds';
    }

    return [modified, name];
}

const nFormatter = (num, digits) => {
    const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find(function(item) {
      	return num >= item.value;
    });

    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";

}

const isClientServer = (client, server) => {

	
	if(client !== 'unsupported' && server !== 'unsupported'){

		if(client === 'required' && server === 'required'){
			return ['Client and Server', 'both'];
		}
		return ['Client or Server', 'both'];
	}

	if(client !== 'unsupported' && server === 'unsupported'){
		return ['Client', 'client'];
	}

	if(client === 'unsupported' && server !== 'unsupported'){
		return ["Server", 'server'];
	}

    return ["Unsupported", "unsupported"];
}

module.exports = { calculateDate, nFormatter, isClientServer };