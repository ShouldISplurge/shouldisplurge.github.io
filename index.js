function calculate() {
  var dollars   = document.getElementById("dollars").value;
  var time      = document.getElementById("time").value;
  var returns   = document.getElementById("returns").value;
  var inflation = document.getElementById("inflation").value;

  if (dollars && time && returns && inflation) {
    var yearlySpend = time * dollars;
    var retirementAmount = yearlySpend/((returns - inflation)*.01)

    var formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  
    document.getElementById("retirementAmount").textContent = formatter.format(retirementAmount);
  }
}
