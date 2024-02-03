const tBody = document.getElementById("table-body");

addNewRow = () => {
    const row = document.createElement("tr");
    row.className = "single-row";
    row.innerHTML = `<td><input type="text" placeholder="Title" class="product-name"></td>
                    <td><input type="number" placeholder="N/A" class="product-number"></td>
                    <td><input type="number" placeholder="0" name="unit" class="unit product-number" id="unit" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="price" class="price product-number" id="price" onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="amount" class="amount product-number" id="amount" disabled></td>
                    <td style="text-align: right; cursor: pointer;" class="button"><span action="delete">🗑</span></td>`

    tBody.insertBefore(row, tBody.lastElementChild.previousSibling);
}

document.getElementById("add-row").addEventListener("click", (e)=> {
    e.preventDefault();
    addNewRow();
});

//GET INPUTS, MULTIPLY AND GET THE ITEM PRICE
getInput =()=> {
    var rows = document.querySelectorAll("tr.single-row");
    rows.forEach((currentRow) => {
        var unit = currentRow.querySelector("#unit").value;
        var price = currentRow.querySelector("#price").value;

        amount = unit * price;
        currentRow.querySelector("#amount").value = amount;
        overallSum();

    })
};

//Get the overall sum/Total
overallSum =()=> {
    var arr = document.getElementsByName("amount");
    var total = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].value) {
            total += +arr[i].value;
        }
        document.getElementById("total").value = total.toLocaleString('en-IN');
        const igst = (total / 100) * 18;
        const cgst = (total / 100) * 9;
        const sgst = (total / 100) * 9;
        document.getElementById("igst").value = igst.toLocaleString('en-IN');
        document.getElementById("cgst").value = cgst.toLocaleString('en-IN');
        document.getElementById("sgst").value = sgst.toLocaleString('en-IN');
        const main_total = total + igst;
        document.getElementById("net-total").value = main_total.toLocaleString('en-IN');
        document.getElementById("amount-in-words").innerHTML = number2text(main_total);
    }
}

//Delete row from the table
tBody.addEventListener("click", (e)=>{
    let el = e.target;
    const deleteROW = e.target.getAttribute("action");
    if(deleteROW == "delete") {
        delRow(el);
        overallSum();
    }
})

//Target row and remove from DOM;
delRow =(el)=> {
    el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
}


//Print button 

const print_button = document.getElementById("print-button");

print_button.addEventListener("click", () => {

    var buttons = document.getElementsByClassName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("hide");
    };
});

// Show buttons
function handleShortcut(event) {
    if (event.key === "B") {
        event.preventDefault();
        var buttons = document.getElementsByClassName("button");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("hide");
        };
    }
}

document.addEventListener("keypress", handleShortcut);


// GST type

const gst_button = document.getElementById("gst-button");

var SINGLE_GST = true;

gst_button.addEventListener("click", () => {
    if(SINGLE_GST) {
        SINGLE_GST = !SINGLE_GST;
        gst_button.innerText = "Double GST";
        var hide_gst = document.getElementsByClassName("single-gst");
        var show_gst = document.getElementsByClassName("double-gst");

        for (let i = 0; i < hide_gst.length; i++) {
            hide_gst[i].classList.add("hide");
        };

        for (let i = 0; i < show_gst.length; i++) {
            show_gst[i].classList.remove("hide");
        };

    } else {
        SINGLE_GST = !SINGLE_GST;
        gst_button.innerText = "Single GST";

        var show_gst = document.getElementsByClassName("single-gst");
        var hide_gst = document.getElementsByClassName("double-gst");

        for (let i = 0; i < hide_gst.length; i++) {
            hide_gst[i].classList.add("hide");
        };

        for (let i = 0; i < show_gst.length; i++) {
            show_gst[i].classList.remove("hide");
        };
    }
});


// Number to Words Converter

function number2text(value) {
    var fraction = Math.round(frac(value)*100);
    var f_text  = "";

    if(fraction > 0) {
        f_text = "AND "+convert_number(fraction)+" PAISE";
    }

    return convert_number(value, fraction > 0)+" RUPEES "+f_text+" ONLY";
}

function frac(f) {
    return f % 1;
}

function convert_number(number, IN_PAISE)
{
    if ((number < 0) || (number > 999999999)) 
    { 
        return "NUMBER OUT OF RANGE!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    var kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    var Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    var tn= Math.floor(number / 10); 
    var one=Math.floor(number % 10); 
    var res = ""; 

    if (Gn>0) 
    { 
        res += (convert_number(Gn) + " CRORE"); 
    } 
    if (kn>0) 
    { 
            res += (((res=="") ? "" : " ") + 
            convert_number(kn) + " LAKH"); 
    } 
    if (Hn>0) 
    { 
        res += (((res=="") ? "" : " ") +
            convert_number(Hn) + " THOUSAND"); 
    } 

    if (Dn) 
    { 
        res += (((res=="") ? "" : " ") + 
            convert_number(Dn) + " HUNDRED"); 
    } 


    var ones = Array("", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX","SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN","FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN","NINETEEN"); 
    var tens = Array("", "", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY","SEVENTY", "EIGHTY", "NINETY"); 

    if (tn>0 || one>0) 
    { 
        if (!(res=="") && !IN_PAISE) { 
            res += " AND "; 
        }  else {
            res += " ";
        }
        if (tn < 2) 
        { 
            res += ones[tn * 10 + one]; 
        } 
        else 
        { 

            res += tens[tn];
            if (one>0) 
            { 
                res += ("-" + ones[one]); 
            } 
        } 
    }

    if (res=="")
    { 
        res = "ZERO"; 
    } 
    return res;
}
