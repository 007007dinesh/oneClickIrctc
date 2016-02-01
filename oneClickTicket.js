//Reference : http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript/2706236#2706236
//Thanks to 'Kooilnc'

function E() {
    f0 = document.forms['addPassengerForm'] || document.forms['jpBook'];
    if (f0['addPassengerForm:psdetail:0:psgnName']) f0['addPassengerForm:psdetail:0:psgnName'].value = 'Venkatasubramani';
    dq = document.querySelector('input[size=\'16\'][id^=\'addPassengerForm:psdetail:0:\']');
    if (dq) dq.value = 'Venkatasubramani';
    if (f0['addPassengerForm:psdetail:0:psgnAge']) f0['addPassengerForm:psdetail:0:psgnAge'].value = '52';
    if (f0['addPassengerForm:psdetail:0:psgnGender']) f0['addPassengerForm:psdetail:0:psgnGender'].value = 'M';
    if (f0['addPassengerForm:psdetail:0:berthChoice']) f0['addPassengerForm:psdetail:0:berthChoice'].value = 'LB';
    if (f0['addPassengerForm:psdetail:1:psgnName']) f0['addPassengerForm:psdetail:1:psgnName'].value = 'Parameswari';
    dq = document.querySelector('input[size=\'16\'][id^=\'addPassengerForm:psdetail:1:\']');
    if (dq) dq.value = 'Parameswari';
    if (f0['addPassengerForm:psdetail:1:psgnAge']) f0['addPassengerForm:psdetail:1:psgnAge'].value = '50';
    if (f0['addPassengerForm:psdetail:1:psgnGender']) f0['addPassengerForm:psdetail:1:psgnGender'].value = 'F';
    if (f0['addPassengerForm:psdetail:1:berthChoice']) f0['addPassengerForm:psdetail:1:berthChoice'].value = 'LB';
    if (f0['addPassengerForm:psdetail:2:psgnName']) f0['addPassengerForm:psdetail:2:psgnName'].value = 'Dinesh';
    dq = document.querySelector('input[size=\'16\'][id^=\'addPassengerForm:psdetail:2:\']');
    if (dq) dq.value = 'Dinesh';
    if (f0['addPassengerForm:psdetail:2:psgnAge']) f0['addPassengerForm:psdetail:2:psgnAge'].value = '25';
    if (f0['addPassengerForm:psdetail:2:psgnGender']) f0['addPassengerForm:psdetail:2:psgnGender'].value = 'M';
    if (f0['addPassengerForm:psdetail:2:berthChoice']) f0['addPassengerForm:psdetail:2:berthChoice'].value = 'MB';
    if (f0['addPassengerForm:mobileNo']) f0['addPassengerForm:mobileNo'].value = '0000000000';
    var txtCaptcha = document.getElementById('j_captcha');
    txtCaptcha.scrollIntoView();
    txtCaptcha.focus()
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype)
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj)
    }
}

function bookIRCTCTicket(card_type) {
    //var tabPayBtn = document.querySelector('.paymentOption tr td[id=\'DEBIT_CARD\']');
    var tabPayBtn = document.querySelector('.paymentOption tr td[id=\''+card_type+'\']');
    if (tabPayBtn == null) {
        E();
        return
    }
    tabPayBtn.click();
    var cardTable = "";
    //var cardTables = document.getElementsByClassName('selected-bank-list DEBIT_CARD')[0].childNodes;
    var cardTables = document.getElementsByClassName('selected-bank-list '+card_type)[0].childNodes;
    for (i = 0; i < cardTables.length; i++) {
        if (cardTables[i].nodeName == "TABLE") {
            var cardTable = cardTables[i];
            break
        }
    }
    var cardTableData = cardTable.getElementsByTagName('td');
    var bankInfo = {};
    for (i = 0; i < cardTableData.length; i++) {
        var row = cardTableData[i].innerHTML;
        var result = row.match(/value="(\d+)".*>(.*)/);
        if (result.length == 3) {
            bankInfo[result[1]] = result[2]
        }
    }
    //var s = document.getElementsByName('DEBIT_CARD');
    var s = document.getElementsByName(card_type);
    for (i = 0; i < s.length; i++) {
        var bankId = s[i].value;
        if (bankInfo[bankId].indexOf("ICICI")!=-1) {
            s[i].checked = true;
            s[i].onchange()
        }
    }
    eventFire(document.getElementById('validate'), 'click')
}


function fillICICICreditCardInfo() {
	 document.getElementById('name').value = 'DINESH';
	 var creditCrdRadio = document.getElementById('creditCrdRadio');
	 creditCrdRadio.checked = true;
	 creditCrdRadio.click();
	 var RadioGroupCrd = document.getElementsByName('RadioGroupCrd')[0];
	 RadioGroupCrd.checked=true;
	 RadioGroupCrd.click();
	 document.getElementsByName('CardNumCrd1')[0].value = '0000';
    document.getElementsByName('CardNumCrd2')[0].value = '0000';
    document.getElementsByName('CardNumCrd3')[0].value = '0000';
    document.getElementsByName('CardNumCrd4')[0].value = '0000';
    var expMon = document.getElementsByName('creditExpDtMon')[0];
    expMon.value = '11';
    var expYear = document.getElementsByName('creditExpDtYr')[0];
    expYear.value = '2017';
    document.getElementsByName('creditCVV')[0].value = '0000';
	//document.getElementsByName('btnPay')[0].click();
}

function fillICICIDebitCardInfo() {
    var cardType = document.getElementsByName('CardTypeSelectBox')[0];
    cardType.selectedIndex = 2;
    document.getElementsByName('CardNum1')[0].value = '5594';
    document.getElementsByName('CardNum2')[0].value = '5594';
    document.getElementsByName('CardNum3')[0].value = '5594';
    document.getElementsByName('CardNum4')[0].value = '5594';
    var expMon = document.getElementsByName('ExpDtMon')[0];
    expMon.value = '02';
    var expYear = document.getElementsByName('ExpDtYr')[0];
    expYear.value = '2020';
    document.getElementsByName('CVVNum')[0].value = '000';
    document.getElementsByName('NameOnCard')[0].value = 'DINESH S';
    document.getElementsByName('ATMPIN')[0].value = '0000';
    // document.getElementsByName('btnPay')[0].click();
}

function init() {
	var card_type = 'CREDIT_CARD';
    var pageUrl = window.location.hostname;
    if (pageUrl.indexOf("irctc") != -1) {
        bookIRCTCTicket(card_type);
    } else if (pageUrl.indexOf("icici") != -1) {
		if(card_type==="CREDIT_CARD") {
			fillICICICreditCardInfo();
		} else {
			fillICICIDebitCardInfo()
		}
    } else {
        alert("Not a valid page")
    }
}
init();
