window.onload = function () {
    getTime();    
    loadXMLDoc();
    displayStudentData();
}

class Student {
    constructor(mssv, fullname, email, phone, hobby, gender, country, nickname, description) {
        this.mssv = mssv;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.hobby = hobby;
        this.gender = gender;
        this.country = country;
        this.nickname = nickname;
        this.description = description;
    }
}

function displayStudentData() {
    if(localStorage.getItem("student") != null){
        var student = JSON.parse(localStorage.getItem("student"));
        bindingFooterData(student);
        if (document.title == "Trang chủ") {
            bindingStudentData(student);
        }
    }
    else {
        console.log("Không có dữ liệu sinh viên");
    }
}

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
    };
    xmlhttp.open("GET", "asset/xml/K214110827.xml", true);
    xmlhttp.send();
}

function myFunction(xml) {
    var xmlDoc, html;
    xmlDoc = xml.responseXML;
    html = "";
    var student = new Student(xmlDoc.getElementsByTagName("mssv")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("fullname")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("phone")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("hobby")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("gender")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("country")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("nickname")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue);
    localStorage.setItem("student", JSON.stringify(student));
    bindingFooterData(student);
    if (document.title == "Trang chủ") {
        bindingStudentData(student);
    }
}

function bindingStudentData(student) {
    var html = `<p><b>MSSV: </b>${student.mssv}</p>
                <p><b>Họ tên: </b>${student.fullname}</p>
                <p><b>Email: </b>${student.email}</p>
                <p><b>Số điện thoại: </b>${student.phone}</p>
                <p><b>Sở thích: </b>${student.hobby}</p>
                <p><b>Giới tính: </b>${student.gender}</p>
                <p><b>Quê quán: </b>${student.country}</p>
                <p><b>Nickname: </b>${student.nickname}</p>
                <p><b>Mô tả: </b>${student.description}</p>`;
    document.getElementsByClassName("personal-info")[0].innerHTML = html;
    console.log("Đã load dữ liệu sinh viên");
}

function bindingFooterData(student) {
    document.getElementById("author").innerHTML = student.fullname;
}

function getTime() {
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1; 
    var y = today.getFullYear();
    document.getElementById('today').innerHTML = d + "-" + m + "-" + y;
}

function register() {
    var name = document.getElementById("txtFullname").value;
    var phone = document.getElementById("txtPhone").value;
    var email = document.getElementById("txtEmail").value;
    var hobby = document.getElementById("txtHobby").value;

    var emailRegex = /\S+@\S+\.\S+/;
    var regex = /^[0-9]+$/;

    if (name == "") {
        alert("Vui lòng nhập họ tên");
        document.getElementById("txtFullname").focus();
        return;
    }

    if (email == "") {
        alert("Vui lòng nhập Email");
        document.getElementById("txtEmail").focus();
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ");
        document.getElementById("txtEmail").value = "";
        document.getElementById("txtEmail").focus();
        return;
}

    if (phone == "") {
        alert("Vui lòng nhập số điện thoại");
        document.getElementById("txtPhone").focus();
        return;
    }

    if (!regex.test(phone) || phone.length !== 10) {
        alert("Số điện thoại không hợp lệ");
        document.getElementById("txtPhone").value = "";
        document.getElementById("txtPhone").focus();
        return;
    }

    alert("Đăng ký thành công")
    function showInfo() {
        var userInfoDiv = document.getElementById('userInfo');
        
        var newUserParagraph = document.createElement('p');
        newUserParagraph.className = 'user-info'; 
        newUserParagraph.innerHTML = '<strong>Thông tin đăng ký:</strong><br>' +
                                      '<strong>Tên:</strong> ' + name + '<br>' +
                                      '<strong>Số điện thoại:</strong> ' + phone + '<br>' +
                                      '<strong>Email:</strong> ' + email + '<br>' +
                                      '<strong>Sở thích:</strong> ' + hobby + '<br>';
        userInfoDiv.appendChild(newUserParagraph);
    }
    showInfo();

    ReSet();
}

function ReSet(){
    var reSet = document.getElementById("form-register");
    document.getElementById("txtFullname").focus();
    reSet.reset();
}