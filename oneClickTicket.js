//Reference : http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript/2706236#2706236
//Thanks to 'Kooilnc'

function E(passenger_info,mobile) {
    f0 = document.forms['addPassengerForm'] || document.forms['jpBook'];
	for (i=0;i<passenger_info.length;i++) {
		var subPassengerInfo = passenger_info[i];
		var name = subPassengerInfo[0];
		var gender = subPassengerInfo[1];
		var age = subPassengerInfo[2];
		var berth = subPassengerInfo[3];
		console.log('name - '+name);
		console.log('gender- '+gender);
		console.log('age - '+age);
		console.log('berth - '+berth);
		if (f0['addPassengerForm:psdetail:'+i+':psgnName']) f0['addPassengerForm:psdetail:'+i+':psgnName'].value = name;
		dq = document.querySelector('input[size=\'16\'][id^=\'addPassengerForm:psdetail:'+i+':\']');
		if (dq) dq.value = name;
		if (f0['addPassengerForm:psdetail:'+i+':psgnAge']) f0['addPassengerForm:psdetail:'+i+':psgnAge'].value = age;
		if (f0['addPassengerForm:psdetail:'+i+':psgnGender']) f0['addPassengerForm:psdetail:'+i+':psgnGender'].value = gender;
		if (f0['addPassengerForm:psdetail:'+i+':berthChoice']) f0['addPassengerForm:psdetail:'+i+':berthChoice'].value = berth;
	}
    if (f0['addPassengerForm:mobileNo']) f0['addPassengerForm:mobileNo'].value = mobile;
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
function fillIRCTCForm(passenger_info,mobile,card_type, pref_bank) {
    var tabPayBtn = document.querySelector('.paymentOption tr td[id=\'' + card_type + '\']');
    if (tabPayBtn == null) {
		console.log('Filling the passenger information now...');
        E(passenger_info, mobile);
        return
    }
	console.log('Selecting the preferred bank now...');
    tabPayBtn.click();
    var cardTable = "";
    var cardTables = document.getElementsByClassName('selected-bank-list ' + card_type)[0].childNodes;
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
    var s = document.getElementsByName(card_type);
    for (i = 0; i < s.length; i++) {
        var bankId = s[i].value;
        if (bankInfo[bankId].toLowerCase().indexOf(pref_bank.toLowerCase()) != -1) {
            s[i].checked = true;
            s[i].onchange();
			break;
        }
    }
	if (card_type == 'CREDIT_CARD') {
            fillHDFCCreditCardInfo()
    } else {
		eventFire(document.getElementById('validate'), 'click')
	}
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
function setOption(selectElement, value) {
    var options = selectElement.options;
    for (var i = 0, optionsLength = options.length; i < optionsLength; i++) {
        if (options[i].text == value) {
            selectElement.selectedIndex = i;
            return true;
        }
    }
    return false;
}
function fillSBIDebitCardInfo() {
	document.getElementById('debitCardNumber').value = '000000000000';
	setOption(document.getElementById('debiMonth'),'2');
	setOption(document.getElementById('debiYear'),'2010');
	document.getElementById('debitCardholderName').value = 'BRANCH MANAGER';
	document.getElementById('cardPin').value = '0000';
	var txtCaptcha = document.getElementById('passline');
	txtCaptcha.scrollIntoView();
	txtCaptcha.focus();
}
function fillHDFCCreditCardInfo() {
	setOption(document.getElementById('card_type_id'),'MASTER');
	document.getElementById('card_no_id').value = '5241810100096916';
	document.getElementById('card_expiry_mon_id').selectedIndex = 6;
	document.getElementById('card_expiry_year_id').value = '2019';
	document.getElementById('cvv_no_id').value = '551';
	document.getElementById('card_name_id').value = 'SATEESH KARRI';
	var txtCaptcha = document.getElementById('captcha_txt');
	txtCaptcha.scrollIntoView();
	txtCaptcha.focus();
}
function fillHDFCPassword() {
	document.getElementById('txtPassword').value = '2019';
	eventFire(document.getElementById('cmdSubmit'), 'click');
}
function init(passenger_info, mobile, bank = 'sbi', card = 'debit') {
	console.log('Initializing ...');
	if (Object.prototype.toString.call(passenger_info) != '[object Array]') {
		console.log('Passenger information should be an array');
		alert('Passenger information should be an array');
		return 'FAIL';
	} 
	var pLen = passenger_info.length;
	if (pLen==0) {
		console.log('Please pass Passenger information');
		alert('Please pass Passenger information');
		return 'FAIL';
	}
	for (i = 0; i < pLen; i++) {
		var subPassengerInfo = passenger_info[i]; 
		if (Object.prototype.toString.call(subPassengerInfo) != '[object Array]') {
			console.log('Sub passenger information should be an array');
			alert('Sub passenger information should be an array');
			return 'FAIL';
		}
		var subPassengerInfoLen = subPassengerInfo.length;
		if (subPassengerInfoLen!=4) {
			console.log('Sub passenger information should be having a length of 4');
			alert('Sub passenger information should be having a length of 4');
			return 'FAIL';
		}
	}
	console.log('Passengers : '+passenger_info);
	bank = bank.toLowerCase();
	card = card.toLowerCase();
	var pref_bank = bank;
	var card_type = '';
	if (card=='debit') {
		var card_type = 'DEBIT_CARD';
	} else {
		var card_type = 'CREDIT_CARD';
	}
	console.log('pref_bank : '+pref_bank);
    console.log('card_type : '+card_type);
    var pageUrl = window.location.hostname;
    if (pageUrl.indexOf('irctc') != -1) {
        fillIRCTCForm(passenger_info,mobile,card_type, pref_bank)
    } else if (pageUrl.indexOf('icici') != -1) {
        if (card_type === 'CREDIT_CARD') {
            fillICICICreditCardInfo()
        } else {
            fillICICIDebitCardInfo()
        }
    } else if (pageUrl.indexOf('fssnet') != -1) {
        fillSBIDebitCardInfo()
    } else if (pageUrl.indexOf('hdfcbank') != -1) {
        fillHDFCPassword()
    }  else {
        alert('Not a valid page')
    }
}

//init([['Venkatasubramani', 'M',52,'LB'],['Parameswari', 'F',50,'LB']],0000000000,'icici','credit');
//init([['Venkatasubramani', 'M',52,'LB'],['Parameswari', 'F',50,'LB']],0000000000); 
//init([['Venkatasubramani', 'M',52,'LB'],['Parameswari', 'F',50,'LB']],0000000000,'icici','debit');