Vue.createApp({
    data() {
        return {
            name: "",
            email: "",
            shvNum: "",
            birthdate: "",
            locale: "de-CH",
            validName: true, validEmail: true, validShvNum: true, validBirthdate: true,
            error: {
                invalidName: "Der Name muss mindestens 3 Zeichen lang sein",
                invalidEmail: "Die E-Mail-Adresse ist ungültig",
                invalidShvNum: "Die SHV-Nummer muss eine positive Zahl sein",
                invalidBirthdate: "Das Geburtsdatum ist ungültig, da es nicht in der Vergangenheit liegt.",
                errorLoadingMembers: "Fehler beim Laden der Mitgliederdaten",
                errorSavingMembers: "Fehler beim Speichern der Mitgliederdaten",
                timoutLoadingMembers: "Timeout beim Laden der Mitgliederdaten",
                timeoutSavingMembers: "Timeout beim Speichern der Mitgliederdaten",
            },
            members: []
        }
    },
    methods: {
        validateName() {
            this.validName = this.name.length >= 3;
            return this.validName;
        },
        validateEmail() {
            let pattern = /\S+@\S+\.\S+/;
            this.validEmail = pattern.test(this.email);
            return this.validEmail;
        },
        validateShvNum() {
            this.validShvNum = Number.isInteger(this.shvNum) && this.shvNum > 0;
            return this.validShvNum;
        },
        validateBirthdate() {
            let today = new Date();
            let birthdate = new Date(this.birthdate);
            this.validBirthdate = birthdate < today;
            return this.validBirthdate;
        },
        clearForm() {
            this.name = "";
            this.email = "";
            this.shvNum = "";
            this.birthdate = "";
            this.validName = true;
            this.validEmail = true;
            this.validShvNum = true;
            this.validBirthdate = true;
        },
        handleFormSubmit(e) {
            e.preventDefault();
            if (!(this.validateName() && this.validateEmail() && this.validateShvNum() && this.validateBirthdate())) {
                return
            }
            this.newMember();
        },
        newMember() {
            let json = JSON.stringify({
                name: this.name,
                email: this.email,
                shvNum: this.shvNum,
                birthdate: this.birthdate,
            });
            let that = this;
            xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if(that.testAndHandleRequestError(xhr)){ return };
                that.clearForm();
                that.members = JSON.parse(xhr.responseText);
                that.updateStatsCanvas();
            }
            xhr.onerror = function () {
                alert(that.error.errorSavingMembers);
            }
            xhr.ontimeout = function () {
                alert(that.error.timeoutSavingMembers);
            }
            xhr.open("POST", "api/v1/members", true); 
            xhr.send(json);
        },
        getMembers() {
            let that = this;
            xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if(that.testAndHandleRequestError(xhr)){ return };
                that.members = JSON.parse(xhr.responseText);
                that.updateStatsCanvas();
            }
            xhr.onerror = function () {
                alert(that.error.errorLoadingMembers);
            }
            xhr.ontimeout = function () {
                alert(that.error.timoutLoadingMembers);
            }
            xhr.open("GET", "api/v1/members", true);
            xhr.send();
        },
        handleDeleteMember(email){
            if(!confirm(`Mitglied "${email}" löschen?`)){
                return;
            }
            let that = this;
            xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if(that.testAndHandleRequestError(xhr)){ return };
                that.getMembers();
            }
            xhr.onerror = function () {
                alert(that.error.errorLoadingMembers);
            }
            xhr.ontimeout = function () {
                alert(that.error.timoutLoadingMembers);
            }
            xhr.open("DELETE", "api/v1/members", true);
            xhr.send(JSON.stringify({
                email: email
            }));
        },
        testAndHandleRequestError(xhr){
            if (xhr.status < 200 || xhr.status > 299) {
                try {
                    let response = JSON.parse(xhr.responseText);
                    alert(`Request failed: ${response.error.message} (${xhr.status})`);
                } catch (e) {
                    alert(`Request failed: ${xhr.status}`);
                }
                return true;
            }
            return false;
        },
        updateStatsCanvas() {
            let cvs = document.getElementById("stats-canvas");
            cvs.style.width = '100%';
            cvs.style.height = '600';
            cvs.width = cvs.offsetWidth;
            cvs.height = cvs.offsetHeight;
            let ctx = cvs.getContext("2d");
            let width = cvs.width;
            let height = cvs.height;
            ctx.clearRect(0, 0, width, height); //clear canvas
            ctx.beginPath(); //draw horizontal axis (year)
            ctx.moveTo(0, height - 20);
            ctx.lineTo(width, height - 20);
            ctx.stroke();
            ctx.beginPath(); //draw vertical axis (count of members)
            ctx.moveTo(20, 0);
            ctx.lineTo(20, height);
            ctx.stroke();
            let data = [{ year: 2014, members: 3 }, { year: 2015, members: 7 }, { year: 2016, members: 9 }, { year: 2017, members: 11 }, { year: 2018, members: 10 }, { year: 2019, members: 13 }, { year: 2020, members: 17 }, { year: 2021, members: 20 }, { year: 2022, members: 21 }, { year: 2023, members: 24 }, { year: 2024, members: this.members.length }];
            let x0 = 20; //draw data points
            let y0 = height - 20;
            let x1 = width;
            let y1 = 0;
            let dx = x1 - x0;
            let dy = y0 - y1;
            let xMin = data[0].year -1;
            let xMax = data[data.length - 1].year + 1;
            let yMin = 0;
            let yMax = this.members.length > 24 ? this.members.length + 3 : 27;
            let xScale = dx / (xMax - xMin);
            let yScale = dy / (yMax - yMin);
            ctx.beginPath();
            ctx.moveTo(x0 + (data[0].year - xMin) * xScale, y0 - (data[0].members - yMin) * yScale);
            for (let i = 1; i < data.length; i++) { // draw the line between the data points
                ctx.lineTo(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale);
            }
            ctx.stroke();
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            for (let i = 0; i < data.length; i++) { 
                ctx.beginPath(); //draw data points
                ctx.arc(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale, 3, 0, 2 * Math.PI);
                ctx.fill();
                ctx.textBaseline = "middle"; // draw the count of members for each year
                ctx.fillText(data[i].members, x0 + (data[i].year - xMin) * xScale, (y0 - (data[i].members - yMin) * yScale) + -10);
                ctx.textBaseline = "top"; // draw the year below the x-axis
                ctx.fillText(data[i].year, x0 + (data[i].year - xMin) * xScale, y0 + 5);
            }
            ctx.save(); // label the y-axis
            ctx.translate(7, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText("Mitglieder", 0, 0);
            ctx.restore();
        },
        handleResize() {
            this.updateStatsCanvas();
        }
    },
    mounted: function () {
        this.getMembers();
        window.addEventListener("resize", this.handleResize);
    },
    unmounted: function () {
        window.removeEventListener("resize", this.handleResize);
    }
}).mount('#registration-app');