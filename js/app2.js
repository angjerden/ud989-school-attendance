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
        },
        saveStudentsToStorage: function() {
            model.saveStudentsToStorage();
        }
    };

    var view = {
        init: function() {
            //generate header
            this.generateHeader();

            //generate row for each student
            this.generateStudentRows();

            this.countDaysMissed();

            this.addEventToCheckBoxes();
        },
        generateHeader: function() {
            var tr = $('#attendanceheader tr');
            tr.append("<th class='name-col'>Student Name</th>");
            for (var i = 1; i <= octopus.getDays(); i++){
                tr.append("<th>" + i + "</th>");
            }
            tr.append("<th class='missed-col'>Days Missed-col</th>");
        },
        generateStudentRows: function() {
            var attendanceBody = $('#attendancebody');
            var students = octopus.getStudents();
            for (var i = 0; i < students.length; i++) {
                var studentRow = $("<tr></tr>").addClass("student");

                //generate columns in student row
                studentRow.append("<td class='name-col'>" + students[i].name + "</td>");

                this.generateDayColumns(studentRow, i);

                var missedColumn = $('<td></td>')
                    .addClass('missed-col')
                    .attr('studentindex', i)
                    .text('0');

                studentRow.append(missedColumn);

                attendanceBody.append(studentRow);
            }
            attendanceBody.append("")
        },
        generateDayColumns: function(studentRow, studentIndex) {
            for (var j = 0; j < octopus.getDays(); j++) {
                var dayColumn = $('<td></td>').addClass('attend-col');
                var dayCheckBox = $("<input type='checkbox'></input>")
                    .prop('checked', octopus.getStudents()[studentIndex].attendance[j])
                    .attr('studentindex', studentIndex);
                dayColumn.append(dayCheckBox);
                studentRow.append(dayColumn);
            }
        },
        addEventToCheckBoxes: function() {
            var allCheckBoxes = $('tbody input');
            $(allCheckBoxes).on('click', function(e) {
                var studentIndex = e.target.attributes.studentindex.value;
                var student = octopus.getStudents()[studentIndex];
                var newAttendance = [];

                var checkBoxesForStudent =
                    $("input[type='checkbox'][studentindex=" + studentIndex + "]");
                $(checkBoxesForStudent).each(function(index, checkBox){
                    newAttendance.push(checkBox.checked);
                });

                student.attendance = newAttendance;

                octopus.saveStudentsToStorage();
                view.countDaysMissed();
            });

        },
        countDaysMissed: function() {
            var students = octopus.getStudents();
            $(students).each(function(index, student) {
                var daysMissed = 0;
                $(student.attendance).each(function(i, attended) {
                    if (!attended) {
                        daysMissed++;
                    }
                });
                $("td.missed-col[studentindex=" + index + "]").text(daysMissed);
            });
        }
    };

    octopus.init();
});
