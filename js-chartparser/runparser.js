//
//  runparser.js
//
/*
  The author or authors of this code dedicate any and all 
  copyright interest in this code to the public domain.
*/


// helper functions for the parser demo

function getElement(id) {
  return document.getElementById(id);
}

function appendElement(parent, element, text) {
  var elem = document.createElement(element);
  if (text)
    elem.appendChild(document.createTextNode(text));
  parent.appendChild(elem);
  return elem
}

function runParser(input) {
  var resultsDiv = getElement("results");
  resultsDiv.innerHTML = "";
  var maybeFilter;
  if (getElement("usefilter") && getElement("usefilter").checked) {
    maybeFilter = filter;
    appendElement(resultsDiv, "EM", "Using left-corner filter");
  }
  var startTime = new Date();
  var parseChart = parse(input, grammar, grammar.$root, maybeFilter);
  var parseTime = new Date() - startTime;
  var parseResults = parseChart.resultsForRule(grammar.$root);
  
  console.log(parseResults[0]);
  
  if (parseResults) {
    for (var i in parseResults) {
        resultsDiv.innerHTML += display(parseResults[i],"");
    }
  } else {
    appendElement(resultsDiv, "P", "No results found!");
  }
  
/*
  if (parseResults) { 
    var resultList = appendElement(resultsDiv, "OL");
    for (var i in parseResults) 
      appendElement(resultList, "LI", JSON.stringify(parseResults[i]));
  } else {
    appendElement(resultsDiv, "P", "No results found!");
  }
*/
  var statistics = parseChart.statistics()
  appendElement(resultsDiv, "P", "Chart size: " + statistics.nrEdges + " edges" +
		" (" + statistics.nrPassiveEdges + " passive)");
  appendElement(resultsDiv, "P", "Parse time: " + parseTime + " ms" + 
		" (" + (parseTime / statistics.nrEdges).toFixed(2) + " ms/edge)");
}

function runWordParser() {
  runParser(getElement("input").value.split(/\s+/));
}

function runCharacterParser() {
  runParser(getElement("input").value.split(""));
}

