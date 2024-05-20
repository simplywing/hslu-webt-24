Vue.createApp({
    data() {
        return {
            name: "",
            email: "",
            shvNum: "",
            birthdate: "",
            validName: true,
            validEmail: true,
            validShvNum: true,
            validBirthdate: true,
            error: {
                invalidName: "Der Name muss mindestens 3 Zeichen lang sein",
                invalidEmail: "Die E-Mail-Adresse ist ungültig",
                invalidShvNum: "Die SHV-Nummer ist ungültig",
                invalidBirthdate: "Das Geburtsdatum ist ungültig"
            },
            members: [
                {name: "Reiner Zufall", email: "reiner@zufall.ch", shvNum: 123456, birthdate: "1980-01-01", entryDate: "2022-01-01"},
                {name: "Vera Aloe", email: "vera@gmail.com", shvNum: 87434, birthdate: "1999-01-21", entryDate: "2019-12-11"},
                {name: "Max Superflug", email: "max_s@gmx.net", shvNum: 23444, birthdate: "2000-10-17", entryDate: "2024-01-15"},
                {name: "Reiner Zufall", email: "reiner@zufall.ch", shvNum: 123456, birthdate: "1980-01-01", entryDate: "2022-01-01"},
                {name: "Vera Aloe", email: "vera@gmail.com", shvNum: 87434, birthdate: "1999-01-21", entryDate: "2019-12-11"},
                {name: "Max Superflug", email: "max_s@gmx.net", shvNum: 23444, birthdate: "2000-10-17", entryDate: "2024-01-15"},
                {name: "Reiner Zufall", email: "reiner@zufall.ch", shvNum: 123456, birthdate: "1980-01-01", entryDate: "2022-01-01"},
                {name: "Vera Aloe", email: "vera@gmail.com", shvNum: 87434, birthdate: "1999-01-21", entryDate: "2019-12-11"},
                {name: "Max Superflug", email: "max_s@gmx.net", shvNum: 23444, birthdate: "2000-10-17", entryDate: "2024-01-15"},
                {name: "Reiner Zufall", email: "reiner@zufall.ch", shvNum: 123456, birthdate: "1980-01-01", entryDate: "2022-01-01"},
                {name: "Vera Aloe", email: "vera@gmail.com", shvNum: 87434, birthdate: "1999-01-21", entryDate: "2019-12-11"},
                {name: "Max Superflug", email: "max_s@gmx.net", shvNum: 23444, birthdate: "2000-10-17", entryDate: "2024-01-15"}
            ]
        }
    },
    methods: {
        validateName(){
            this.validName = this.name.length >= 3;
            return this.validName;
        },
        validateEmail(){
            let re = /\S+@\S+\.\S+/;
            this.validEmail = re.test(this.email);
            return this.validEmail;
        },
        validateShvNum(){
            this.validShvNum = this.shvNum > 0;
            return this.validShvNum;
        },
        validateBirthdate(){
            let today = new Date();
            let birthdate = new Date(this.birthdate);
            this.validBirthdate = birthdate < today;
            return this.validBirthdate;
        },
        clearForm(){
            this.name = "";
            this.email = "";
            this.shvNum = "";
            this.birthdate = "";
            this.validName = true;
            this.validEmail = true;
            this.validShvNum = true;
            this.validBirthdate = true;
        },
        handleFormSubmit(e){
            e.preventDefault();
            if(!(this.validateName() && this.validateEmail() && this.validateShvNum() && this.validateBirthdate())){
                return
            }
            this.members.push(this.newMember());
            this.clearForm();
        },
        newMember(){
            return {
                name: this.name,
                email: this.email,
                shvNum: this.shvNum,
                birthdate: this.birthdate,
                entryDate: new Date().toISOString().slice(0, 10)
            }
        },
        updateStatsCanvas(){
            let cvs = document.getElementById("stats-canvas");
            this.updateCanvasSize(cvs);
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
            let data = [{year: 2014, members: 3}, {year: 2015, members: 12}, {year: 2016, members: 21}, {year: 2017, members: 23}, {year: 2018, members: 21}, {year: 2019, members: 25}, {year: 2020, members: 31}, {year: 2021, members: 31}, {year: 2022, members: 36}, {year: 2023, members: 42}, {year: 2024, members: 40}];
            let x0 = 20; //draw data points
            let y0 = height - 20;
            let x1 = width;
            let y1 = 0;
            let dx = x1 - x0;
            let dy = y0 - y1;
            let xMin = 2013;
            let xMax = 2025;
            let yMin = 0;
            let yMax = 45;
            let xScale = dx / (xMax - xMin);
            let yScale = dy / (yMax - yMin);
            ctx.beginPath();
            ctx.moveTo(x0 + (data[0].year - xMin) * xScale, y0 - (data[0].members - yMin) * yScale);
            for(let i = 1; i < data.length; i++){
                ctx.lineTo(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale);
            }
            ctx.stroke();
            for(let i = 0; i < data.length; i++){
                ctx.beginPath();
                ctx.arc(x0 + (data[i].year - xMin) * xScale, y0 - (data[i].members - yMin) * yScale, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.font = "12px Arial"; //draw labels
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            for(let i = 0; i < data.length; i++){
                ctx.fillText(data[i].year, x0 + (data[i].year - xMin) * xScale, y0 + 5);
            }
            ctx.textBaseline = "middle";
            for(let i = 0; i < data.length; i++){
                ctx.fillText(data[i].members, x0 + (data[i].year - xMin) * xScale, (y0 - (data[i].members - yMin) * yScale) + -10);
            }
            ctx.save(); //label the y-axis
            ctx.translate(7, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText("Mitglieder", 0, 0);
            ctx.restore();
        },
        updateCanvasSize(cvs){
            cvs.style.width ='100%';    
            cvs.style.height='600';
            cvs.width  = cvs.offsetWidth;
            cvs.height = cvs.offsetHeight;
        }
    },
    mounted: function() {
        console.log("Vue app mounted");
        this.updateStatsCanvas();
    },
}).mount('#registration-app');