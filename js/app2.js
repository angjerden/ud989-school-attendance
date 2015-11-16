var Student = function(name, attendance) {
    this.name = name;
    this.attendance = attendance;
};

$(function() {
    var model = {
        init: function() {
            this.days = 12;/*Math.ceil(Math.random() * 15);*/
            this.students = this.getStudentsFromStorage();

            if(this.students == undefined) {
                this.students = [];
                var slappy = new Student("Slappy the Frog",
                    this.generateAttendance());
                var lilly = new Student("Lilly  the Lizard",
                    this.generateAttendance());
                var paulrus = new Student("Paulrus the Walrus",
                    this.generateAttendance());
                var gregory = new Student("Gregory the Goat",
                    this.generateAttendance());
                var adam = new Student("Adam the Anaconda",
                    this.generateAttendance());

                this.students.push(slappy);
                this.students.push(lilly);
                this.students.push(paulrus);
                this.students.push(gregory);
                this.students.push(adam);

                this.saveStudentsToStorage();
            }
        },
        generateAttendance: function() {
            var attendance = [];
            for (var i = 0; i < this.days; i++) {
                var attended = Math.random() < 0.5
                attendance.push(attended);
            }
            return attendance;
        },
        saveStudentsToStorage: function() {
            localStorage.students = JSON.stringify(this.students);
        },
        getStudentsFromStorage: function() {
            return JSON.parse(localStorage.students);
        }
    };

    var octopus = {
        init: function() {
            model.init();
            view.init();
        },
        getDays: function() {
            return model.days;
        },
        getStudents: function() {
            return model.students;
        }
    };

    var view = {
        init: function() {
            //generate header
            var tr = $('#attendanceheader tr');
            tr.append("<th class='name-col'>Student Name</th>");
            for (var i = 1; i <= octopus.getDays(); i++){
                tr.append("<th>" + i + "</th>");
            }
            tr.append("<th class='missed-col'>Days Missed-col</th>");

            //generate row for each student
            var attendanceBody = $('#attendancebody');
            var students = octopus.getStudents();
            for (var i = 0; i < students.length; i++) {
                var studentRow = $("<tr></tr>").addClass("student");

                //generate columns in student row
                studentRow.append("<td class='name-col'>" + students[i].name + "</td>");

                for (var j = 0; j < octopus.getDays(); j++) {
                    var dayColumn = $('<td></td>').addClass('attend-col');
                    var dayCheckBox = $("<input type='checkbox'></input>")
                        .prop('checked', students[i].attendance[j]);
                    dayColumn.append(dayCheckBox);
                    studentRow.append(dayColumn);
                }
                studentRow.append("<td class='missed-col'>" + 0 + "</td>");

                attendanceBody.append(studentRow);
            }
            attendanceBody.append("")
        }
    };

    octopus.init();
});
