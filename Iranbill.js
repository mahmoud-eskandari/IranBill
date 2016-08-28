/**
 * Coded by Mahmoud Eskandari
 * Email  : info@webafrooz.com
 * Website:http://webafrooz.com
 * 
 * Webafrooz Web Development Group co.
 * Licence Under MIT License.
 Type:
 1: آب
 2: برق
 3: گاز
 4: تلفن ثابت
 5: موبایل
 6: شهرداری
 */
function IranBill(Bill_number, Payment_id) {
    var range = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3];
    var out   = [];

    //Check Bill Number Length
    if (Bill_number.length != 13) {
        return [-1];
    }
    //Check Payment Number Length
    if (Payment_id.length < 7) {
        return [-2];
    }

    Payment_id = '000000'.substring(0, 13 - Payment_id.length) + Payment_id;
    var bid_sp = Bill_number.split("");
    var pid_sp = Payment_id.split("");
    out['type'] = bid_sp[11];

    var r_bid = bid_sp.reverse();
    var r_pid = pid_sp.reverse();
    var M = 0;
    for (var i = 1; i < 13; i++) {
        M += r_bid[i] * range[i - 1];
    }
    //Checksum
    M = 11 - (M % 11);
    if (M > 9)
        M = 0;

    if (M != parseInt(r_bid[0])) {
        return [-1];
    }
    /**
     * Check Bill Number
     */
    //Check payment Number
    M = 0;
    for (i = 2; i < 13; i++) {
        M += r_pid[i] * range[i - 2];
    }
    //Checksum
    M = 11 - (M % 11);
    if (M > 9)
        M = 0;
    //Check Bill Number
    if (M != parseInt(r_pid[1])) {
        return [-2];
    }
    //Final Check
    var Final = Bill_number + Payment_id.substring(5, 12);
    var r_final = Final.split("").reverse();
    //Check payment Number
    M = 0;
    for (i = 0; i < 20; i++) {
        M += r_final[i] * range[i];
    }
    //Checksum
    M = 11 - (M % 11);
    if (M > 9)
        M = 0;
    //Check Bill Number
    if (M != parseInt(r_pid[0])) {
        return [-2];
    }
    out['fee'] = parseInt(Payment_id.substring(0, 8)) * 1000;

    if (out['fee'] == 0)
        return [-2];

    return [Bill_number, Payment_id, out['fee'], out['type']];
}
