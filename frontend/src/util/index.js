export function timestampToString(timestamp) {
    const date = new Date(timestamp);
    return date.toDateString();
}

export function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4();
  }

/**
 * Convert the array of posts to a map indexed by post id
 */
export function mapById(postArray){
  var result = postArray.reduce(function(map, obj) {
      map[obj.id] = obj
      return map
  }, {})

  return result
}

export function unMap(inMap){
    //return Array.from(inMap, (key, value) => value)
    let array_values = new Array();
  
    for (var key in inMap) {
        array_values.push(inMap[key]);
    }

    return array_values;
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

