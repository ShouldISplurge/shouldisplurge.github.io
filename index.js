window.onload = function() {
  var pieces = window.location.hash.substr(1).split("/");

  pieces.forEach(function(item, index) {
    var field = item.split("-");
    document.getElementById(field[0]).value = field[1];
  });

  calculate();
}

function calculate() {
  var dollars   = document.getElementById("dollars").value;
  var time      = document.getElementById("time").value;
  var returns   = document.getElementById("returns").value;
  var inflation = document.getElementById("inflation").value;

  var url = '#';
  if (dollars) {
    url += 'dollars-' + dollars + '/';
  }

  if (time) { 
    url += 'time-' + time + '/';
  }

  if (returns) {
    url += 'returns-' + returns + '/';
  }

  if (inflation) {
    url += 'inflation-' + inflation + '/';
  }

  // Slice is used to strip off trailing '/'
  if (url != '#') {
    window.history.pushState({}, '', url.slice(0, -1));
  }

  if (dollars && time && returns && inflation) {
    // Calculate retirement amount
    var yearlySpend = time * dollars;
    var retirementAmount = yearlySpend/((returns - inflation)*.01)

    var formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    document.getElementById("retirementAmount").textContent = formatter.format(retirementAmount);

    // Calculate saved amount invested
    var baseCompoundInterest = yearlySpend * Math.pow(1 + (returns / 100), 10);
    var paymentCompoundInterest = yearlySpend * (Math.pow(1 + (returns / 100), 10) - 1) / (returns / 100);

    document.getElementById("investmentGrowthAmount").textContent = formatter.format(baseCompoundInterest + paymentCompoundInterest + retirementAmount);
  }
}
